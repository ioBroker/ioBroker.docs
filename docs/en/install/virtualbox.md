---
title: installation
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/virtualbox.md
hash: ojdJt/Bd/RzAa+nPIcMrXd0dcayKGusHGKxwmcoeNJY=
---
# Set up and install ioBroker in VirtualBox
?> ***This is a placeholder***.<br><br> Help ioBroker and expand this article. Please note the [ioBroker Style Guide](community/styleguidedoc) so that the changes can be adopted more easily.

@@@ http://www.iobroker.net/docu/?page_id=5358&lang=de @@@

First, let's get a recent stable version of Debian https://www.debian.org/CD/http-ftp/#stable

A little further down under CD we click on AMD64

Now we download the “debian-8.4.0-amd64-netinst.iso” If there is a newer version, use it, at the time of download Debian 8.4.0 was up to date.
I use the Netinst because the file is small and the installation only reloads small things from the network.

After that we create a new virtual machine and give it a name.
In my example ioBroker_Debian_Jessie_x64 Recording87.jpg Then specify the amount of main memory that we want to allocate to the VM.
In my example 4GB RAM Recording88.jpg

Click on Create Hard Disk Recording89.jpg

Choose VDI (Virtual Image Box) Capture90.jpg

When it comes to the type of storage, it is up to you what you choose.
In my example I use DYNAMIC ALLOCATED Recording91.jpg

Now we can change the file name of the VM (if we want to) and enter the size of the available partition for our VM. In my example 10GB Recording92.jpg

Now the VM is set up.
If we now click CHANGE, we can set a few more things about the VM.

We go to the tab MASS STORAGE Click UNDER Controller: IDE

A CD logo appears on the right side under Attributes.
We'll click on that and choose Choose FILE FOR VIRTUAL CD/DVD media.
Now we navigate in Explorer to the downloaded ISO file of Debian and select it.
The whole thing should then look like this: Recording93.jpg

Since I want to access ioBroker in my network and not in a sub, I select NETWORK BRIDGE Recording94.jpg under the NETWORK tab under CONNECTED TO

Now we have set everything necessary.
The installation of Debian can start.
We click on START and end up in the following picture.
We select INSTALL Recording95.jpg

Language: Select GERMAN from Recording96.jpg

Location: Select GERMANY from Recording97.jpg

Keyboard layout: Select GERMAN from Recording98.jpg

Computer name: We enter the name of the computer to be installed.
In my example ioBrokerVM (if someone wants to play back backups from their ioBroker productive system as a test, please enter the same name as your Rasp Pi / Cubie / BananaPi etc.) Recording100.jpg

Domain name: The field can be left blank Recording101.jpg

Root password: Your root password Recording102.jpg

Repeat root password: Your root password again Recording103.jpg

Create user: In my example, NIPPY Recording104.jpg

Create user name: In my example, NIPPY Recording105.jpg

User password: Your user password Recording106.jpg

Repeat user password: Your user password again Recording107.jpg Time zone: We choose BERLIN

Recording108.jpg

Partition Disk 1: We choose GUIDED – USE FULL DISK Recording109.jpg

Hard disk partitioning 2: We select our hard disk from Recording110.jpg

Hard disk partitioning 3: We select ALL FILES ON ONE PARTITION, RECOMMENDED FOR BEGINNERS Recording111.jpg

Hard disk partitioning 4: We choose EXIT PARTITIONING AND SAVE CHANGES Recording112.jpg

Hard disk partitioning 5: We select YES Recording113.jpg Package Manager Configuration 1: We select GERMANY Recording115.jpg

Configure Package Manager 2: I chose ftp.de.debian.org Recording116.jpg

Configure Package Manager 3: you can leave blank and go to CONTINUE Recording118.jpg

Popular contest: I voted NO Recording119.jpg

Software selection: We select SSH SERVER & STANDARD SYSTEM TOOLS the rest we deselect (if selected) Recording120.jpg

GRUB bootloader 1: we select YES Recording121.jpg

GRUB bootloader 2: we select our HDD /dev/sda (ata-Vbox………) Recording122.jpg

Installation Complete: Recording123.jpg

Now the system reboots and we land in the login

Login: Recording124.jpg

We log in with our root account: Login: root Password: YOUR PASSWORD ASSIGNED Recording125.jpg

Now we update the system: apt-get install update 1

apt-get install update apt-get install upgrade 1

apt-get install upgrade

Since SUDO is not installed, do like this: aptitude install sudo 1

aptitude install sudo

The NPM installation follows: apt-get install npm 1

apt-get install npm

Then we install CURL: apt-get install curl 1

apt-get install curl

Prepare and install NodeJs curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - 1

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

apt-get install nodejs 1

apt-get install nodejs

When that is done, the installation of ioBroker takes place

First we create the iobroker directory: mkdir /opt/iobroker 1

mkdir /opt/iobroker

We change to the iobroker directory: cd /opt/iobroker 1

cd /opt/iobroker

Now we install iobroker: npm install --unsafe-perm iobroker 1

npm install --unsafe-perm iobroker

At the end of the installation the following should appear: Recording137.jpg

—

If you want, you can still install htop. I use it in the terminal to look at the memory usage / CPU load etc.

This is installed with: apt-get install htop 1

apt-get install htop

it is run with: htop 1

htop

And looks like this: Recording139.jpg

I hope to have made it easier for some beginners to set up a VM including ioBroker.

The installation of ioBroker in a VM often failed for me, on the BananaPi it ran without any problems.

In any case, this installation routine worked wonderfully for me on the VM.

1 Supplement: 1.1 Start VirtualBOX VM automatically (Ubuntu 16.10): 1.2 Adjust the 3 variables! (if necessary, comment out the 3rd variable or add more, depending on the VM instances)

Addendum: Automatically start VirtualBOX VM (Ubuntu 16.10):

https://www.freesoftwareservers.com/ind … nd-vbox-5/

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

Adjust the 3 variables! (if necessary, comment out the 3rd variable or add more, depending on the VM instances)

Set in the BIOS (if running on a computer) that the old ON/OFF status should be restored in the event of a power failure. In the event of a power failure, it then restarts and the VM then also starts.

Create backups with VirtualBOX and Back in Time

In VirtualBOX you can easily create savepoints manually. It only takes a few seconds and 1 click. Always do before an iobroker update or script changes! Screenshot dated 2016-04-26 22-48-04.png

You can restore the previous version with one click.

Memory consumption: a dynamic VM with 10 GB and Ubuntu 16.10 Full + iobroker occupies about 1.7 GB of memory. My 11 snapshots occupy 8.6 GB.

I automatically copy my entire personal area, including the VirtualBOX VM directory, to a second hard drive every night using the “Back in Time” program. Several versions are kept there and automatically deleted after a certain period of time.
Screenshot dated 2016-04-26 22-55-23.png This is running VirtualBox.

```
sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms
```

You can also install an extension pack, it also supports, for example, the connection of USB 2.0 or 3.0 devices from the host to the client, webcam pass-through from the host to the client and AES encryption. You can download it [URL:https://www.virtualbox.org/wiki/Downloads]here – point 2 (extension pack)[/url] Download this file and open it either as admin or open and install it via VirtualBOX / Global Settings / Additional Packages (but start VirtualBOX as Admin).

The minimum hardware requirements are very low. You have to figure out how it fits. Theoretically, 512 RAM and an old Intel processor are enough. For example, it should run smoothly on all Intel NUC generations.
For continuous operation, it is of course important to have a power-saving host. You can easily tinker powerful under 10 watt computers these days. There are various 10-watt PC manuals on the Internet. It is important that you do without your (own) graphics card if possible and have a power supply unit that is efficient in the lower load range, and not use a high-end mainboard, because the more functions it has, the more chips suck at the power.
I can really recommend the Intel NUC series for Windows or Ubuntu. I'll quote my signature: iobroker in an Ubuntu VM with VirtualBOX on an Intel NUC NUC6i3SYH (i3 Skylake), M.2 SSD, 8 GB RAM, Ubuntu 16.10. 6-8W idle.

In Virtualbox I have set the network card of the VM to “Bridged”, i.e. the VM is connected to the LAN router like a separate computer.

And the fixed IP is set quite normally within the VM via the installed operating system.
This can work like this on Debian:

Terminal:

```
sudo nano /etc/network/interfaces
```

There could be something like this:

```
  auto eth0
    allow-hotplug eth0
    iface eth0 inet dhcp
```

You change that to (attention, adapt the numbers to your own environment)

```
 auto eth0
    iface eth0 inet static
        address 192.168.1.7
        netmask 255.255.255.0
        gateway 192.168.1.1
```

Where eth0 is the name of your own LAN device, it will probably be called differently in a VM, when changing you will then need to replace the two eth0 words with the correct names.