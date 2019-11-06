# instrucciones de actualización del controlador js

Debido a los diferentes hardware y plataformas en los que se ejecuta ioBroker, el controlador js debe actualizarse manualmente. Se pueden encontrar más detalles en la sección correspondiente.

## Información general para todas las plataformas

**Para una actualización de js-controller 1.xa 2.x, lea siempre la información en https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im -¡La última lectura y nota del repositorio!**

De lo contrario, actualice primero los esclavos con una actualización de los sistemas maestro-esclavo y el maestro al final.

## Linux / macOS (nuevo instalador)
¡Esta es la opción recomendada!

Ejecute los siguientes comandos en un shell SSH (consola):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` o reiniciar el servidor, entonces ioBroker debería reiniciarse y puede estar seguro de que todos los procesos anteriores se completaron.

Si el comando de actualización muestra Derechos de acceso / Errores de permiso, utilice el fijador de instalación (`curl -sL https://iobroker.net/fix.sh | bash-`) para solucionar estos problemas y el comando de actualización corre de nuevo.

## Linux/macOS (instalado manualmente)

Una instalación manual generalmente tiene lugar bajo la raíz como usuario y, por lo tanto, es necesario un "sudo" antes de los comandos.

Ejecute los siguientes comandos en un shell SSH (consola):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` o reinicio del servidor, luego ioBroker debería reiniciarse y puede estar seguro de que todos los procesos anteriores se completaron.

Si el comando de actualización muestra permisos / errores de permisos, corríjalos. A veces "sudo" no es suficiente y debe ejecutar la instalación como una raíz real (anteriormente simplemente `sudo su -`).

## Windows

Per aggiornare ioBroker su Windows, scaricare il programma di installazione appropriato con la versione js-controller desiderata dalla pagina di download https://www.iobroker.net/#de/download ed effettuare l'aggiornamento con esso. Con Windows Installer, i server o le installazioni precedentemente installati manualmente da altri sistemi operativi possono essere migrati su Windows e aggiornati.

## Windows (instalado manualmente)

Un'installazione manuale viene eseguita con diritti di amministratore. Avvia una finestra della riga di comando di cmd.exe come amministratore (fai clic con il pulsante destro del mouse su cmd.exe ed esegui come amministratore) ed esegui i seguenti comandi:

* `cd C:\iobroker` (o donde se instaló ioBroker)
* `iobroker stop` per interrompere il servizio ioBroker
* `iobroker status` per verificare se ioBroker è terminato
* `iobroker update`
* `iobroker upgrade self`
* Inicie el servicio ioBroker o reinicie la computadora, luego ioBroker debería reiniciarse y puede estar seguro de que todos los procesos anteriores se completaron.

## Emergencia (reinstalación manual) (si de alguna manera nada funciona después de la actualización)
Vaya al directorio ioBroker y ejecute `npm install iobroker.js-controller`. Se puede instalar una versión específica usando `npm install iobroker.js-controller@x.y.z` (reemplace x.y.z con la versión deseada).

Si se producen problemas de acceso durante la ejecución, el comando debe cambiarse ligeramente:
* Para sistemas creados con el nuevo instalador de Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* Para los sistemas instalados manualmente en Linux, prefije `sudo` o ejecútelo como root.
* Para sistemas Windows, un shell de administrador debería ser suficiente

¡De esta manera solo es necesario en muy pocos casos y por favor consulte el foro de antemano!
