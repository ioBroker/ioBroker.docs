---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/images.md
title: Working with Images
hash: +7btQz2YwNxQ7cvAm6lflniM5CCWalHSRI06eUPOpmQ=
---
--- title: Working with Images lastChanged: 07/31/2019 ---

# How to use images
After images have been downloaded from the download page, they are written to the SD card using an image tool (e.g. Balena-Etcher).

The further procedure for each individual image can be different.
This is why the **Info** button is located on the download page under each image.

If you click on this, the ReadMe belonging to this image appears.

The further procedure and safety instructions are stored there.

The current test image "2021-07-30-ioBrokerPi-lite.img" can be written to the SD card using the following commands under Unix:

** sudo umount / dev / sdx **

** sudo dd bs = 1M if = 2021-07-30-ioBrokerPi-lite.img of = / dev / sdx ***