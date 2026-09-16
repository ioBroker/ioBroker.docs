---
chapters: {"pages":{"en/adapterref/iobroker.synology/README.md":{"title":{"en":"ioBroker Synology adapter"},"content":"en/adapterref/iobroker.synology/README.md"},"en/adapterref/iobroker.synology/docs/en/template.md":{"title":{"en":"2FA"},"content":"en/adapterref/iobroker.synology/docs/en/template.md"}}}
---
# 2FA

Follow these steps to configure 2FA in DSM6:

![Picture](img/2FA_step_1.png)

![Picture](img/2FA_step_2.jpg)

![Picture](img/2FA_step_3.jpg)

![Picture](img/2FA_step_4.jpg)

Write down the Secret key, it must be specified in the adapter settings.
Complete the 2FA setup.

![Picture](img/2FA_step_5.jpg)

![Picture](img/2FA_step_7.jpg)

![Picture](img/2FA_step_8.jpg)

![Picture](img/admin.jpg)

If this do not work out or it can not be found that way (on DSM7 or such) then try this:

Click on "user options" => "personal" => "2FA" => Verification Code (OTP) => Reset devices => "Can't scan it?" and here you get the secret key - copy and paste this to iobroker, go back, scan the code with your mobile and validate it.