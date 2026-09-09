---
chapters: {"pages":{"en/adapterref/iobroker.viessmann/README.md":{"title":{"en":"ioBroker.viessmann"},"content":"en/adapterref/iobroker.viessmann/README.md"},"en/adapterref/iobroker.viessmann/docs/en/viessmann_en.md":{"title":{"en":"ioBroker.viessmann"},"content":"en/adapterref/iobroker.viessmann/docs/en/viessmann_en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.viessmann/docs/en/viessmann_en.md
title: ioBroker.viessmann
hash: ya3ykLnVRKe8pkuaZsDZon2Dmgb7/G7QWe9pxKlR6IU=
---
![Логотип](../../../../../en/adapterref/iobroker.viessmann/docs/en/admin/viessmann.png)

![Количество установок](http://iobroker.live/badges/viessmann-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.viessmann.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.viessmann.svg)
![GitHub Actions](https://github.com/misanorot/ioBroker.viessmann/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)

# ioBroker.viessmann

\=================

**Github Actions** :

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=ZYHW84XXF5REJ\&source=url)

С помощью этого адаптера можно сохранять значения с блока управления Viessmann, взаимодействующего с программой [Vcontrold](https://github.com/openv/vcontrold) , в объекты. Также можно задавать значения, которые вы настроили в файле Vito.xml.

#### (На том же хосте)

Если Vcontrold работает на том же хосте, что и IOBroker, то для чтения файлов .xml в Linux никаких дополнительных изменений в административной конфигурации не требуется. _(При условии, что файл находится в стандартном пути: /etc/vcontrold/vito.xml)_

#### (Другой хост)

Если Vcontrold установлен на другом хосте, вы можете читать файлы .xml через SSH-соединение. Для этого введите необходимую информацию на вкладке SSH. _(Требуется работающее SSH-соединение.)_

После перезапуска экземпляра данные будут считаны автоматически, теперь вы можете установить значения в конфигурации экземпляра.

#### Структура файла vito.xml должна быть сформирована в следующем виде:

````
	```<vito>
		<devices>
			<device ID="2094" name="V200KW1" protocol="KW2"/>
		</devices>
		<commands>
			<command name='getOelverbrauch' protocmd='getaddr' >
				<addr>7574</addr>
				<len>4</len>
				<description></description>
			</command>
			<command name='getTempAbgas' protocmd='getaddr'>
				<addr>0808</addr>
				<len>2</len>
				<unit>UT</unit>
				<error>05 05</error>
				<description>Abgastemeratur in Grad C</description>
			</command>
		</commands>
	</vito>```
````

Сортировку команд можно выполнить, щелкнув по заголовку таблицы.

## Важный!:

```
- Every time the Vito data is read again, the "old" settings may be deleted.
```

Для относительно неважных значений запроса рекомендуется выбирать как можно больший интервал опроса. Также можно запросить значение вне цикла опроса. Для этого в точку данных _force\_polling_ необходимо записать желаемое _значение_ .

_Изображения взяты с [сайта www.viessmann.com](http://www.viessmann.com) ._

## Список дел

```
- Changing the Vito.xml without losing the settings
- Implementation Unit on/off
```