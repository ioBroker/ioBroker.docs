cd /opt/doc-auto
/usr/bin/git checkout .
/usr/bin/git pull
cp /opt/configBackup.json /opt/doc-auto/engine/config.json
cp engine/update.sh ../updateSite.sh
chmod 744 ../updateSite.sh
cd engine/
/usr/bin/npm i -f
cd front-end
/usr/bin/npm i -f
cd ..
/usr/bin/node node_modules/gulp/bin/gulp.js buildOnly
PM2_PATH=$(which pm2)
$PM2_PATH restart doc

