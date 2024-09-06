---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/iot.md
title: IoT Cloud (integration with ioBroker and Alexa/Google Home)
hash: Jn5zi5Ng971YRIYy5N9B5C9BsTb63MslS6dLERelnMM=
---
# IoT Cloud (integration with ioBroker and Alexa/Google Home)
Origin: https://forum.iobroker.net/topic/17834/ank%C3%BCndigung-weihnachtsaktion-assisten-service-iobroker-iot-reloaded-alexa-und-services

Controlling your devices with Alexa is now easier than ever.
Here's how you can use the Cloud Adapter to seamlessly connect to Alexa and make your home smarter. Unfortunately, it turns out that existing solutions can't always keep up with the growing number of users.
That's why we're introducing the IoT Service, a future-proof solution specifically designed for seamless integration with Alexa and other assistants.

To ensure that the setup of the IoT instance and the connection to it works, the new assistant license package can only be purchased once a connection has been successfully created, the link is successful and the control of at least one device has worked.
So don't be surprised that nothing is available in `Pro-Cloud-Account`.

Therefore, please follow the updated instructions first:

1. If you do not yet have a Pro account, first register an account at https://iobroker.pro/intro.

Otherwise just use the existing `Pro-Account`.

Newly created accounts have a 7-day "trial version" of the assistant license with a limit of 20,000 requests per month.
However, a purchased assistant license starts immediately, so no remaining days are taken into account! After the 7 days have expired without purchasing an assistant license, up to 20 requests per day are transferred free of charge.
It is then blocked for the day.

Existing Pro accounts without a license can also test the assistant package for 7 days when the promotion starts - these 7 days start when the IoT service user is created by entering the login data in the IoT adapter.

Pro accounts with an existing Assistant or Remote Access license also have 20,000 requests per month.

2. Then install the `ioBroker.IoT` adapter from the normal repository - just filter for "IoT".

In the adapter configuration, please enter the login data from https://iobroker.pro (email in lowercase and password! No app key or anything like that!).
The buttons "Get new connection certificates" or "Recreate IoT credentials" are only needed in case of errors.

If the IoT adapter is already installed, please check for updates and update to at least 0.2.2.

![Configuration](../../de/cloud/media/iot_settings.png)

Continue to make all necessary settings here and check smart devices.

It is also recommended to create groups in the ioBroker IoT adapter rather than on Amazon, as groups on Amazon cause unnecessary traffic because Amazon sends a separate control command for each device!

Another advantage is that the groups are retained when the Amazon account is set up again.

3. The adapter should now connect to the IoT service and turn green.

If that doesn't work and the adapter is yellow, for example, please check the log file and look in the FAQ below.

Restarting the instance can also help.

Most of the time it's simple things like incorrect login data (note: also pay attention to upper and lower case!)! The error messages in the log have been improved and should now better indicate what the problem is.

4. After the first connection, an Alexa account will be automatically created with the same password as ioBroker.pro.

The iobroker.iot instance must be "green".

5. It may happen that passwords containing `#` symbol do not work yet.

The issue is being investigated, so please do not use `#` in the password.

5. Then install the new "ioBroker.iot" [Skill](https://www.amazon.de/ioBroker-ioBroker-iot/dp/B07L66BFF9) and click on "Activate".

The IoT service login screen should then appear.
Use the email address and password of the Pro Cloud account here.

**Please write the login in lowercase: `MyEmail@gmx.de` is wrong; `myemail@gmx.de` is correct!**

Anyone who already uses the IoT services (previously or with the custom skill) simply logs in directly with their IoT access data when activating the skill.

![Login](../../de/cloud/media/iot_login.png)

After a successful login, you will see a success message and the skill is activated.
If not, please check your login details and try again.

6. Amazon should now offer you the device search.

After this has run, all devices stored in the IoT adapter should also be found in Amazon.

7. Please check now whether your devices can be controlled by voice or the Alexa app.

This step is important and at least one switching action must have been successful before you can proceed to the next step!

8. Now it's best to go to Amazon and give the skill 5 stars (because everything worked) :)

Good reviews (real ones of course, this is not a call to fake reviews!) and thus the skill placement also have a certain influence on the costs of the Amazon services used by the IoT service!

9. So if you have successfully connected the IoT adapter, activated the skill and can successfully control your devices,

you now have to decide whether you want to buy the assistant package as part of the Christmas campaign or whether the 20 requests per day might even be enough for you.
If you want to buy the package, please go to https://iobroker.pro in your browser and log in there with your Pro Cloud access data.
If you don't see a menu, click on the avatar icon in the top right and select "Remote Access" in the menu.

Remote access to admin and editors does not work with this license!

It is also not possible to update to Remote later. This would mean purchasing a new Remote license.

If you need full remote access (including editors) to ioBroker, you can also buy the remote license (at a price of €5.49/month or e.g. €44.99/year (=€3.75/month)), which automatically includes smart assistant support (Alexa, Google Home).

You can find an overview of the licenses and functions in the following table:

| Functions / License | | without license | Smart Assistant License | Remote Access License |
|----------------------------------------|------------------|------------------|--------------------------|-----------------------|
|                                        | **iobroker.net** | **iobroker.pro** | **iobroker.pro** | **iobroker.pro** |
| Alexa Skills | - | 20 requests/day | 20,000 requests/month | 20,000 requests/month |
| Google Home | - | 20 requests/day | 20,000 requests/month | 20,000 requests/month |
| Remote access vis(2) (not editable) | ✓ | - | - | ✓ |
| Remote access admin, vis(2) (editable) | - | - | - | ✓ |
| Service (POST call) | - | ✓ | ✓ | ✓ |
| Service (POST/GET call) | - | - | ✓ | ✓ |

The requests are divided between all services used by the user. This means that if 10,000 requests are made to Alexa and 10,000 to Google Home with an Assistant license, then the 20,000 requests are used up.

For remote access `ioBroker.cloud` adapter is required. For all other functions `ioBroker.iot` adapter is required.

The Smart Assistant license costs €15.99 for 6 months (€2.67 monthly) and €23.99 for one year (€1.99 monthly).

Prices may still be subject to change depending on how the exact operating costs for the necessary infrastructure develop!

## Troubleshooting
If the password of ioBroker.pro in Alexa skill does not match, please check:

- `ioBroker.iot` adapter is installed and the instance is "green",
- Login is entered in lowercase letters,
- the password does not contain a `#` character,
- If none of this helps, please press this button:

  ![Recreate](../../de/cloud/media/iot_passwort.png)

- The ports for communication (output) are not blocked in the firewall: 443, 8443 and 8883.

After that, ioBroker.iot should restart itself and then try to activate the ioBroker.iot skill again.