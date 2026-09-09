---
chapters: {"pages":{"en/adapterref/iobroker.plex/README.md":{"title":{"en":"ioBroker.plex"},"content":"en/adapterref/iobroker.plex/README.md"},"en/adapterref/iobroker.plex/README-states.md":{"title":{"en":"Channels & States"},"content":"en/adapterref/iobroker.plex/README-states.md"},"en/adapterref/iobroker.plex/README-tautulli.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.plex/README-tautulli.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plex/README-tautulli.md
title: kein Titel
hash: lsHHT+kxkn97mWN9m3+bkdDytHcu1PPivBn+LNeKTFE=
---
![Logo](../../../en/adapterref/iobroker.plex/admin/tautulli.jpg)

## Benachrichtigungskonfiguration

**Hinweis:** Die JSON-Daten sind hochgradig anpassbar und können beliebig geändert werden. [Eine vollständige Liste der verfügbaren Parameter](#list-of-available-parameters) finden Sie hier. Die in den Benachrichtigungen (siehe unten) angegebenen JSON-Daten werden an ioBroker gesendet und in den Status gespeichert.

### Wiedergabe starten / stoppen / pausieren / fortsetzen

**Hinweis:** Wie bereits erwähnt, sind die JSON-Daten hochgradig anpassbar und können beliebig geändert werden. **Bitte beachten Sie** , dass die Benachrichtigungstypen für`Playback Start` ,`Stop` ,`Resume` Und`Pause` **erfordern mindestens**`{"Player": {"title": "{player}", "uuid": "{machine_id}"}` (um den Spieler zu identifizieren), damit es richtig funktioniert.

Sie können das folgende Beispiel in Tautulli kopieren, um eine vollständige und detaillierte Nutzlast zu erhalten.![Tautulli-Benachrichtigung](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

```
{
	"event":"media.{action}",
	"user":"undefined",
	"owner":"undefined",
	"Account":{
		"userId":"{user_id}",
		"id":"undefined",
		"thumb":"undefined",
		"title":"{username}"
	},
	"Server":{
		"title":"{server_name}",
		"uuid":"{server_machine_id}"
	},
	"Player":{
		"local":"{stream_local}",
		"localAddress":"{ip_address}",
		"publicAddress":"undefined",
		"title":"{player}",
		"uuid":"{machine_id}"
	},
	"Metadata":{
		"librarySectionType":"{media_type}",
		"ratingKey":"{rating_key}",
		"parentRatingKey":"{parent_rating_key}",
		"grandparentRatingKey":"{grandparent_rating_key}",
		"key":"/library/metadata/{rating_key}",
		"guid":"com.plexapp.agents.imdb://{imdb_id}?lang=en",
		"librarySectionTitle":"{library_name}",
		"librarySectionID":"{section_id}",
		"librarySectionKey":"/library/sections/{section_id}",
		"studio":"{studio}",
		"type":"{media_type}",
		"title":"{title}",
		"grandparentTitle":"<show>{show_name}</show><artist>{artist_name}</artist>",
		"parentTitle":"<show>{show_name}</show><artist>{artist_name}</artist>",
		"titleSort":"undefined",
		"contentRating":"{content_rating}",
		"summary":"{summary}",
		"rating":"{rating}",
	  	"viewOffset":"undefined",
		"lastViewedAt":"{last_viewed_date}",
		"year":"{year}",
		"tagline":"{tagline}",
		"thumb":"<movie>{thumb}</movie><show>{grandparent_thumb}</show><season>{grandparent_thumb}</season><episode>{grandparent_thumb}</episode><artist>{grandparent_thumb}</artist><album>{grandparent_thumb}</album><track>{grandparent_thumb}</track>",
		"parentThumb":"{parent_thumb}",
		"grandparentThumb":"{grandparent_thumb}",
		"posterThumb":"{poster_thumb}",
		"art":"undefined",
		"duration":"{duration}",
		"originallyAvailableAt":"{release_date}",
		"addedAt":"{added_date}",
		"updatedAt":"{updated_date}",
		"chapterSource":"undefined",
		"primaryExtraKey":"undefined",
		"ratingImage":"imdb://image.rating",
		"Genre":"{genres}",
		"Director":"{directors}",
		"Writer":"{writers}",
		"Country":"undefined",
		"Producer":"undefined",
		"Collection":"{collections}",
		"Role":"{actors}",
		"Similar":"undefined",
		"video": {
			"container": "{container}",
			"bitrate": "{bitrate}",
			"aspect_ratio": "{aspect_ratio}",
			"video_codec": "{video_codec}",
			"video_codec_level": "{video_codec_level}",
			"video_bitrate": "{video_bitrate}",
			"video_bit_depth": "{video_bit_depth}",
			"video_framerate": "{video_framerate}",
			"video_ref_frames": "{video_ref_frames}",
			"video_resolution": "{video_resolution}",
			"video_height": "{video_height}",
			"video_width": "{video_width}",
			"video_language": "{video_language}",
			"video_language_code": "{video_language_code}"
		},
		"audio": {
			"audio_bitrate": "{audio_bitrate}",
			"audio_bitrate_mode": "{audio_bitrate_mode}",
			"audio_codec": "{audio_codec}",
			"audio_channels": "{audio_channels}",
			"audio_channel_layout": "{audio_channel_layout}",
			"audio_sample_rate": "{audio_sample_rate}",
			"audio_language": "{audio_language}",
			"audio_language_code": "{audio_language_code}"
		},
		"subtitles": {
			"subtitle_codec": "{subtitle_codec}",
			"subtitle_container": "{subtitle_container}",
			"subtitle_format": "{subtitle_format}",
			"subtitle_forced": "{subtitle_forced}",
			"subtitle_location": "{subtitle_location}",
			"subtitle_language": "{subtitle_language}",
			"subtitle_language_code": "{subtitle_language_code}"
		},
		"file": {
			"path": "{file}",
			"name": "{filename}",
			"size": "{file_size}"
		},
		"transcoding": {
			"transcode_decision": "{transcode_decision}",
			"video_decision": "{video_decision}",
			"audio_decision": "{audio_decision}",
			"subtitle_decision": "{subtitle_decision}",
			"transcode_container": "{transcode_container}",
			"transcode_video_codec": "{transcode_video_codec}",
			"transcode_video_width": "{transcode_video_width}",
			"transcode_video_height": "{transcode_video_height}",
			"transcode_audio_codec": "{transcode_audio_codec}",
			"transcode_audio_channels": "{transcode_audio_channels}",
			"transcode_hw_requested": "{transcode_hw_requested}",
			"transcode_hw_decoding": "{transcode_hw_decoding}",
			"transcode_hw_decode": "{transcode_hw_decode}",
			"transcode_hw_decode_title": "{transcode_hw_decode_title}",
			"transcode_hw_encoding": "{transcode_hw_encoding}",
			"transcode_hw_encode": "{transcode_hw_encode}",
			"transcode_hw_encode_title": "{transcode_hw_encode_title}"
		},
		"stream": {
			"user": {
				"streams": "{streams}",
				"user_streams": "{user_streams}",
				"name": "{user}",
				"user": "{username}",
				"email": "{user_email}"
			},
			"player": {
				"device": "{device}",
				"platform": "{platform}",
				"product": "{product}",
				"player": "{player}",
				"ip_address": "{ip_address}"
			},
			"quality_profile": "{quality_profile}",
			"optimized_version": "{optimized_version}",
			"optimized_version_profile": "{optimized_version_profile}",
			"synced_version": "{synced_version}",
			"live": "{live}",
			"stream_local": "{stream_local}",
			"stream_location": "{stream_location}",
			"stream_bandwidth": "{stream_bandwidth}",
			"stream_container": "{stream_container}",
			"stream_bitrate": "{stream_bitrate}",
			"stream_aspect_ratio": "{stream_aspect_ratio}",
			"stream_duration": "{stream_duration}",
			"stream_time": "{stream_time}",
			"remaining_duration": "{remaining_duration}",
			"remaining_time": "{remaining_time}",
			"progress_duration": "{progress_duration}",
			"progress_time": "{progress_time}",
			"progress_percent": "{progress_percent}",
			"stream_video": {
				"stream_video_codec": "{stream_video_codec}",
				"stream_video_codec_level": "{stream_video_codec_level}",
				"stream_video_bitrate": "{stream_video_bitrate}",
				"stream_video_bit_depth": "{stream_video_bit_depth}",
				"stream_video_framerate": "{stream_video_framerate}",
				"stream_video_ref_frames": "{stream_video_ref_frames}",
				"stream_video_resolution": "{stream_video_resolution}",
				"stream_video_height": "{stream_video_height}",
				"stream_video_width": "{stream_video_width}",
				"stream_video_language": "{stream_video_language}",
				"stream_video_language_code": "{stream_video_language_code}"
			},
			"stream_audio": {
				"stream_audio_bitrate": "{stream_audio_bitrate}",
				"stream_audio_bitrate_mode": "{stream_audio_bitrate_mode}",
				"stream_audio_codec": "{stream_audio_codec}",
				"stream_audio_channels": "{stream_audio_channels}",
				"stream_audio_channel_layout": "{stream_audio_channel_layout}",
				"stream_audio_sample_rate": "{stream_audio_sample_rate}",
				"stream_audio_language": "{stream_audio_language}",
				"stream_audio_language_code": "{stream_audio_language_code}"
			},
			"stream_subtitle": {
				"stream_subtitle_codec": "{stream_subtitle_codec}",
				"stream_subtitle_container": "{stream_subtitle_container}",
				"stream_subtitle_format": "{stream_subtitle_format}",
				"stream_subtitle_forced": "{stream_subtitle_forced}",
				"stream_subtitle_language": "{stream_subtitle_language}",
				"stream_subtitle_language_code": "{stream_subtitle_language_code}",
				"stream_subtitle_location": "{stream_subtitle_location}"
			}
		}
	}
}
```

### Änderung der Transkodierungsentscheidung

Die Verwendung dieser Benachrichtigung wird **nicht** empfohlen.

```
{
	"event":"{action}"
}
```

### Angesehen

```
{
	"event":"media.scrobble",
	"Metadata":{
		"title":"{title}",
		"librarySectionTitle":"{library_name}"
	}
}
```

### Pufferwarnung

Die Verwendung dieser Benachrichtigung wird **nicht** empfohlen.

```
{
	"event":"{action}"
}
```

### Gleichzeitige Benutzerströme

```
{
	"event":"{action}"
}
```

### Benutzer Neues Gerät

```
{
	"event":"device.new"
}
```

### Kürzlich hinzugefügt

```
{
	"event":"library.new",
	"Metadata":{
		"title":"{title}",
		"librarySectionTitle":"{library_name}"
	}
}
```

### Plex-Server ausgefallen

```
{
	"event":"{action}"
}
```

### Plex-Server-Backup

```
{
	"event":"admin.database.backup"
}
```

### Plex-Fernzugriff nicht verfügbar

```
{
	"event":"{action}"
}
```

### Plex-Fernzugriff-Backup

```
{
	"event":"{action}"
}
```

### Plex-Update verfügbar

```
{
	"event":"{action}",
	"update_version":"{update_version}",
	"update_url":"{update_url}",
	"update_release_date":"{update_release_date}",
	"update_channel":"{update_channel}",
	"update_platform":"{update_platform}",
	"update_distro":"{update_distro}",
	"update_distro_build":"{update_distro_build}",
	"update_requirements":"{update_requirements}",
	"update_extra_info":"{update_extra_info}",
	"update_changelog_added":"{update_changelog_added}",
	"update_changelog_fixed":"{update_changelog_fixed}"
}
```

### Tautulli-Update verfügbar

```
{
	"event":"{action}",
	"tautulli_update_version":"{tautulli_update_version}",
	"tautulli_update_release_url":"{tautulli_update_release_url}",
	"tautulli_update_changelog":"{tautulli_update_changelog}"
}
```

## Liste der verfügbaren Parameter

### Global

| Parameter              | Beschreibung                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------- |
| {tautulli\_version}    | Die aktuelle Version von Tautulli.                                                  |
| {tautulli\_remote}     | Das aktuelle Git-Remote-Repository von Tautulli.                                    |
| {tautulli\_branch}     | Der aktuelle Git-Branch von Tautulli.                                               |
| {tautulli\_commit}     | Der aktuelle Git-Commit-Hash von Tautulli.                                          |
| {server\_name}         | Der Name deines Plex-Servers.                                                       |
| {server\_ip}           | Die Verbindungs-IP-Adresse Ihres Plex-Servers.                                      |
| {server\_port}         | Der Anschlussanschluss für Ihren Plex-Server.                                       |
| {server\_url}          | Die Verbindungs-URL für Ihren Plex-Server.                                          |
| {server\_platform}     | Die Plattform Ihres Plex-Servers.                                                   |
| {server\_version}      | Die aktuelle Version Ihres Plex-Servers.                                            |
| {server\_machine\_id}  | Die eindeutige Kennung für Ihren Plex-Server.                                       |
| {Aktion}               | Die Aktion, die die Benachrichtigung ausgelöst hat.                                 |
| {aktuelles\_Jahr}      | Das Jahr, in dem die Benachrichtigung ausgelöst wird.                               |
| {aktueller\_Monat}     | Der Monat, in dem die Benachrichtigung ausgelöst wird. (1 bis 12)                   |
| {aktueller\_Tag}       | Der Tag, an dem die Benachrichtigung ausgelöst wird. (1 bis 31)                     |
| {aktuelle\_Stunde}     | Die Stunde, zu der die Benachrichtigung ausgelöst wird. (0 bis 23)                  |
| {aktuelle\_Minute}     | Die Minute, in der die Benachrichtigung ausgelöst wird. (0 bis 59)                  |
| {current\_second}      | Der zweite Zeitpunkt, an dem die Benachrichtigung ausgelöst wird. (0 bis 59)        |
| {aktueller\_Wochentag} | Der ISO-Wochentag, an dem die Benachrichtigung ausgelöst wird. (1 (Mo) bis 7 (So))  |
| {aktuelle\_Woche}      | Die ISO-Wochennummer, zu der die Benachrichtigung ausgelöst wird. (1 bis 52)        |
| {Datumsstempel}        | Das Datum (im Datumsformat), an dem die Benachrichtigung ausgelöst wird.            |
| {Zeitstempel}          | Der Zeitpunkt (im Zeitformat), zu dem die Benachrichtigung ausgelöst wird.          |
| {unixtime}             | Der Unix-Zeitstempel zum Zeitpunkt der Auslösung der Benachrichtigung.              |
| {utctime}              | Der UTC-Zeitstempel im ISO-Format zum Zeitpunkt der Auslösung der Benachrichtigung. |

### Stream-Details

| Parameter                          | Beschreibung                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| {Streams}                          | Die Anzahl der gleichzeitigen Datenströme.                                              |
| {user\_streams}                    | Die Anzahl der gleichzeitigen Streams pro streamender Person.                           |
| {Benutzer}                         | Der freundliche Name der Person, die streamt.                                           |
| {Benutzername}                     | Der Benutzername der Person, die streamt.                                               |
| {user\_email}                      | Die E-Mail-Adresse der Person, die streamt.                                             |
| {Gerät}                            | Der Typ des Clientgeräts, das zur Wiedergabe verwendet wird.                            |
| {Plattform}                        | Die Art der Client-Plattform, die für die Wiedergabe verwendet wird.                    |
| {Produkt}                          | Die Art des Clientprodukts, das für die Wiedergabe verwendet wird.                      |
| {Spieler}                          | Der Name des für die Wiedergabe verwendeten Players.                                    |
| {ip\_address}                      | Die IP-Adresse des Geräts, das zur Wiedergabe verwendet wird.                           |
| {stream\_duration}                 | Die Dauer (in Minuten) des Streams.                                                     |
| {stream\_time}                     | Die Dauer (im Zeitformat) des Streams.                                                  |
| {verbleibende\_Dauer}              | Die verbleibende Dauer (in Minuten) des Streams.                                        |
| {verbleibende\_Zeit}               | Die verbleibende Dauer (im Zeitformat) des Streams.                                     |
| {progress\_duration}               | Die zuletzt gemeldete Abweichung (in Minuten) des Datenstroms.                          |
| {progress\_time}                   | Der zuletzt gemeldete Offset (im Zeitformat) des Datenstroms.                           |
| {progress\_percent}                | Der zuletzt gemeldete Fortschritt in Prozent des Datenstroms.                           |
| {transcode\_decision}              | Die Transkodierungsentscheidungen des Datenstroms.                                      |
| {Videoentscheidung}                | Die Videotranskodierungsentscheidungen des Streams.                                     |
| {audio\_decision}                  | Die Entscheidungen zur Audio-Transkodierung des Streams.                                |
| {subtitle\_decision}               | Die Entscheidungen zur Untertitel-Transkodierung des Streams.                           |
| {quality\_profile}                 | Das Plex-Qualitätsprofil des Streams. (z. B. Original, 4 Mbps 720p usw.)                |
| {optimierte\_Version}              | Wenn es sich bei dem Stream um eine optimierte Version handelt. (0 oder 1)              |
| {optimized\_version\_profile}      | Das optimierte Versionsprofil des Streams.                                              |
| {synced\_version}                  | Wenn es sich bei dem Stream um eine synchronisierte Version handelt. (0 oder 1)         |
| {live}                             | Wenn es sich um Live-TV handelt. (0 oder 1)                                             |
| {stream\_local}                    | Wenn der Stream lokal ist. (0 oder 1)                                                   |
| {stream\_location}                 | Der Netzwerkstandort des Streams. (LAN oder WAN)                                        |
| {stream\_bandwidth}                | Die erforderliche Bandbreite (in kbps) des Datenstroms. (nicht die genutzte Bandbreite) |
| {stream\_container}                | Der Mediencontainer des Streams.                                                        |
| {stream\_bitrate}                  | Die Bitrate (in kbps) des Streams.                                                      |
| {stream\_aspect\_ratio}            | Das Seitenverhältnis des Streams.                                                       |
| {stream\_video\_codec}             | Der Videocodec des Streams.                                                             |
| {stream\_video\_codec\_level}      | Der Videocodec-Level des Streams.                                                       |
| {stream\_video\_bitrate}           | Die Videobitrate (in kbps) des Streams.                                                 |
| {stream\_video\_bit\_depth}        | Die Video-Bittiefe des Streams.                                                         |
| {stream\_video\_framerate}         | Die Bildrate des Videostreams.                                                          |
| {stream\_video\_ref\_frames}       | Die Videoreferenzframes des Streams.                                                    |
| {stream\_video\_resolution}        | Die Videoauflösung des Streams.                                                         |
| {stream\_video\_height}            | Die Videohöhe des Streams.                                                              |
| {stream\_video\_width}             | Die Videobreite des Streams.                                                            |
| {stream\_video\_language}          | Die Videosprache des Streams.                                                           |
| {stream\_video\_language\_code}    | Der Video-Sprachcode des Streams.                                                       |
| {stream\_audio\_bitrate}           | Die Audio-Bitrate des Streams.                                                          |
| {stream\_audio\_bitrate\_mode}     | Der Audio-Bitratenmodus des Streams. (cbr oder vbr)                                     |
| {stream\_audio\_codec}             | Der Audio-Codec des Streams.                                                            |
| {stream\_audio\_channels}          | Die Audiokanäle des Streams.                                                            |
| {stream\_audio\_channel\_layout}   | Das Audio-Kanal-Layout des Streams.                                                     |
| {stream\_audio\_sample\_rate}      | Die Audio-Abtastrate (in Hz) des Streams.                                               |
| {stream\_audio\_language}          | Die Audiosprache des Streams.                                                           |
| {stream\_audio\_language\_code}    | Der Audio-Sprachcode des Streams.                                                       |
| {stream\_subtitle\_codec}          | Der Untertitel-Codec des Streams.                                                       |
| {stream\_subtitle\_container}      | Der Untertitelcontainer des Streams.                                                    |
| {stream\_subtitle\_format}         | Das Untertitelformat des Streams.                                                       |
| {stream\_subtitle\_forced}         | Wenn die Untertitel erzwungen werden. (0 oder 1)                                        |
| {stream\_subtitle\_language}       | Die Untertitelsprache des Streams.                                                      |
| {stream\_subtitle\_language\_code} | Der Untertitel-Sprachcode des Streams.                                                  |
| {stream\_subtitle\_location}       | Die Position der Untertitel im Stream.                                                  |
| {transcode\_container}             | Der Mediencontainer des transkodierten Streams.                                         |
| {transcode\_video\_codec}          | Der Videocodec des transkodierten Streams.                                              |
| {transcode\_video\_width}          | Die Videobreite des transkodierten Streams.                                             |
| {transcode\_video\_height}         | Die Videohöhe des transkodierten Streams.                                               |
| {transcode\_audio\_codec}          | Der Audio-Codec des transkodierten Streams.                                             |
| {transcode\_audio\_channels}       | Die Audiokanäle des transkodierten Streams.                                             |
| {transcode\_hw\_requested}         | Wurde Hardware-Dekodierung/-Kodierung angefordert? (0 oder 1)                           |
| {transcode\_hw\_decoding}          | Wenn Hardware-Dekodierung verwendet wird. (0 oder 1)                                    |
| {transcode\_hw\_decode}            | Der Hardware-Decodierungscodec.                                                         |
| {transcode\_hw\_decode\_title}     | Der Hardware-Dekodierungscodec-Titel.                                                   |
| {transcode\_hw\_encoding}          | Wenn Hardware-Codierung verwendet wird. (0 oder 1)                                      |
| {transcode\_hw\_encode}            | Der Hardware-Codierungscodec.                                                           |
| {transcode\_hw\_encode\_title}     | Der Titel des Hardware-Codierungscodecs.                                                |
| {session\_key}                     | Die eindeutige Kennung für die Sitzung.                                                 |
| {transcode\_key}                   | Die eindeutige Kennung für die Transkodierungssitzung.                                  |
| {session\_id}                      | Die eindeutige Kennung für den Datenstrom.                                              |
| {Benutzer-ID}                      | Die eindeutige Kennung des Benutzers.                                                   |
| {machine\_id}                      | Die eindeutige Kennung des Spielers.                                                    |

### Details zu den Quellmetadaten

| Parameter                  | Beschreibung                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| {media\_type}              | Die Art des Mediums. (Film, Serie, Staffel, Folge, Künstler, Album, Titel, Clip)                                       |
| {Titel}                    | Der vollständige Titel des Artikels.                                                                                   |
| {Bibliotheksname}          | Der Bibliotheksname des Objekts.                                                                                       |
| {show\_name}               | Der Titel der Fernsehserie.                                                                                            |
| {episode\_name}            | Der Titel der Folge.                                                                                                   |
| {Künstlername}             | Der Name des Künstlers.                                                                                                |
| {album\_name}              | Der Titel des Albums.                                                                                                  |
| {track\_name}              | Der Titel des Musikstücks.                                                                                             |
| {track\_artist}            | Der Name des Interpreten des Musikstücks.                                                                              |
| {season\_num}              | Die Saisonnummer. (z. B. 1 oder 1-3)                                                                                   |
| {season\_num00}            | Die zweistellige Saisonnummer. (z. B. 01 oder 01-03)                                                                   |
| {episode\_num}             | Die Episodennummer. (z. B. 6 oder 6-10)                                                                                |
| {episode\_num00}           | Die zweistellige Episodennummer. (z. B. 06 oder 06-10)                                                                 |
| {track\_num}               | Die Titelnummer. (z. B. 4 oder 4-10)                                                                                   |
| {track\_num00}             | Die zweistellige Gleisnummer. (z. B. 04 oder 04-10)                                                                    |
| {season\_count}            | Die Anzahl der Jahreszeiten.                                                                                           |
| {episode\_count}           | Die Anzahl der Episoden.                                                                                               |
| {album\_count}             | Die Anzahl der Alben.                                                                                                  |
| {track\_count}             | Die Anzahl der Spuren.                                                                                                 |
| {Jahr}                     | Das Erscheinungsjahr des Artikels.                                                                                     |
| {Veröffentlichungsdatum}   | Das Erscheinungsdatum (im Datumsformat) des Artikels.                                                                  |
| {air\_date}                | Das Ausstrahlungsdatum (im Datumsformat) des Beitrags.                                                                 |
| {added\_date}              | Das Datum (im Datumsformat), an dem das Element zu Plex hinzugefügt wurde.                                             |
| {updated\_date}            | Das Datum (im Datumsformat), an dem der Eintrag auf Plex aktualisiert wurde.                                           |
| {last\_viewed\_date}       | Das Datum (im Datumsformat), an dem das Element zuletzt auf Plex angesehen wurde.                                      |
| {Studio}                   | Das Studio für den Artikel.                                                                                            |
| {content\_rating}          | Die Altersfreigabe für den Artikel. (z. B. TV-MA, TV-PG usw.)                                                          |
| {Regisseure}               | Eine Liste der Verantwortlichen für den Artikel.                                                                       |
| {Autoren}                  | Eine Liste der Autoren für diesen Artikel.                                                                             |
| {Schauspieler}             | Eine Liste der Schauspieler für den Artikel.                                                                           |
| {Genres}                   | Eine Liste der Genres für den Artikel.                                                                                 |
| {labels}                   | Eine Liste der Etiketten für den Artikel.                                                                              |
| {Sammlungen}               | Eine Liste der Sammlungen für den Artikel.                                                                             |
| {Zusammenfassung}          | Eine kurze Inhaltsangabe des Artikels.                                                                                 |
| {Slogan}                   | Ein Slogan für den Medienbeitrag.                                                                                      |
| {Bewertung}                | Die Bewertung (von 10) für den Artikel.                                                                                |
| {critic\_rating}           | Die Kritikerwertung (%) für den Artikel. (Die Bewertungsquelle muss Rotten Tomatoes für den Plex Movie Agent sein.)    |
| {audience\_rating}         | Die Publikumsbewertung (%) für den Artikel. (Die Bewertungsquelle muss Rotten Tomatoes für den Plex Movie Agent sein.) |
| {Dauer}                    | Die Dauer (in Minuten) des Artikels.                                                                                   |
| {poster\_url}              | Eine URL zum Film-, Fernseh- oder Albumposter.                                                                         |
| {plex\_url}                | Die Plex-URL zu Ihrem Server für das Element.                                                                          |
| {imdb\_id}                 | Die IMDB-ID des Films. (z. B. tt2488496)                                                                               |
| {imdb\_url}                | Die IMDB-URL zum Film.                                                                                                 |
| {thetvdb\_id}              | Die TVDB-ID der Fernsehsendung. (z. B. 121361)                                                                         |
| {thetvdb\_url}             | Die TVDB-URL für die Fernsehsendung.                                                                                   |
| {themoviedb\_id}           | Die TMDb-ID für den Film oder die Fernsehsendung. (z. B. 15260)                                                        |
| {themoviedb\_url}          | Die TMDb-URL für den Film oder die Fernsehsendung.                                                                     |
| {tvmaze\_id}               | Die TVmaze-ID für die Fernsehsendung. (z. B. 290)                                                                      |
| {tvmaze\_url}              | Die TVmaze-URL für die Fernsehsendung.                                                                                 |
| {lastfm\_url}              | Die Last.fm-URL für das Album.                                                                                         |
| {trakt\_url}               | Die trakt.tv-URL für den Film oder die Fernsehsendung.                                                                 |
| {Container}                | Der Mediencontainer des Originalmediums.                                                                               |
| {Bitrate}                  | Die Bitrate des Originalmediums.                                                                                       |
| {aspect\_ratio}            | Das Seitenverhältnis des Originalmediums.                                                                              |
| {video\_codec}             | Der Videocodec des Originalmediums.                                                                                    |
| {video\_codec\_level}      | Der Videocodec-Level des Originalmediums.                                                                              |
| {video\_bitrate}           | Die Videobitrate des Originalmediums.                                                                                  |
| {video\_bit\_depth}        | Die Video-Bittiefe des Originalmediums.                                                                                |
| {video\_framerate}         | Die Videobildrate des Originalmediums.                                                                                 |
| {video\_ref\_frames}       | Die Videoreferenzbilder des Originalmediums.                                                                           |
| {video\_resolution}        | Die Videoauflösung des Originalmediums.                                                                                |
| {video\_height}            | Die Videohöhe des Originalmediums.                                                                                     |
| {video\_width}             | Die Videobreite des Originalmediums.                                                                                   |
| {video\_language}          | Die Videosprache des Originalmediums.                                                                                  |
| {video\_language\_code}    | Der Video-Sprachcode des Originalmediums.                                                                              |
| {audio\_bitrate}           | Die Audio-Bitrate des Originalmediums.                                                                                 |
| {audio\_bitrate\_mode}     | Der Audio-Bitratenmodus des Originalmediums. (cbr oder vbr)                                                            |
| {audio\_codec}             | Der Audio-Codec des Originalmediums.                                                                                   |
| {audio\_channels}          | Die Audiokanäle des Originalmediums.                                                                                   |
| {audio\_channel\_layout}   | Das Audio-Kanal-Layout des Originalmediums.                                                                            |
| {audio\_sample\_rate}      | Die Audio-Abtastrate (in Hz) des Originalmediums.                                                                      |
| {audio\_language}          | Die Audiosprache des Originalmediums.                                                                                  |
| {audio\_language\_code}    | Der Audio-Sprachcode des Originalmediums.                                                                              |
| {subtitle\_codec}          | Der Untertitel-Codec des Originalmediums.                                                                              |
| {subtitle\_container}      | Der Untertitelcontainer des Originalmediums.                                                                           |
| {subtitle\_format}         | Das Untertitelformat des Originalmediums.                                                                              |
| {subtitle\_forced}         | Wenn die Untertitel erzwungen werden. (0 oder 1)                                                                       |
| {subtitle\_location}       | Der Speicherort der Untertitel im Originalmedium.                                                                      |
| {subtitle\_language}       | Die Untertitelsprache des Originalmediums.                                                                             |
| {subtitle\_language\_code} | Der Untertitel-Sprachcode des Originalmediums.                                                                         |
| {Datei}                    | Der Dateipfad zum Element.                                                                                             |
| {Dateiname}                | Der Dateiname des Elements.                                                                                            |
| {Dateigröße}               | Die Dateigröße des Elements.                                                                                           |
| {section\_id}              | Die eindeutige Kennung für die Bibliothek.                                                                             |
| {rating\_key}              | Die eindeutige Kennung für den Film, die Episode oder den Musiktitel.                                                  |
| {parent\_rating\_key}      | Die eindeutige Kennung für die Saison oder das Album.                                                                  |
| {grandparent\_rating\_key} | Die eindeutige Kennung für die Fernsehsendung oder den Künstler.                                                       |
| {Daumen}                   | Das Plex-Vorschaubild für den Film oder die Folge.                                                                     |
| {parent\_thumb}            | Das Plex-Vorschaubild für die Staffel oder das Album.                                                                  |
| {grandparent\_thumb}       | Das Plex-Vorschaubild für die Fernsehsendung oder den Künstler.                                                        |
| {poster\_thumb}            | Das Plex-Miniaturbild für das Posterbild.                                                                              |
| {poster\_title}            | Der Titel für das Posterbild.                                                                                          |
| {indexes}                  | Wenn die Medien Video-Vorschaubilder haben. (0 oder 1)                                                                 |

### Pex-Update verfügbar

| Parameter                  | Beschreibung                                                   |
| -------------------------- | -------------------------------------------------------------- |
| {update\_version}          | Die verfügbare Update-Version für Ihren Plex-Server.           |
| {update\_url}              | Die Download-URL für das verfügbare Update.                    |
| {update\_release\_date}    | Das Veröffentlichungsdatum des verfügbaren Updates.            |
| {update\_channel}          | Der Update-Kanal. (Öffentlich oder Plex Pass)                  |
| {update\_platform}         | Die Plattform Ihres Plex-Servers.                              |
| {update\_distro}           | Die Distribution Ihres Plex-Servers.                           |
| {update\_distro\_build}    | Die Distribution Ihres Plex-Servers.                           |
| {update\_requirements}     | Die Anforderungen für das verfügbare Update.                   |
| {update\_extra\_info}      | Gibt es weitere Informationen zum verfügbaren Update?          |
| {update\_changelog\_added} | Das hinzugefügte Änderungsprotokoll für das verfügbare Update. |
| {update\_changelog\_fixed} | Das korrigierte Änderungsprotokoll für das verfügbare Update.  |

### Tautulli-Update verfügbar

| Parameter                        | Beschreibung                                                          |
| -------------------------------- | --------------------------------------------------------------------- |
| {tautulli\_update\_version}      | Die verfügbare Update-Version für Tautulli.                           |
| {tautulli\_update\_release\_url} | Die URL der Release-Seite auf GitHub.                                 |
| {tautulli\_update\_tar}          | Die URL zum Herunterladen des verfügbaren Updates (tar-Datei).        |
| {tautulli\_update\_zip}          | Die Download-URL für das verfügbare Update (ZIP-Datei).               |
| {tautulli\_update\_commit}       | Der Commit-Hash für das verfügbare Update.                            |
| {tautulli\_update\_behind}       | Die Anzahl der Commits, die für das verfügbare Update noch ausstehen. |
| {tautulli\_update\_changelog}    | Das Änderungsprotokoll für das verfügbare Update.                     |