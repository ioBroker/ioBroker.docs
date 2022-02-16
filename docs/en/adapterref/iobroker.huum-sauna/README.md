{
  "name": "iobroker.huum-sauna",
  "version": "0.3.0",
  "description": "HUUM Sauna Steuerung",
  "author": "Chris <besterquester@live.at>",
  "homepage": "https://github.com/Chris-1965/ioBroker.huum-sauna",
  "license": "MIT",
  "keywords": [
    "sauna",
    "control"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Chris-1965/ioBroker.huum-sauna.git"
  },
  "dependencies": {
    "@iobroker/adapter-core": "^2.5.1",
    "axios": "^0.24.0",
    "suncalc2": "^1.8.1"
  },
  "devDependencies": {
    "@alcalzone/release-script": "^2.2.2",
    "@iobroker/testing": "^2.5.2",
    "@types/chai": "^4.3.0",
    "@types/chai-as-promised": "^7.1.4",
    "@types/gulp": "^4.0.9",
    "@types/mocha": "^9.0.0",
    "@types/node": "^14.18.5",
    "@types/proxyquire": "^1.3.28",
    "@types/sinon": "^10.0.6",
    "@types/sinon-chai": "^3.2.8",
    "auto-changelog": "^2.3.0",
    "axios": "^0.24.0",
    "chai": "^4.3.4",
    "chai-as-promised": "^7.1.1",
    "eslint": "^7.32.0",
    "gulp": "^4.0.2",
    "mocha": "^9.1.3",
    "nanoid": "^3.2.0",
    "proxyquire": "^2.1.3",
    "sinon": "^12.0.1",
    "sinon-chai": "^3.7.0",
    "suncalc2": "^1.8.1",
    "typescript": "~4.4.4"
  },
  "optionalDependencies": {
    "fsevents": "2.1.2"
  },
  "main": "main.js",
  "files": [
    "admin{,/!(src)/**}/!(tsconfig|tsconfig.*).json",
    "admin{,/!(src)/**}/*.{html,css,png,svg,jpg,js}",
    "lib/",
    "www/",
    "io-package.json",
    "LICENSE",
    "main.js"
  ],
  "scripts": {
    "test:js": "node ./node_modules/mocha/bin/mocha --config test/mocharc.custom.json \"{!(node_modules|test)/**/*.test.js,*.test.js,test/**/test!(PackageFiles|Startup).js}\"",
    "test:package": "node ./node_modules/mocha/bin/mocha test/package --exit",
    "test:unit": "node ./node_modules/mocha/bin/mocha test/unit --exit",
    "test:integration": "node ./node_modules/mocha/bin/mocha test/integration --exit",
    "test": "npm run test:js && npm run test:package",
    "check": "tsc --noEmit -p tsconfig.check.json",
    "lint": "eslint",
    "release": "release-script",
    "version": "auto-changelog -p && git add CHANGELOG.md"
  },
  "resolutions": {
    "glob-parent": "^6.0.1"
  },
  "bugs": {
    "url": "https://github.com/Chris-1965/ioBroker.huum-sauna/issues"
  },
  "directories": {
    "lib": "lib",
    "test": "test"
  }
}