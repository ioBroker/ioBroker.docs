const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
var proxy = require('express-http-proxy');
var axios = require('axios');
const config = require('./config');
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

let cache = {};
let loading = {};
app.set('trust proxy', true)
app.get(/.*/, async (req, res) => {
    if (!(req.get('User-agent')?.includes('TelegramBot'))) {
        return proxy('http' + '://' + config.domain + req.originalUrl)(req, res);
    }
    try {
        let recached;

        if (req.originalUrl == '/index.html' || req.originalUrl == '/index.php') {
            req.originalUrl = '/';
        }
        let fullUrl = 'http' + '://' + config.domain + req.originalUrl;
        console.log(fullUrl);
        // console.log(req.ip)
        // console.log(req.get('User-agent'))
        async function recache() {
            if (loading[req.originalUrl]) {
                return;
            }
            console.log('recache');
            loading[req.originalUrl] = true;
            let browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

            try {

                const page = await browser.newPage();

                await page.goto(fullUrl);
                await delay(4000);
                page.on('console', consoleObj => console.log(consoleObj.text()));
                await page.evaluate(() => {
                    document.querySelectorAll('script')
                        .forEach(el => el.parentNode.removeChild(el));
                    // document.querySelectorAll('style')
                    //     .forEach(el => el.parentNode.removeChild(el));
                    // document.querySelectorAll('[style]')
                    //     .forEach(el => el.removeAttribute('style'));
                })

                if (!cache[req.originalUrl]) {
                    cache[req.originalUrl] = {}
                }
                cache[req.originalUrl]['html'] = await page.evaluate(() => {
                    return document.documentElement.outerHTML;
                });
                cache[req.originalUrl]['time'] = Date.now();
                await page.close();
            } catch (e) {
                console.log(e);
            } finally {
                await browser.close();
                loading[req.originalUrl] = false;
            }

        }
        let response = await axios.head(fullUrl);
        if (response.headers['content-type'].includes('text/html')) {
            if (!cache[req.originalUrl]) {
                await recache()
                recached = true;
            }

            let html = cache[req.originalUrl]['html'];

            res.send(html);
            console.log('sent');
            if (Date.now() - cache[req.originalUrl].time > 60 * 60 * 1000) {
                if (!recached) {
                    await recache()
                }
            }
        } else {
            let response = await axios.get(fullUrl, { responseType: 'arraybuffer' });
            let html = response.data;
            for (let k in response.headers) {
                if (k == 'content-type') {
                    res.setHeader(k, response.headers[k]);
                }
            }
            res.send(html);
        }
    } catch (e) {
        console.log(e);
    }
});

//app.use('/assets/*', proxy('localhost:3000/assets'));

app.listen(config.port, () => console.log(`Server is up`))