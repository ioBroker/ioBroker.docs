---
title: Proxmox
Version: 0.3
Autoren: TeNNo2k5, crunchip
Schlüsselworte: Proxmox, VM, LXC, USB Passthrough, Usb-Backup
lastChanged: 19.07.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/proxmox.md
hash: xPuZa8GwSHFOQvzLTcwjQAH6pKNwjtULn7pN8j6tAvU=
---
# Proxmox
![proxmox logo](../../de/install/media/proxmox/Proxmox-logo-860.png)

## Proxmox Installation
Proxmox Virtual Environment (Proxmox VE for short) is a Debian-based virtualization platform. The virtualization is based on QEMU/KVM.

Proxmox "packages" QEMU/KVM in its own web interface, simplifies administration, and also supports Linux containers (LXC). This makes Proxmox beginner-friendly, yet powerful enough for professional use.

This section demonstrates the installation and basic configuration of Proxmox in the free (non-subscription) version using an example.

For clarity, image descriptions and additional information can be expanded.

_Note:_ Some images in this guide are from older versions of Proxmox or Debian. However, the process and click paths are consistent and directly applicable to current versions (such as Proxmox VE 9 and Debian 13).

### Requirements
<details><summary>Requirements</summary>

- 64-bit CPU
- CPU and motherboard support Intel VT/AMD-V for virtualization (in

(to enable BIOS).

- 1 GB RAM (for Proxmox only) – depending on the number of virtual machines to be run, more RAM will naturally be required. Therefore, a minimum of 8 GB, or even better, 16 GB of RAM is recommended.

</details>

### Create an ISO image/bootable USB stick
First, you need an ISO image, which can be downloaded from [Proxmox download page](https://www.proxmox.com/de/downloads/category/iso-images-pve).

<details><summary>Proxmox Iso</summary>

![proxmox-iso](../../de/install/media/proxmox/proxmox-iso.png)

</details>

To install, create a bootable USB drive using this ISO image.

This drive should have at least 2 GB of storage. There are several ways to create a bootable USB drive; see [Preparing Installation Media][].

### Installation
The system is configured in the UEFI/BIOS to boot from a USB device. After inserting the USB stick, the Proxmox installation menu appears after a short time. Alternatively, the USB stick can be manually specified as the boot device (on most motherboards via F8 or F11).

In the installation menu, simply select **Install Proxmox VE**.

<details><summary>Installation Menu</summary>

![installation menu](../../de/install/media/proxmox/installationsmenü.png)

</details>

The next step is to agree to the terms of use (EULA).

<details><summary>Eula</summary>

![eula](../../de/install/media/proxmox/eula.png)

</details>

Next, you need to choose the hard drive on which to install Proxmox. If multiple drives are installed on the server, make sure you select the correct one!

<details><summary>Hard drive selection</summary>

![hard drive selection](../../de/install/media/proxmox/festplattenauswahl.png)

</details>

The **Options** button allows you to specify further parameters for the installation hard drive:

<details><summary>Advanced options Hard drive</summary>

![hard disk options](../../de/install/media/proxmox/harddisk-options.png)

</details>

Proxmox uses the LVM (Logical Volume Management) interface. The advanced options available here allow for detailed configuration of the LVM.

The installer creates a Volume Group (VG) named pve and additional Logical Volumes (LVs) named root (where Proxmox itself is installed), data (storage for the virtual disks of the VMs), and swap (where the swap file is stored).

<details><summary>The advanced settings allow you to specify certain parameters here:</summary>

- Filesystem: Here you can choose the filesystem. The default is ext4, which is a good choice in most cases. If multiple hard drives are available on the host system (and plenty of RAM), the ZFS option with the appropriate RAID level makes sense. In this case, however, you should have a basic understanding of ZFS.
- hdsize: Specifies the total hard drive size to be used by Proxmox. Normally, you would select the entire hard drive size here, unless you plan to add more partitions later.
- swapsize: Determines the size of the swap volume. The default is the same size as the installed memory, but with a minimum of 4 GB and a maximum of 8 GB.
- maxroot: Specifies the maximum size of the root volume (Proxmox itself). **It should be noted that in the basic installation, later required templates and ISO images are also stored here.**
- minfree: Storage space left free on the LVM volume group pve. If the hard drive is larger than 128 GB, 16 GB are left free by default (LVM always needs some free space for creating snapshots).
- maxvz: Sets the maximum size of the data volume.

</details>

Normally, you can leave all options at their default settings (i.e., nothing is specified here). These are already optimally configured for most installations.

After selecting the hard drive for Proxmox, the localization options are requested (country, time and the corresponding keyboard layout):

<details><summary>Localization</summary>

![location](../../de/install/media/proxmox/location.png)

</details>

Next, you will be asked to enter the root user's password. You will also be asked for an email address to send important system messages. A valid email address is not required (however, you will then not receive email notifications of system events).

<details><summary>Password and email</summary>

![password](../../de/install/media/proxmox/password.png)

</details>

The next step of the installer deals with the network settings. You can select the appropriate interface. The hostname is freely selectable, but requires the DNS domain to be specified.

For example, for Fritz!Box users, it would be `hostname.fritz.box`.

For the IP address, a static IP address should preferably be specified (not DHCP). This includes the IP address itself (in CIDR notation), the gateway IP (usually the router's IP address), and the DNS server to be used (in a home environment, usually also the router's IP address). Proxmox usually detects the network automatically.

<details><summary>network</summary>

![network](../../de/install/media/proxmox/network.png)

</details>

Finally, a summary of the installation is displayed:

<details><summary>Summary</summary>

![summary](../../de/install/media/proxmox/zusammenfassung.png)

</details>

The system will be installed by checking the settings and clicking on Install.

<details><summary>installation</summary>

![installation](../../de/install/media/proxmox/installation.png)

</details>

After a short wait, the installation is complete and the system is restarted (remove the USB stick containing the ISO image beforehand).

Next, you'll see the terminal. Here, instructions are displayed on how to access the system:

<details><summary>console</summary>

![console](../../de/install/media/proxmox/konsole.png)

</details>

Now, proceed in your browser (for example, https://10.1.1.89:8006). First, a warning message will appear. This is because a self-signed certificate was generated during installation, which the browser doesn't recognize. You can safely ignore this message at this point – the connection is definitely encrypted via HTTPS. The message itself varies depending on the browser. In this example, click on **Advanced** and then on **Continue to 10.1.1.89 (unsafe)**.

<details><summary>Data protection error</summary>

![data protection error](../../de/install/media/proxmox/datenschutzfehler.png)

</details>

Login is performed with the username root and the password chosen during installation. The language can be changed to German **first**, which eliminates the need to re-enter the username and password.

<details><summary>Registration</summary>

![registration](../../de/install/media/proxmox/anmeldung.png)

</details>

Immediately after logging in, you will be greeted with a message stating that you do not have a valid subscription for this server. This message should be acknowledged by clicking OK.

<details><summary>Subscription</summary>

![subscription](../../de/install/media/proxmox/subskription.png)

</details>

The Proxmox package sources are now being adjusted to receive updates.

<details><summary>Package sources</summary>

![package sources](../../de/install/media/proxmox/paketquellen.png)

</details>

To do this, the **Non-Subscription Repository** is added to the package sources. This can be done in the Proxmox instance menu under `Updates > Repositories`. The Non-Subscription Repository can be added using the Add button.

<details><summary>Non-Subscription</summary>

![no-subscription](../../de/install/media/proxmox/no-subscription.png)

</details>

Now the **Enterprise Repository** should be deactivated. To do this, simply select the pve-enterprise repository in the repository view and click the **Deactivate** button.

The repository configuration then looks like this:

<details><summary>Enterprise Repository</summary>

![enterprise](../../de/install/media/proxmox/enterprise.png)

</details>

### Updates
After the package sources have been changed, an initial system update should be performed. The best way to do this is via the web interface:

<details><summary>Updates</summary>

![updates](../../de/install/media/proxmox/updates.png)

</details>

Simply select the desired Proxmox node (e.g., "pve") and then click **Update** under Updates. This will open the Task Viewer, which appears when system activity is detected. You can close this dialog immediately, as the task continues to run in the background. Waiting for completion ("TASK OK") is not necessary.

If updates are available, you can install them by clicking **Upgrade**.

The web console will then open, allowing you to monitor the progress.

<details><summary>Web console</summary>

![web console](../../de/install/media/proxmox/web-konsole.png)

</details>

It is of course also possible to update the Proxmox server via the command line (e.g. via SSH):

```bash
apt-get update && apt-get dist-upgrade
```

or, more recently:

```bash
apt update && apt full-upgrade
```

The only important thing here is to use **apt-get dist-upgrade** or **apt full-upgrade** (on "normal" Debian/Ubuntu machines, you would typically use apt upgrade). However, the "dist-upgrade" or "full-upgrade" is important for Proxmox because it better resolves dependencies required for Proxmox to run.

Therefore, Proxmox is now complete in its basic configuration. If you would like to delve deeper into Proxmox, it is worth taking a look at [Proxmox Wiki](https://pve.proxmox.com/wiki/Main_Page) or in the [official forum]](https://forum.proxmox.com/).

---

## Proxmox - Creating a virtual Qemu/KVM machine (VM) + subsequent ioBroker installation
This guide shows how to create a [VM][] (Debian stable, as of 2026 = Debian 13 'Trixie') and then install ioBroker in it.

As an alternative to Debian, Ubuntu can be used, making sure to use an **LTS version**.

For better clarity, image descriptions and additional information are included in expandable sections.

### 1 - Download ISO image
First, an ISO image ([64-Bit-PC Netinst-ISO][ISO-Image]) is required, which is loaded into the root directory (local) during the basic installation.

To do this, go to the local > ISO-Images section. There are two options:

- The **Upload** button allows you to upload the ISO file, which was previously stored on the computer, to the Proxmox host.
- Using **Download from URL**, the ISO can be downloaded directly to the host via URL. To do this, copy the link address of the 64-bit PC Netinst ISO (right-click), paste the URL, and retrieve it by clicking **Retrieve URL**. A final click on **Download** starts the download directly to the host.

<details><summary>Download ISO</summary>

![vm-iso](../../de/install/media/proxmox/vm-iso.png)

![vm-isourl](../../de/install/media/proxmox/vm-isourl.png)

</details>

### 2 - Create VM
Clicking the blue **Create VM** button opens a window for the following settings:

- General: Hostname and password are assigned, ID is predefined (starts with 100), can be changed, but not afterwards.
- OS: Storage selection (local) and ISO image (debian-13-netinst.iso)
- System: everything remains at the default settings, **check the Qemu Agent box**
- Disks: Storage local-lvm, disk size 10GB (10-20GB should be sufficient, subsequent changes are possible, but are not described further here).
- CPU: Depends on the computer's performance (can also be adjusted at any time, the VM must be restarted for this)
- Memory: RAM size in MiB (can also be adjusted at any time, the VM must be restarted for this)
- Network: vmbr0, everything else remains as specified
- Confirm: Here you will see a summary again, (check **Start after creation**) then the VM is created by clicking **Finish**.

<details><summary>Image series Create VM</summary>

![vm-general](../../de/install/media/proxmox/vm-allgemein.png)

![vm-os](../../de/install/media/proxmox/vm-os.png)

![VM system](../../de/install/media/proxmox/vm-system.png)

![vm-disks](../../de/install/media/proxmox/vm-disks.png)

![vm-cpu](../../de/install/media/proxmox/vm-cpu.png)

![VM storage](../../de/install/media/proxmox/vm-speicher.png)

![VM network](../../de/install/media/proxmox/vm-netzwerk.png)

![vm-confirm](../../de/install/media/proxmox/vm-bestätigen.png)

</details>

### 3 - Debian Install
After the VM has started, go to the VM console and start the **Install**.

<details><summary>console</summary>

![vm-install](../../de/install/media/proxmox/vm-install.png)

</details>

The installation process will guide you through the process, requiring you to configure several settings. You will need the Tab, Space, and Arrow keys to navigate. Due to the complexity of the program, various settings are illustrated in the accompanying image series.

<span style="color:red">**WARNING! - Do not set a root password.**</span>

<span style="color:red">**ATTENTION! - ioBroker must not be chosen as the username, as it is already used internally by the system.**</span>

The username should consist only of lowercase letters and the numbers 0-9, and should begin with a letter. A hyphen is also permitted, but not as the first character.

<details><summary>Image series Debian Install</summary>

![vm-1](../../de/install/media/proxmox/vm-1.png)

![vm-2](../../de/install/media/proxmox/vm-2.png)

![vm-3](../../de/install/media/proxmox/vm-3.png)

![vm-4](../../de/install/media/proxmox/vm-4.png)

![vm-5](../../de/install/media/proxmox/vm-5.png)

![vm-6](../../de/install/media/proxmox/vm-6.png)

![vm-7](../../de/install/media/proxmox/vm-7.png)

![vm-8](../../de/install/media/proxmox/vm-8.png)

![vm-9](../../de/install/media/proxmox/vm-9.png)

![vm-10](../../de/install/media/proxmox/vm-10.png)

![vm-11](../../de/install/media/proxmox/vm-11.png)

![vm-12](../../de/install/media/proxmox/vm-12.png)

![vm-13](../../de/install/media/proxmox/vm-13.png)

![vm-14](../../de/install/media/proxmox/vm-14.png)

![vm-15](../../de/install/media/proxmox/vm-15.png)

![vm-16](../../de/install/media/proxmox/vm-16.png)

![vm-17](../../de/install/media/proxmox/vm-17.png)

![vm-18](../../de/install/media/proxmox/vm-18.png)

![vm-19](../../de/install/media/proxmox/vm-19.png)

![vm-20](../../de/install/media/proxmox/vm-20.png)

![vm-21](../../de/install/media/proxmox/vm-21.png)

![vm-22](../../de/install/media/proxmox/vm-22.png)

![vm-23](../../de/install/media/proxmox/vm-23.png)

![vm-24](../../de/install/media/proxmox/vm-24.png)

![vm-25](../../de/install/media/proxmox/vm-25.png)

![vm-26](../../de/install/media/proxmox/vm-26.png)

</details>

### 4 - Setting up a VM
Restart the VM, then log in with the username and password assigned during installation. Then, use the command...

```bash
ip addr
```

The IP address has been located. This is needed to connect to the VM remotely via SSH, as in the next step.

<details><summary>IP address</summary>

![vm-iaddr](../../de/install/media/proxmox/vm-ipaddr.png)

</details>

Now you can access the VM via SSH (e.g., PuTTY). Log in again using your username and password.

Then you can change the network address from **DHCP** to **static** (which is recommended for server operation).

```bash
sudo nano /etc/network/interfaces
```

<details><summary>network/interfaces</summary>

![vm-nano](../../de/install/media/proxmox/vm-nano.png)

![vm-dhcp](../../de/install/media/proxmox/vm-dhcp.png)

![vm-static](../../de/install/media/proxmox/vm-statisch.png)

</details>

Changes in the editor are saved using the key combination CTRL + o, followed by ENTER; CTRL + x exits the editor.

Changes to the IP address will only take effect after a VM restart. Before that, however, a check is performed to see if the Qemu guest agent is active, using...

```bash
sudo systemctl status qemu-guest-agent
```

<details><summary>Guest Agent</summary>

![vm-qemuguest](../../de/install/media/proxmox/vm-qemuguest.png)

</details>

<span style="color:orange">**ATTENTION! - On Ubuntu installations, the Qemu Guest Agent must be installed and started.**</span>

Commands for this:

```bash
sudo apt-get install qemu-guest-agent
sudo systemctl start qemu-guest-agent
```

Furthermore, the **curl** tool must be installed separately for the installation of ioBroker.

```bash
sudo apt install curl
```

<details><summary>Install curl afterwards</summary>

![vm-curl](../../de/install/media/proxmox/vm-curl.png)

</details>

To pass through USB devices in a VM, select the VM > Hardware > Add > USB Devices > Manufacturer/Device ID. All connected devices will be listed here.

<details><summary>USB devices</summary>

![vm-usb](../../de/install/media/proxmox/vm-usb.png)

</details>

To ensure the VM starts automatically after a restart of the Proxmox host, this function is enabled in the VM's options.

<details><summary>Boot option</summary>

![vm-boots](../../de/install/media/proxmox/vm-booten.png)

</details>

The installation and setup of the VM is now complete. The VM can now be restarted and ioBroker installed afterwards.

---

## Proxmox - Creating a Linux container (LXC) + subsequent ioBroker installation
This example guide shows how to create an [LXC Container][] (Debian 13) and then install ioBroker in it.

For clarity, image descriptions and additional information can be expanded.

### Alternative: Automatic installation via helper scripts
Popular helper scripts exist for Proxmox. These were originally created by tteck and, after his death, are actively maintained by the community at [helper-scripts.com][]. They allow you to set up an ioBroker container fully automatically with a single command.

> [!WARNING] > **IMPORTANT SECURITY NOTICE:** > Blindly copying and executing scripts from the internet directly in the > Proxmox console (e.g., via `curl | bash`) poses a significant security risk! > > You should always carefully read and understand the script's source code before execution to know what the script will do to the system. Anyone who does not understand the syntax or does not trust the project should refrain from this method and prefer manual installation to avoid compromising the integrity and security of their Proxmox server.

Those who are aware of the risk and have checked the scripts can find the commands and documentation directly at [helper-scripts.com][].

### 1 - Download Container Template
First, a template is needed, which is loaded into the root directory (local) in the basic installation (provided no further drives have been created).

To do this, go to local > Container Templates. Clicking on **Templates** opens a selection list. Select `debian-13-standard` (Trixie) and click download.

<details><summary>Download template</summary>

![local](../../de/install/media/proxmox/local.png)

![templates](../../de/install/media/proxmox/templates.png)

![template load](../../de/install/media/proxmox/template-laden.png)

</details>

### 2 - Create LXC
Clicking the blue **Create CT** button opens a window for the following settings:

- General: Hostname and password are assigned; the ID is predefined (starts with 100) but can be changed.
- Template: Storage selection (local) and template (debian-13-standard)
- Disks: Assigning disk size (don't be too generous, you can always increase it later)
- CPU: Depends on the computer's performance (can also be adjusted at any time)
- Memory: RAM/Swap allocation (can be adjusted at any time, even during operation)
- Network: static IP/CIDR assignment, gateway; if no IPv6 is configured, this will be set to SLAAC.
- DNS: usually nothing is changed (values from the host are used)
- Confirm: Summary, (check **Start after creation**) then the container is created with a click on **Finish**.

<details><summary>Image series Create CT</summary>

![pve](../../de/install/media/proxmox/pve.png)

![lxc-general](../../de/install/media/proxmox/lxc-allgemein.png)

![lxc-template](../../de/install/media/proxmox/lxc-template.png)

![lxc-disks](../../de/install/media/proxmox/lxc-disks.png)

![lxc-cpu](../../de/install/media/proxmox/lxc-cpu.png)

![LXC memory](../../de/install/media/proxmox/lxc-speicher.png)

![lxc network](../../de/install/media/proxmox/lxc-netzwerk.png)

![lxc-dns](../../de/install/media/proxmox/lxc-dns.png)

![lxc-confirm](../../de/install/media/proxmox/lxc-bestätigen.png)

![lxc-taskviewer](../../de/install/media/proxmox/lxc-taskviewer.png)

</details>

### 3 - Setting up LXC
Now that the container has started, go to the LXC console.

<details><summary>console</summary>

![lxc console](../../de/install/media/proxmox/lxc-konsole.png)

</details>

Here, you first log in as root with the previously assigned password, which was given when creating the LXC file, and bring it up to date.

```bash
apt update && apt upgrade
```

<details><summary>Upgrade</summary>

![lxc-upgrade](../../de/install/media/proxmox/lxc-upgrade.png)

</details>

The text then directly prompts the user to set the time zone.

```bash
dpkg-reconfigure tzdata
```

<details><summary>Time zone</summary>

![lxc-tzdata](../../de/install/media/proxmox/lxc-tzdata.png)

![lxc-area](../../de/install/media/proxmox/lxc-area.png)

![lxc-timezone](../../de/install/media/proxmox/lxc-timezone.png)

</details>

Now, **sudo** and **curl** will be installed. Sudo is needed to correctly create a user, as described in the next step, which will be used for future console work. Curl is required to run the ioBroker installation script in the final step.

```bash
apt install sudo curl
```

<details><summary>Reinstall</summary>

![lxc-sudo](../../de/install/media/proxmox/lxc-sudo.png)

</details>

Now create the future user. Replace "username" in this case. Set a password for the user. The rest can be confirmed with ENTER.

A notice:

Do not choose **iobroker** as the username, as this is already used internally by the system.

```bash
adduser benutzername
```

The user is then assigned to the sudo group.

```bash
usermod -aG sudo benutzername
```

If a user is created subsequently, the assignment to the relevant groups is done via:

```bash
usermod -aG adm,dialout,sudo,audio,video,plugdev,users,iobroker benutzername
```

<details><summary>Create user</summary>

![lxc-adduser](../../de/install/media/proxmox/lxc-adduser.png)

</details>

As a final step before installing ioBroker, log out once.

```bash
exit
```

and then log in with the new user. Afterwards, ioBroker can now be installed.

<details><summary>Log out and log in with username</summary>

![lxc-user login](../../de/install/media/proxmox/lxc-useranmeldung.png)

</details>

To ensure that LXC starts automatically after a restart of the Proxmox host, this function is enabled in the container's options.

<details><summary>Boot option</summary>

![lxc-booten](../../de/install/media/proxmox/lxc-booten.png)

</details>

### Optional: Fix warnings/error messages regarding services that have not started
When running `iob diag`, you might find error messages like the ones below in the output.

Some of these errors only occur with non-privileged containers, while others also occur with privileged containers.

```
....
*** FAILED SERVICES ***

  UNIT                                 LOAD   ACTIVE SUB    DESCRIPTION
* run-rpc_pipefs.mount                 loaded failed failed RPC Pipe File System
* sys-kernel-config.mount              loaded failed failed Kernel Configuration File System
* systemd-networkd-wait-online.service loaded failed failed Wait for Network to be Configured
...
```

If you want to clean up the container before installing iobroker, you can get the "FAILED SERVICES" as follows:

```bash
systemctl list-units --failed
```

Here is a collection of troubleshooting steps:

#### Failed service run-rpc_pipefs.mount
```bash
sudo systemctl mask run-rpc_pipefs.mount
sudo systemctl mask var-lib-nfs-rpc_pipefs.mount
```

#### Failed service sys-kernel-config.mount
Append the following line to the container configuration file in the directory `/etc/pve/lxc`:

```
lxc.cap.drop: "sys_rawio audit_read"
```

#### Failed service systemd-networkd-wait-online.service
Replacing the `ifupdown` service with `ifupdown2`:

```bash
sudo systemctl disable --now systemd-networkd-wait-online.service
sudo systemctl disable --now systemd-networkd.service
sudo systemctl disable --now ifupdown-wait-online
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install ifupdown2
```

---

## Install ioBroker
Installing ioBroker requires only a single command.

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

The installation process is divided into 4 steps, which are fully automated.

- Installing prerequisites (1/4)
- Creating ioBroker user and directory (2/4)
- Installing ioBroker (3/4)
- Finalizing installation (4/4)

<details><summary>Installer</summary>

![iobroker-installer](../../de/install/media/proxmox/iobroker-installer.png)

![iobroker-installer1](../../de/install/media/proxmox/iobroker-installer1.png)

![iobroker-installer2](../../de/install/media/proxmox/iobroker-installer2.png)

![iobroker-installer3](../../de/install/media/proxmox/iobroker-installer3.png)

</details>

The installation is successfully completed when the following appears at the end.

```
ioBroker was installed successfully
Open http://10.1.1.222:8081 in a browser and start configuring!
```

This also means that ioBroker can now be accessed via the address in your browser. If everything worked correctly, you will be greeted by the ioBroker setup. Now it's just a few more steps, which the wizard will guide you through.

<details><summary>Image series ioBroker Assistant</summary>

![iobroker-setup](../../de/install/media/proxmox/iobroker-setup.png)

![iobroker-setup1](../../de/install/media/proxmox/iobroker-setup1.png)

![iobroker-setup2](../../de/install/media/proxmox/iobroker-setup2.png)

![iobroker-setup3](../../de/install/media/proxmox/iobroker-setup3.png)

![iobroker-setup4](../../de/install/media/proxmox/iobroker-setup4.png)

![iobroker-setup5](../../de/install/media/proxmox/iobroker-setup5.png)

![iobroker-setup6](../../de/install/media/proxmox/iobroker-setup6.png)

</details>

Afterwards, you have the option to search for devices and services. Required adapters/instances can then be created automatically.

<details><summary>Image series Devices/Service Search</summary>

![device search](../../de/install/media/proxmox/gerätesuche.png)

![instances](../../de/install/media/proxmox/instanzen.png)

![iobroker-ready](../../de/install/media/proxmox/iobroker-fertig.png)

</details>

The ioBroker installation is now complete. Additional adapters can be installed at any time, depending on the use case and your preferences.

---

## Proxmox - LXC (Linux Containers) -> Passing through USB devices
This part of the guide explains step by step how to pass through a USB device (USB passthrough) in Proxmox to an LXC (Linux container).

With a virtual machine (VM), passing through a USB device is possible directly via the Proxmox web interface. With a Linux container, this currently requires manually editing the LXC configuration file.

The instructions describe, as an example, how to integrate a **Texas Instruments Inc.
CC2531** Zigbee stick.

_Note:_ The CC2531 is now technically obsolete, has very little memory, and is no longer recommended for new setups in the ioBroker community. Modern dongles (e.g., the _Sonoff Zigbee 3.0 USB Dongle Plus_ based on the CC2652P or a _ConBee 3_) should be used instead.

However, the passthrough steps shown in this guide are identical for almost all USB serial devices (e.g., smart meter readers, other Zigbee dongles). USB network devices (such as Bluetooth or Wi-Fi) are the exception.

- This part of the instructions was written using Proxmox version 9.x.

### 1.) Gather information about the USB device
<details>

Establishing an SSH connection to Proxmox:

```bash
ssh root@IP-Adresse
```

<span style="color:red">**If the USB device is already connected to the Proxmox host, please unplug the device for now.**</span>

The following command lists all currently connected USB devices on the Proxmox host:

```bash
lsusb
```

![proxmoxlxc00](../../de/install/media/proxmox/proxmoxlxc00.PNG)

Now, the USB device to be integrated is plugged into the Proxmox host and the lsusb command is executed again.

![proxmoxlxc01](../../de/install/media/proxmox/proxmoxlxc01.PNG)

The screenshot shows that a new device is listed with the USB bus number: **001** and the device number: **003**.

This information is needed to output, among other things, the **major device number** from the device using the following command:

```bash
ls -l /dev/bus/usb/001/003
```

Important: Use your USB bus number and device number as the output of the command!

**_ls -l /dev/bus/usb/USB-Bus-Number/Device-Number_**

![proxmoxlxc02](../../de/install/media/proxmox/proxmoxlxc02.PNG)

In this example, the USB device has the major device number **189**. Note the value of your device in a text file with the notation: #1

![proxmoxlxc03](../../de/install/media/proxmox/proxmoxlxc03.PNG)

Next, the unique ID of the USB device is output and the value is noted in the text file with the notation: #2:

```bash
ls /dev/serial/by-id/
```

![proxmoxlxc04](../../de/install/media/proxmox/proxmoxlxc04.PNG)

![proxmoxlxc05](../../de/install/media/proxmox/proxmoxlxc05.PNG)

As a final step, the major device number of the ttyACM is output and noted with the notation: #3:

```bash
ls -l /dev/ttyACM*
```

![proxmoxlxc06](../../de/install/media/proxmox/proxmoxlxc06.PNG)

If no output is displayed, check with "ls -l /dev/serial/by-id/" whether the USB device is mounted by the system as ttyUSB. If so, replace all subsequent commands that refer to **ttyACM…** with **ttyUSB…**. If no output appears, it is not a USB CDC class device (serial communication), and all steps regarding mounting from ttyACM can be ignored.

Thus, the **three** values of the USB device are available, which are required for integrating it into the LXC configuration file.

![proxmoxlxc07](../../de/install/media/proxmox/proxmoxlxc07.PNG)

</details>

### 2.) Edit LXC configuration file
<details>

On the Proxmox host, switch to the LXC configuration directory using:

```bash
cd /etc/pve/lxc
```

The configuration file has the same ID number that was assigned when the LXC file was created!

![proxmoxlxc08](../../de/install/media/proxmox/proxmoxlxc08.PNG)

![proxmoxlxc09](../../de/install/media/proxmox/proxmoxlxc09.PNG)

Before editing the configuration file, a backup should be created:

```bash
cp 201.conf 201.conf.backup
```

![proxmoxlxc10](../../de/install/media/proxmox/proxmoxlxc10.PNG)

Now the configuration file is edited using vi or nano:

```bash
nano 201.conf
```

![proxmoxlxc11](../../de/install/media/proxmox/proxmoxlxc11.PNG)

The following is added to the end of the configuration file:

```
lxc.cgroup2.devices.allow: c 189:* rwm
lxc.mount.entry: usb-Texas_Instruments_TI_CC2531_USB_CDC___0X00124B0012023529-if00 dev/serial/by-id/usb-Texas_Instruments_TI_CC2531_USB_CDC___0X00124B0012023529-if00 none bind,optional,create=file

lxc.cgroup2.devices.allow: c 166:* rwm
lxc.mount.entry: /dev/ttyACM0 dev/ttyACM0 none bind,optional,create=file
```

Replace the highlighted values with the entries from your notes!

![12](../../de/install/media/proxmox/proxmoxlxc12.PNG)

- The first line refers to the major device number **189** Note: #1
- In the second line, the unique id (usb-Texas_Instruments_TI_CC2531_USB_CDC\_\_\_0X00124B0012023529-if00) from note: #2 is specified individually and with the absolute path (without line break).
- The third line specifies the major device number **166** from ttyACM in note #3.

Save the configuration file (In the Nano editor, use the keyboard shortcut: CTRL + o & CTRL + x to exit the editor)

</br>

<span style="color:orange">**ATTENTION! - If your container has active snapshots:**</span>

<details>

Then the lxc.cgroup code should not be placed at the end of the config file, but before the first entry of a snapshot.

![proxmoxlxc18](../../de/install/media/proxmox/proxmoxlxc18.PNG)

</details>

<span style="color:orange">**ATTENTION! - Proxmox installation prior to version 7.0:**</span>

<details>

Replace the entries with

```
lxc.cgroup2
```

through

```
lxc.cgroup
```

</details>

Finally, the following command is executed to set the necessary permissions for `ttyACM0`:

```bash
chmod o+rw /dev/ttyACM*
```

To apply the changes to the LXC, a cold boot of the container is performed using **pct stop id / pct start id**:

```bash
pct stop 201
```

```bash
pct start 201
```

</br>

<span style="color:green">**Tip: It&#39;s best to save a copy of your working configuration file externally, as the integrated Proxmox backup service, for example, does not back up the contents of your configuration!**</span>

</br>

</details>

### 3.) Check LXC USB Passthrough & Zigbee Instance Configuration
<details>

Establishing an SSH connection to the LXC:

```bash
ssh Benutzer@IP-Adresse
```

With the commands:

```bash
lsusb
```

&

```bash
ls -l /dev
```

The system checks whether the changes to the configuration file were successful.

![proxmoxlxc13](../../de/install/media/proxmox/proxmoxlxc13.PNG)

- As can be seen in the screenshot, the container now has access to the USB device.

- It is important that ttyACM0 has the same permissions as in the screenshot, i.e., **crw-rw-rw- 1 nobody nogroup**

If you do not check whether all values in the configuration file are set as described, and the permissions still do not match, skip to point 5.

- The screenshot also shows that the device number of the CC2531 has changed from 3 to 4. This is because the stick was unplugged and plugged back in. However, since the configuration file specifies the unique ID and not the bus/device number, USB passthrough continues to work.

If a Zigbee stick is passed through to the container as described at the beginning, the Zigbee adapter settings in ioBroker will show the COM port name.

```
/dev/ttyACM0
```

to enter so that the device is addressed correctly.

![proxmoxlxc14](../../de/install/media/proxmox/proxmoxlxc14.PNG)

</details>

### 4.) UDEV rule for permanent rights: Adjustment of ttyACM0
<details>

At the end of step 3, the command was used

```bash
chmod o+rw /dev/ttyACM*
```

The appropriate permissions for ttyACM0 have been set, but these permission changes will be reset when the Proxmox host is restarted; a udev rule is required on the Proxmox host for a permanent adjustment.

Using lsusb we list the currently connected USB devices again:

```bash
lsusb
```

![proxmoxlxc15](../../de/install/media/proxmox/proxmoxlxc15.PNG)

This time we note down the numerical values according to ID, in this case **0451:16a8**

- The first value: **_0451_** represents the **idVendor** and the second value: **_16a8_** represents the **idProduct**.

Now, the udev rule is created under /etc/udev/rules.d using vi or nano:

```bash
nano /etc/udev/rules.d/50-myusb.rules
```

and the following content was inserted:

```
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0451", ATTRS{idProduct}=="16a8", GROUP="users", MODE="0666"
```

![proxmoxlxc16](../../de/install/media/proxmox/proxmoxlxc16.PNG)

Finally, execute the following command to activate the udev rule:

```bash
udevadm control –-reload
```

</details>

### 5.) Troubleshooting
<details>

**Error:** ttyACM0 permissions in lxc are incorrect or are lost after a short time (ConBee II).

```bash
ls -l /dev/ttyACM0
 c--------- 0 nobody nogroup 166, 0 Feb  7 14:29 ttyACM0
```

</br>

**Solution:** Create a persistent binding for the container using mknod.

To do this, the folder **devices** is created in the path **"/var/lib/lxc/CONTAINERID"** and the binding is created in this folder using mknod:

```bash
mkdir /var/lib/lxc/201/devices
```

```bash
cd /var/lib/lxc/201/devices
```

```bash
mknod -m 666 ttyACM0 c 166 0
```

- _mknod creates a file named ttyACM0 in that path (as long as the file exists, the device is bound to the lxc)_

![proxmoxlxc17](../../de/install/media/proxmox/proxmoxlxc17.PNG)

**Adjust major device number and ttyACM if necessary**

Next, the entry in the lxc configuration file must be adjusted:

```
lxc.mount.entry: /dev/ttyACM0 dev/ttyACM0 none bind,optional,create=file
```

will be replaced by:

```
lxc.mount.entry: /var/lib/lxc/CONTAINERID/devices/ttyACM0 dev/ttyACM0 none bind,optional,create=file
```

</details>

---

## Setting up a USB stick/hard drive for backups
To allow future backups to be stored separately, there is the option of integrating a USB device in the form of a stick or a hard drive on the Proxmox host.

_Note:_ Earlier versions of this guide often recommended the **vFAT (FAT32)** file system, as it can be read without problems under both Linux and Windows. This is now strongly discouraged! FAT32 has a technical limit of **4 GB per file**. Since modern Proxmox backups (e.g., `.vma.zst` files of entire VMs or containers) usually far exceed this size, backups using FAT32 will fail with errors such as "File too large".

Common, suitable file systems are therefore:

- **EXT4** (Standard for pure Linux, highly recommended for Proxmox backups)
- **NTFS** or **exFAT** (if the backup drive absolutely must also be natively formatted under

(Windows needs to be read)

If the storage medium is still unpartitioned or you want to reformat it, you can do this on a Windows PC or directly on the Proxmox server.

Once the storage medium is prepared, it can then be mounted into the system and subsequently added directly as storage (directory) via the Proxmox GUI.

<span style="color:orange">**WARNING! - Reformatting will erase all existing data on the storage device.**</span>

The following example instructions refer to setting up **EXT4** directly on the Proxmox host.

**Important:** The following commands require `root`. If a separate user is used on the host, the commands must be executed with `sudo`.

### Prepare the device
### 1 - Identify device
First, locate the device using [lsblk][]. It is advisable to execute the command once before and once after plugging it in. This makes identifying the device easier.

```bash
lsblk
```

It then looks something like this (letters vary depending on how many devices are connected):

```
sdd                    8:48   0 119.2G  0 disk
├─sdd1                 8:49   0 119.2G  0 part
└─sdd9                 8:57   0     8M  0 part
sde                    8:64   0 931.5G  0 disk                    <-- Das ist die Disk /dev/sde
└─sde1                 8:65   0 931.5G  0 part                    <-- Das ist die erste Partition /dev/sde1
sr0                   11:0    1  1024M  0 rom
sr1                   11:1    1  1024M  0 rom
```

### 2 - Partitioning
The drive is partitioned using the menu-driven [cfdisk][].

```bash
cfdisk /dev/sde
```

### 3 - Create file system
Now the partition created earlier needs to be formatted. As mentioned above, we'll use the **EXT4** file system for this.

The partition is formatted using the [mkfs][] command and the appropriate parameters:

```bash
mkfs.ext4 /dev/sde1
```

### 4 - Mount drive
In order to use the completed data carrier, it must be mounted.

A suitable mount point is created for this purpose. To ensure the storage device is automatically remounted after a reboot, a corresponding entry in the `/etc/fstab` file is required.

For this, the unique **UUID** of the drive must be read.

Create mount point:

```bash
mkdir /media/ext_usb
```

Mount the data carrier:

```bash
mount /dev/sde1 /media/ext_usb
```

Determine UUID:

```bash
blkid | grep -i sde
```

This results in, for example:

```
/dev/sde1: LABEL="Backup" UUID="136b058d-f0c8-406d-a82b-2adcc00b72bf" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="00011a10-01"
```

Edit the entry in [/etc/fstab][] using nano:

```bash
nano /etc/fstab
```

Now this entry will be added and then saved:

```
UUID="136b058d-f0c8-406d-a82b-2adcc00b72bf" /media/ext_usb ext4 defaults 0 2
```

(Note: For EXT4 partitions, `0 2` is usually entered at the end of the fstab line for the file system check.)

### 5 - Adding Storage to Proxmox
Under Data Center > Storage, a directory can now be added. The ID name is freely selectable, e.g., _usb-backup_.

The column _Directory_ specifies the path, in this case `/media/ext\_usb`.

Under _Content_, you only need to select the desired function (e.g.,
VZDump backup file).

[VM]: https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines

[LXC Container]: https://pve.proxmox.com/wiki/Linux_Container

[Filesysteme]: https://wiki.ubuntuusers.de/Dateisystem/

[lsblk]: https://wiki.ubuntuusers.de/lsblk/

[cfdisk]: https://wiki.ubuntuusers.de/fdisk/

[mkfs]: https://wiki.ubuntuusers.de/Formatieren/

[gemountet]: https://wiki.ubuntuusers.de/mount/

[/etc/fstab]: https://wiki.ubuntuusers.de/fstab/

[helper-scripts.com]: https://helper-scripts.com

[Installationsmedien vorbereiten]: https://pve.proxmox.com/wiki/Prepare_Installation_Media#_instructions_for_windows

[ISO-Image]: https://www.debian.org/distrib/