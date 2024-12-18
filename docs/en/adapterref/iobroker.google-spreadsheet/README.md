![Logo](admin/google-spreadsheet.png)
# ioBroker.google-spreadsheet

[![GitHub license](https://img.shields.io/github/license/ThomasPohl/ioBroker.google-spreadsheet)](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)](https://www.npmjs.com/package/iobroker.google-spreadsheet)
![GitHub repo size](https://img.shields.io/github/repo-size/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/ThomasPohl/ioBroker.google-spreadsheet/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub issues](https://img.shields.io/github/issues/ThomasPohl/ioBroker.google-spreadsheet)
</br>
**Version:** </br>
[![NPM version](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)](https://www.npmjs.com/package/iobroker.google-spreadsheet)
![Current version in stable repository](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![Number of Installations](https://iobroker.live/badges/google-spreadsheet-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml)

## google-spreadsheet adapter for ioBroker

This adapter can be used to automatically interact with google spreadsheets.

## Features

* [Append data to spreadsheet](features/append.md)
* [Delete rows from a spreadsheet](features/delete-rows.md)
* [Create sheets](features/create-sheet.md)
* [Delete sheets](features/delete-sheet.md)
* [Duplicate sheets](features/duplicate-sheet.md)
* [Read cell](features/read-cell.md)
* [Write cell](features/write-cell.md)

## Usage

### Setup

#### Enable API Access
1. Visit the [Google Cloud Console](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com).

2. Create or select an existing project that you wish to use with the API.

3. Enable the Google Spreadsheet API for your project.

#### Create a Service Account

For the project you selected in the previous step, create a new service account in Google Cloud IAM by following these steps:

1. Navigate to the IAM & Admin page in the [Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).

2. Click on "Service accounts" and then "Create Service Account."

3. Provide a name for the service account and select the role "Project" > "Editor."

4. Click "Continue" to proceed to the next step.

5. On the "Keys" tab, click "Create Key" and choose the format as "JSON." Then click "Continue."

6. Your private key will be generated and automatically downloaded. Keep this file secure as you will need it later.

#### Grant Access to the Spreadsheet

Open the spreadsheet you want to interact with and share it with the email address of your newly created service account:

1. Open the desired spreadsheet in Google Sheets.

2. Click "Share" in the upper right corner.

3. Enter the email address of the service account in the "Add people" field and grant it the necessary permissions (e.g., "Edit" or "View").

4. Click "Send" to complete the sharing process.

#### Configure the Adapter Instance

Add the following information to the configuration of your adapter instance in ioBroker:

- **Spreadsheet ID** - You can find the ID in the URL of your spreadsheet.
- **Service Account** - The email address of the service account you created.
- **Private Key** - Open the downloaded JSON file, and locate the private key within the file. Copy only the part starting with "-----BEGIN PRIVATE KEY-----."

![Settings](img/settings.png)

#### Find the Spreadsheet ID in the URL

To locate the "Spreadsheet ID" in the URL of your Google Sheets document, follow these steps:

1. When you open your Google Sheets document in a web browser, the URL in the address bar will look something like this:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```
2. The "SPREADSHEET_ID" is the long string of characters and numbers between the "/d/" and "/edit" parts of the URL.


### Blockly

Use the available blocks to automatically interact with your spreadsheet.

![Blockly](img/blockly-append.png)

## Troubleshooting

### Error while sending data to Google Spreadsheet:Error: error:0909006C:PEM routines:get_name:no start line
When copying the private key into the configuration, make sure there are no \n. If there are \n in the key, please replace the with normal line breaks

### Error while sending data to Google Spreadsheet:Error: The caller does not have permission
Make sure the Service Account has adequate permissions to write to the spreadsheet. Refer to the "Grant Access to the Spreadsheet" section above.


## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.0
* (Thomas Pohl) Minimum node.js version is now 20
* (Thomas Pohl) Display connection state
### 0.4.0
* (Thomas Pohl) The privateKey is saved now encrypted
* (Thomas Pohl) Support for node.js 22
### 0.3.1
* (Thomas Pohl) Fixed reading cells and added error handling
### 0.3.0
* (Thomas Pohl) Added writing of single cells
* (Thomas Pohl) Added reading of single cells
* (Thomas Pohl) Documentation for all features
### 0.2.0
* (Thomas Pohl) Parsing of private keys is now more robust
### 0.1.0
* (Thomas Pohl) Preparation for first stable release
* (Thomas Pohl) Improve logging + Code cleanup


## License

   Copyright (c) 2024 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
