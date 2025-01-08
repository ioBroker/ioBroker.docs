---
title: installation
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/virtualbox.md
hash: zoJH4HPQb5fjZZk7ln+yhEsqRR9r5z/9T/Z6NfOncwk=
---
# Setting up and installing ioBroker in VirtualBox
@@@ http://www.iobroker.net/docu/?page_id=5358&lang=de @@@

First we get a current stable version of Debian https://www.debian.org/CD/http-ftp/#stable

A little further down we click on AMD64 under CD

Now we download the `debian-8.4.0-amd64-netinst.iso` If there is a newer version, use that; at the time of downloading, Debian 8.4.0 was current.
I use the `Netinst` because the file is small and the installation only downloads small things from the network.

Then we create a new virtual machine and give it a name.
In my example ioBroker_Debian_Jessie_x64 Aufnahme87.jpg Then specify the size of the main memory that we want to allocate to the VM.
In my example 4GB RAM Aufnahme88.jpg

Click on Create Hard Disk Recording89.jpg

Select VDI (Virtual Image Box) Recording90.jpg

When it comes to the type of storage, it is up to each individual to choose what they want.
In my example, I use DYNAMIC ALLOCATION Recording91.jpg

Now we can change the file name of the VM (if desired) and enter the size of the partition available for our VM. In my example 10GB Recording92.jpg

The VM is now fully configured.
If we now click on CHANGE, we can configure a few more things for the VM.

We go to the tab MASS STORAGE Click UNDER Controller: IDE

A CD logo appears on the right side under Attributes.
We click on this and select SELECT FILE FOR VIRTUAL CD/DVD MEDIUM.
Now we navigate in Explorer to the downloaded ISO file from Debian and select it.
The whole thing should then look like this: Aufnahme93.jpg

Since I want to access ioBroker in my network and not in a sub, I set the selection under NETWORK under CONNECTED TO to NETWORK BRIDGE Aufnahme94.jpg

Now we have set up everything we need.
The installation of Debian can begin.
We click on START and land on the following screen.
We select INSTALL Aufnahme95.jpg

Language: Select GERMAN from Recording96.jpg

Location: Select GERMANY from Recording97.jpg

Keyboard layout: Select GERMAN from Aufnahme98.jpg

Computer name: We enter the name of the computer to be installed.
In my example ioBrokerVM (if someone wants to restore backups from their ioBroker production system for testing purposes, please enter the same name as your RasPi / Cubie / BananaPi etc.) Recording100.jpg

Domain name: This field can be left blank Recording101.jpg

Root password: Your root password Recording102.jpg

Repeat root password: Enter your root password again Recording103.jpg

Create user: In my example NIPPY Aufnahme104.jpg

Create username: In my example NIPPY Recording105.jpg

Password for user: Your user password Recording106.jpg

Repeat user password: Your user password again Recording107.jpg Time zone: We choose BERLIN

Recording108.jpg

Hard drive partitioning 1: We select GUIDED – USE FULL HARD DRIVE Recording109.jpg

Hard drive partitioning 2: We select our hard drive Recording110.jpg

Hard drive partitioning 3: We select ALL FILES ON ONE PARTITION, RECOMMENDED FOR BEGINNERS Recording111.jpg

Hard drive partitioning 4: We select FINISH PARTITIONING AND APPLY CHANGES Recording112.jpg

Hard disk partitioning 5: We select YES Aufnahme113.jpg Package manager configuration 1: We select GERMANY Aufnahme115.jpg

Package Manager Configure 2: I chose ftp.de.debian.org Recording116.jpg

Package Manager Configure 3: can be left blank and click NEXT Recording118.jpg

Popularity Contest: I chose NO Aufnahme119.jpg

Software selection: We select SSH SERVER & STANDARD SYSTEM TOOLS and deselect the rest (if selected) Aufnahme120.jpg

GRUB bootloader 1: we select YES Recording121.jpg

GRUB bootloader 2: we select our HDD /dev/sda (ata-Vbox………) Aufnahme122.jpg

Installation Completed: Recording123.jpg

Now the system reboots and we land in the login

Login: Recording124.jpg

We log in with our root account: Login: root Password: YOUR ASSIGNED PASSWORD Recording125.jpg

Now we update the system: apt-get install update 1

apt-get install update apt-get install upgrade 1

apt-get install upgrade

Since SUDO is not installed, do this: aptitude install sudo 1

aptitude install sudo

The following is the NPM installation: apt-get install npm 1

apt-get install npm

Then we install CURL: apt-get install curl 1

apt-get install curl

Preparing and installing NodeJs curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - 1

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

apt-get install nodejs 1

apt-get install nodejs

Once this is done, the installation of ioBroker will take place

First we create the directory iobroker: mkdir /opt/iobroker 1

mkdir /opt/iobroker

We change to the iobroker directory: cd /opt/iobroker 1

cd /opt/iobroker

Now we install iobroker: npm install --unsafe-perm iobroker 1

npm install --unsafe-perm iobroker

At the end of the installation the following should appear: Recording137.jpg

—

If you want, you can install htop. I use it in the terminal to see the memory usage/CPU load etc.

This is installed with: apt-get install htop 1

apt-get install htop

it is executed with: htop 1

htop

And looks like this: Recording139.jpg

I hope I have made it easier for some beginners to set up a VM including ioBroker.

For me, the installation of ioBroker in a VM often failed, but on the BananaPi it ran without problems.

In any case, this installation routine worked wonderfully for me on the VM.

1 Addition: 1.1 Start VirtualBOX VM automatically (Ubuntu 16.10): 1.2 Adjust the 3 variables! (If necessary, comment out the 3rd variable or add more, depending on the VM instances)

Addition: Start VirtualBOX VM automatically (Ubuntu 16.10):

https://www.freesoftwareservers.com/ind…nd-vbox-5/

Create file:

sudo nano /etc/init.d/StartVM &amp;&amp; sudo chmod +x /etc/init.d/StartVM &amp;&amp; sudo update-rc.d StartVM defaults 99 01 1

sudo nano /etc/init.d/StartVM &amp;&amp; sudo chmod +x /etc/init.d/StartVM &amp;&amp; sudo update-rc.d StartVM defaults 99 01

File content:

```
#! /bin/sh
# Start VirtualBox @boot
# /etc/init.d/StartVM
#

#Edit these variables!
VMUSER=user
VMNAME=VM1
VMNAME2=Test

case "$1" in
  start)
    echo "Starting VirtualBox VM ..."
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME &amp;
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME2 &amp;
    ;;
  stop)
    echo "Saving state of Virtualbox VM ..."
    sudo -u $VMUSER VBoxManage controlvm $VMNAME savestate
    sudo -u $VMUSER VBoxManage controlvm $VMNAME2 savestate
    ;;
  *)
    echo "Usage: /etc/init.d/StartVM {start|stop}"
    exit 1
    ;;
esac

exit 0
```

Adjust the 3 variables! (If necessary, comment out the 3rd variable or add more, depending on the VM instances)

In the BIOS (if it is running on a computer), set it to restore the old ON/OFF status in the event of a power failure. If the power fails, it will then restart and the VM will then start as well.

Create backups with VirtualBOX and Back in Time

In VirtualBOX you can easily create backup points manually. It only takes a few seconds and 1 click. Always do this before an iobroker update or before making script changes! Screenshot from 2016-04-26 22-48-04.png

With one click you can restore the previous version.

Memory usage: a 10 GB dynamic VM with Ubuntu 16.10 Full + iobroker takes up about 1.7 GB of space. My 11 snapshots take up 8.6 GB.

Every night I automatically copy my entire personal area, including the VirtualBOX VM directory, to a second hard drive using the program “Back in Time”. Several versions are kept there and automatically deleted after certain times.
Screenshot from 2016-04-26 22-55-23.png This is how VirtualBox works.

```
sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms
```

You can also install an extension pack, which supports, for example, the connection of USB 2.0 or 3.0 devices from the host to the client, webcam pass-through from the host to the client and AES encryption. You can download it [URL:https://www.virtualbox.org/wiki/Downloads]here - the 2nd point (Extension Pack)[/url] You download this file and either open it as an admin or open and install it via VirtualBOX / Global Settings / Additional Packages (but start VirtualBOX as an admin).

The minimum hardware requirements are very low. You have to figure out for yourself what works best. In theory, 512 RAM and an old Intel processor are enough. It should run on all Intel NUC generations without any problems, for example.
For continuous operation, it is of course important to have a power-saving host. These days, you can easily put together powerful computers under 10 watts. There are various 10 watt PC instructions on the Internet. It is important that you avoid using a (own) graphics card if possible and have a power supply that is efficient in the low load range, and do not use a high-end motherboard, because the more functions it has, the more chips suck power.
I can really recommend the Intel NUC series for Windows or Ubuntu. I'll quote my signature: iobroker in an Ubuntu VM with VirtualBOX on an Intel NUC NUC6i3SYH (i3 Skylake), M.2 SSD, 8 GB RAM, Ubuntu 16.10. 6-8 W idle.

In Virtualbox, I set the VM’s network card to “Bridged,” so that the VM is connected to the LAN router like its own computer.

And the fixed IP is set up normally within the VM via the installed operating system.
This can work like this with Debian:

Terminal:

```
sudo nano /etc/network/interfaces
```

It could say something like this:

```
  auto eth0
    allow-hotplug eth0
    iface eth0 inet dhcp
```

You change this to (note: adapt the numbers to your own environment)

```
 auto eth0
    iface eth0 inet static
        address 192.168.1.7
        netmask 255.255.255.0
        gateway 192.168.1.1
```

Where eth0 is the name of your own LAN device, it will probably be called something different in a VM, when changing you have to replace the two eth0 words with the correct names.