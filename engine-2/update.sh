cd /opt/doc-auto
/usr/bin/git checkout .
/usr/bin/git pull
cp /opt/configBackup.json /opt/doc-auto/engine-2/config.json
# this script overwrites itself on the server, so it always has to copy its own path
cp engine-2/update.sh ../updateSite.sh
chmod 744 ../updateSite.sh
cd engine-2/
/usr/bin/npm i -f
# buildOnly only installs the front-end dependencies if node_modules is missing,
# so they are refreshed explicitly after every pull
cd front-end
/usr/bin/npm i -f
cd ..
# builds the react site
/usr/bin/npm run buildOnly
# compiles build/main.js, which pm2 starts
/usr/bin/npm run buildBackend
PM2_PATH=$(which pm2)
$PM2_PATH restart doc
