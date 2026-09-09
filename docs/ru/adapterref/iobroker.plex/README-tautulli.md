---
chapters: {"pages":{"en/adapterref/iobroker.plex/README.md":{"title":{"en":"ioBroker.plex"},"content":"en/adapterref/iobroker.plex/README.md"},"en/adapterref/iobroker.plex/README-states.md":{"title":{"en":"Channels & States"},"content":"en/adapterref/iobroker.plex/README-states.md"},"en/adapterref/iobroker.plex/README-tautulli.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.plex/README-tautulli.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plex/README-tautulli.md
title: без названия
hash: lsHHT+kxkn97mWN9m3+bkdDytHcu1PPivBn+LNeKTFE=
---
![Логотип](../../../en/adapterref/iobroker.plex/admin/tautulli.jpg)

## Настройка уведомлений

**Примечание:** Данные в формате JSON легко настраиваются и могут быть изменены на любые данные по вашему желанию; полный [список доступных параметров](#list-of-available-parameters) см. в соответствующем разделе. Данные JSON, указанные в уведомлениях (см. ниже), будут отправлены в ioBroker и помещены в состояния.

### Начало/Остановка/Пауза/Возобновление воспроизведения

**Примечание:** Как указано выше, данные в формате JSON легко настраиваются и могут быть изменены на любые данные по вашему желанию. **Обратите внимание** , что типы уведомлений для`Playback Start` ,`Stop` ,`Resume` и`Pause` **требуется как минимум**`{"Player": {"title": "{player}", "uuid": "{machine_id}"}` (для идентификации игрока) для корректной работы.

Вы можете скопировать следующий пример в Tautulli, чтобы получить полную подробную полезную нагрузку.![Уведомление Таутулли](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

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

### Изменение решения о перекодировании

Использовать это уведомление **не** рекомендуется.

```
{
	"event":"{action}"
}
```

### Наблюдал

```
{
	"event":"media.scrobble",
	"Metadata":{
		"title":"{title}",
		"librarySectionTitle":"{library_name}"
	}
}
```

### Предупреждение о буфере

Использовать это уведомление **не** рекомендуется.

```
{
	"event":"{action}"
}
```

### Одновременные потоки пользователей

```
{
	"event":"{action}"
}
```

### Пользователь нового устройства

```
{
	"event":"device.new"
}
```

### Недавно добавленные

```
{
	"event":"library.new",
	"Metadata":{
		"title":"{title}",
		"librarySectionTitle":"{library_name}"
	}
}
```

### Сервер Plex недоступен

```
{
	"event":"{action}"
}
```

### Резервное копирование сервера Plex

```
{
	"event":"admin.database.backup"
}
```

### Удаленный доступ Plex недоступен

```
{
	"event":"{action}"
}
```

### Резервное копирование с удаленного доступа Plex

```
{
	"event":"{action}"
}
```

### Доступно обновление Plex

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

### Доступно обновление Tautulli

```
{
	"event":"{action}",
	"tautulli_update_version":"{tautulli_update_version}",
	"tautulli_update_release_url":"{tautulli_update_release_url}",
	"tautulli_update_changelog":"{tautulli_update_changelog}"
}
```

## Список доступных параметров

### Глобальный

| Параметр                | Описание                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------- |
| {tautulli\_version}     | Текущая версия Tautulli.                                                               |
| {tautulli\_remote}      | Текущий удалённый репозиторий Git проекта Tautulli.                                    |
| {tautulli\_branch}      | Текущая ветка репозитория Tautulli в Git.                                              |
| {tautulli\_commit}      | Хэш текущего коммита Git для Tautulli.                                                 |
| {server\_name}          | Название вашего сервера Plex.                                                          |
| {server\_ip}            | IP-адрес подключения вашего сервера Plex.                                              |
| {server\_port}          | Порт подключения для вашего сервера Plex.                                              |
| {server\_url}           | URL-адрес подключения к вашему серверу Plex.                                           |
| {server\_platform}      | Платформа вашего сервера Plex.                                                         |
| {server\_version}       | Текущая версия вашего сервера Plex.                                                    |
| {server\_machine\_id}   | Уникальный идентификатор вашего сервера Plex.                                          |
| {действие}              | Действие, вызвавшее уведомление.                                                       |
| {текущий\_год}          | Год, когда поступает уведомление.                                                      |
| {текущий\_месяц}        | Месяц, в котором срабатывает уведомление. (1–12)                                       |
| {текущий\_день}         | День, когда срабатывает уведомление. (1–31)                                            |
| {текущий\_час}          | Час, в который срабатывает уведомление. (от 0 до 23)                                   |
| {текущая\_минута}       | Момент срабатывания уведомления. (от 0 до 59)                                          |
| {текущая\_секунда}      | Второй момент — срабатывание уведомления. (от 0 до 59)                                 |
| {текущий\_день\_недели} | День недели по стандарту ISO, когда срабатывает уведомление. (С 1 (пн) по 7 (вс))      |
| {текущая\_неделя}       | Номер недели по стандарту ISO, в течение которой срабатывает уведомление (от 1 до 52). |
| {даташтамп}             | Дата (в формате даты), когда сработало уведомление.                                    |
| {временная метка}       | Время (в формате времени), когда срабатывает уведомление.                              |
| {unixtime}              | Временная метка Unix, в момент срабатывания уведомления.                               |
| {utctime}               | Временная метка UTC в формате ISO, в момент срабатывания уведомления.                  |

### Подробности трансляции

| Параметр                           | Описание                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| {потоков}                          | Количество одновременно обрабатываемых потоков.                                                |
| {user\_streams}                    | Количество одновременных потоков, воспроизводимых одним и тем же пользователем.                |
| {пользователь}                     | Дружественное имя человека, ведущего трансляцию.                                               |
| {имя пользователя}                 | Имя пользователя, ведущего трансляцию.                                                         |
| {user\_email}                      | Адрес электронной почты человека, ведущего трансляцию.                                         |
| {устройство}                       | Тип клиентского устройства, используемого для воспроизведения.                                 |
| {платформа}                        | Тип клиентской платформы, используемой для воспроизведения.                                    |
| {продукт}                          | Тип клиентского продукта, используемого для воспроизведения.                                   |
| {игрок}                            | Название проигрывателя, используемого для воспроизведения.                                     |
| {ip\_address}                      | IP-адрес устройства, используемого для воспроизведения.                                        |
| {stream\_duration}                 | Продолжительность трансляции (в минутах).                                                      |
| {stream\_time}                     | Продолжительность (в формате времени) трансляции.                                              |
| {оставшаяся\_продолжительность}    | Оставшаяся продолжительность (в минутах) трансляции.                                           |
| {оставшееся\_время}                | Оставшаяся продолжительность (в формате времени) трансляции.                                   |
| {progress\_duration}               | Последнее зафиксированное смещение (в минутах) потока.                                         |
| {progress\_time}                   | Последнее зарегистрированное смещение (в формате времени) потока.                              |
| {процент\_прогресса}               | Последний зафиксированный процент выполнения потока.                                           |
| {transcode\_decision}              | Решения о перекодировании потока.                                                              |
| {video\_decision}                  | Решения по перекодированию видеопотока.                                                        |
| {audio\_decision}                  | Решения по перекодированию аудиопотока.                                                        |
| {subtitle\_decision}               | Решения о перекодировании субтитров в потоковом режиме.                                        |
| {quality\_profile}                 | Профиль качества потока Plex (например, Оригинальный, 4 Мбит/с 720p и т. д.).                  |
| {оптимизированная\_версия}         | Если поток является оптимизированной версией. (0 или 1)                                        |
| {optimized\_version\_profile}      | Оптимизированный профиль версии потока.                                                        |
| {synced\_version}                  | Если поток является синхронизированной версией. (0 или 1)                                      |
| {жить}                             | Если трансляция — это прямой эфир (0 или 1).                                                   |
| {stream\_local}                    | Если поток локальный. (0 или 1)                                                                |
| {stream\_location}                 | Сетевое местоположение потока (LAN или WAN).                                                   |
| {stream\_bandwidth}                | Требуемая пропускная способность потока (в кбит/с) (а не используемая пропускная способность). |
| {stream\_container}                | Медиаконтейнер потока.                                                                         |
| {stream\_bitrate}                  | Битрейт (в кбит/с) потока.                                                                     |
| {stream\_aspect\_ratio}            | Соотношение сторон потока.                                                                     |
| {stream\_video\_codec}             | Видеокодек потока.                                                                             |
| {stream\_video\_codec\_level}      | Уровень кодека видеопотока.                                                                    |
| {stream\_video\_bitrate}           | Битрейт видеопотока (в кбит/с).                                                                |
| {stream\_video\_bit\_depth}        | Глубина видеопотока.                                                                           |
| {stream\_video\_framerate}         | Частота кадров видеопотока.                                                                    |
| {stream\_video\_ref\_frames}       | Опорные кадры видеопотока.                                                                     |
| {stream\_video\_resolution}        | Разрешение видеопотока.                                                                        |
| {stream\_video\_height}            | Высота видеопотока.                                                                            |
| {ширина\_стримового\_видео}        | Ширина видеопотока.                                                                            |
| {stream\_video\_language}          | Язык видеопотока.                                                                              |
| {stream\_video\_language\_code}    | Языковой код видеопотока.                                                                      |
| {stream\_audio\_bitrate}           | Битрейт аудиопотока.                                                                           |
| {stream\_audio\_bitrate\_mode}     | Режим битрейта аудиопотока (cbr или vbr).                                                      |
| {stream\_audio\_codec}             | Аудиокодек потока.                                                                             |
| {stream\_audio\_channels}          | Аудиоканалы трансляции.                                                                        |
| {stream\_audio\_channel\_layout}   | Расположение аудиоканалов в потоке.                                                            |
| {stream\_audio\_sample\_rate}      | Частота дискретизации аудиопотока (в Гц).                                                      |
| {stream\_audio\_language}          | Язык аудиопотока.                                                                              |
| {stream\_audio\_language\_code}    | Языковой код аудиопотока.                                                                      |
| {stream\_subtitle\_codec}          | Кодек субтитров потока.                                                                        |
| {stream\_subtitle\_container}      | Контейнер субтитров потока.                                                                    |
| {stream\_subtitle\_format}         | Формат субтитров трансляции.                                                                   |
| {stream\_subtitle\_forced}         | Если субтитры включены принудительно. (0 или 1)                                                |
| {stream\_subtitle\_language}       | Язык субтитров трансляции.                                                                     |
| {stream\_subtitle\_language\_code} | Код языка субтитров потока.                                                                    |
| {stream\_subtitle\_location}       | Местоположение субтитров в потоке.                                                             |
| {transcode\_container}             | Медиаконтейнер транскодированного потока.                                                      |
| {transcode\_video\_codec}          | Видеокодек транскодированного потока.                                                          |
| {transcode\_video\_width}          | Ширина видеопотока после транскодирования.                                                     |
| {transcode\_video\_height}         | Высота видеопотока после транскодирования.                                                     |
| {transcode\_audio\_codec}          | Аудиокодек транскодированного потока.                                                          |
| {transcode\_audio\_channels}       | Аудиоканалы транскодированного потока.                                                         |
| {transcode\_hw\_requested}         | Если запрошено аппаратное декодирование/кодирование. (0 или 1)                                 |
| {transcode\_hw\_decoding}          | Если используется аппаратное декодирование. (0 или 1)                                          |
| {transcode\_hw\_decode}            | Аппаратный декодирующий кодек.                                                                 |
| {transcode\_hw\_decode\_title}     | Название аппаратного декодирующего кодека.                                                     |
| {transcode\_hw\_encoding}          | Если используется аппаратное кодирование. (0 или 1)                                            |
| {transcode\_hw\_encode}            | Аппаратный кодек кодирования.                                                                  |
| {transcode\_hw\_encode\_title}     | Название аппаратного кодека.                                                                   |
| {session\_key}                     | Уникальный идентификатор сессии.                                                               |
| {transcode\_key}                   | Уникальный идентификатор сессии транскодирования.                                              |
| {session\_id}                      | Уникальный идентификатор потока.                                                               |
| {ID пользователя}                  | Уникальный идентификатор пользователя.                                                         |
| {machine\_id}                      | Уникальный идентификатор игрока.                                                               |

### Подробная информация об исходных метаданных

| Параметр                      | Описание                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| {media\_type}                 | Тип медиафайла. (фильм, сериал, сезон, эпизод, исполнитель, альбом, трек, клип)                      |
| {заголовок}                   | Полное название товара.                                                                              |
| {library\_name}               | Название издания в библиотеке.                                                                       |
| {show\_name}                  | Название телесериала.                                                                                |
| {название\_эпизода}           | Название эпизода.                                                                                    |
| {имя\_артиста}                | Имя художника.                                                                                       |
| {album\_name}                 | Название альбома.                                                                                    |
| {track\_name}                 | Название трека.                                                                                      |
| {track\_artist}               | Имя исполнителя трека.                                                                               |
| {season\_num}                 | Номер сезона (например, 1 или 1-3).                                                                  |
| {season\_num00}               | Двузначный номер сезона (например, 01 или 01-03).                                                    |
| {номер\_эпизода}              | Номер эпизода (например, 6 или 6-10).                                                                |
| {episode\_num00}              | Двузначный номер эпизода (например, 06 или 06-10).                                                   |
| {track\_num}                  | Номер пути (например, 4 или 4-10).                                                                   |
| {track\_num00}                | Двузначный номер пути (например, 04 или 04-10).                                                      |
| {season\_count}               | Количество сезонов.                                                                                  |
| {количество\_эпизодов}        | Количество эпизодов.                                                                                 |
| {album\_count}                | Количество альбомов.                                                                                 |
| {track\_count}                | Количество дорожек.                                                                                  |
| {год}                         | Год выпуска товара.                                                                                  |
| {Дата выпуска}                | Дата выпуска (в формате даты) товара.                                                                |
| {дата\_эфира}                 | Дата выхода в эфир (в формате даты) для данного товара.                                              |
| {added\_date}                 | Дата (в формате даты), когда элемент был добавлен в Plex.                                            |
| {updated\_date}               | Дата (в формате даты), когда элемент был обновлен в Plex.                                            |
| {дата\_последнего\_просмотра} | Дата (в формате даты), когда элемент был в последний раз просмотрен в Plex.                          |
| {студия}                      | Студия, создавшая этот предмет.                                                                      |
| {content\_rating}             | Возрастной рейтинг (например, TV-MA, TV-PG и т. д.)                                                  |
| {директора}                   | Список директоров, ответственных за данный товар.                                                    |
| {писатели}                    | Список авторов статьи.                                                                               |
| {актеры}                      | Список актеров, участвующих в этом проекте.                                                          |
| {жанры}                       | Список жанров для данного товара.                                                                    |
| {метки}                       | Список меток для данного товара.                                                                     |
| {коллекции}                   | Список коллекций, в которых представлен данный товар.                                                |
| {краткое содержание}          | Краткое описание сюжета данного произведения.                                                        |
| {слоган}                      | Слоган для данного медиа-материала.                                                                  |
| {рейтинг}                     | Оценка товара (из 10).                                                                               |
| {critic\_rating}              | Рейтинг критиков (%) для данного товара. (Источник рейтинга для агента Plex Movie — Rotten Tomatoes) |
| {рейтинг\_аудитории}          | Рейтинг зрителей (%) для данного товара. (Источник рейтинга для агента Plex Movie — Rotten Tomatoes) |
| {продолжительность}           | Продолжительность (в минутах) использования товара.                                                  |
| {poster\_url}                 | URL-адрес постера фильма, телешоу или альбома.                                                       |
| {plex\_url}                   | URL-адрес вашего сервера, на котором находится этот элемент, в формате Plex.                         |
| {imdb\_id}                    | Идентификатор фильма на IMDB (например, tt2488496).                                                  |
| {imdb\_url}                   | URL фильма на IMDB.                                                                                  |
| {thetvdb\_id}                 | Идентификатор телешоу в базе данных TVDB (например, 121361).                                         |
| {thetvdb\_url}                | URL-адрес телешоу на TVDB.                                                                           |
| {themoviedb\_id}              | Идентификатор TMDb для фильма или телешоу (например, 15260).                                         |
| {themoviedb\_url}             | URL-адрес фильма или телешоу на TMDb.                                                                |
| {tvmaze\_id}                  | Идентификатор телешоу на TVmaze (например, 290).                                                     |
| {tvmaze\_url}                 | URL-адрес телешоу на сайте TVmaze.                                                                   |
| {lastfm\_url}                 | URL альбома на Last.fm.                                                                              |
| {trakt\_url}                  | URL-адрес фильма или телешоу на сайте trakt.tv.                                                      |
| {контейнер}                   | Контейнер для исходного медиафайла.                                                                  |
| {битрейт}                     | Битрейт исходного медиафайла.                                                                        |
| {aspect\_ratio}               | Соотношение сторон исходного медиафайла.                                                             |
| {video\_codec}                | Видеокодек исходного носителя.                                                                       |
| {video\_codec\_level}         | Уровень кодека видео исходного медиафайла.                                                           |
| {video\_bitrate}              | Битрейт видео исходного носителя.                                                                    |
| {video\_bit\_depth}           | Разрядность видеосигнала исходного носителя.                                                         |
| {video\_framerate}            | Частота кадров видео исходного медиафайла.                                                           |
| {video\_ref\_frames}          | Кадры видеоматериала, использованные в качестве опорных.                                             |
| {video\_resolution}           | Разрешение видео исходного носителя.                                                                 |
| {video\_height}               | Высота видеоряда исходного медиафайла.                                                               |
| {video\_width}                | Ширина видеоряда исходного медиафайла.                                                               |
| {язык\_видео}                 | Язык видео оригинального медиаконтента.                                                              |
| {video\_language\_code}       | Языковой код видео оригинального медиафайла.                                                         |
| {audio\_bitrate}              | Битрейт аудио исходного медиафайла.                                                                  |
| {audio\_bitrate\_mode}        | Режим битрейта аудио исходного медиафайла (cbr или vbr).                                             |
| {audio\_codec}                | Аудиокодек исходного медиафайла.                                                                     |
| {аудиоканалы}                 | Аудиоканалы оригинального медиаконтента.                                                             |
| {audio\_channel\_layout}      | Расположение аудиоканалов в исходном медиафайле.                                                     |
| {audio\_sample\_rate}         | Частота дискретизации звука (в Гц) исходного медиафайла.                                             |
| {audio\_language}             | Язык аудиозаписи оригинального материала.                                                            |
| {audio\_language\_code}       | Языковой код аудио оригинального медиафайла.                                                         |
| {subtitle\_codec}             | Кодек субтитров исходного медиафайла.                                                                |
| {subtitle\_container}         | Контейнер субтитров исходного медиафайла.                                                            |
| {subtitle\_format}            | Формат субтитров оригинального медиафайла.                                                           |
| {subtitle\_forced}            | Если субтитры включены принудительно. (0 или 1)                                                      |
| {subtitle\_location}          | Местоположение субтитров в исходном медиафайле.                                                      |
| {язык\_субтитров}             | Язык субтитров оригинального видеоматериала.                                                         |
| {subtitle\_language\_code}    | Языковой код субтитров оригинального медиафайла.                                                     |
| {файл}                        | Путь к файлу с данным элементом.                                                                     |
| {имя файла}                   | Имя файла элемента.                                                                                  |
| {размер\_файла}               | Размер файла элемента.                                                                               |
| {section\_id}                 | Уникальный идентификатор библиотеки.                                                                 |
| {rating\_key}                 | Уникальный идентификатор фильма, эпизода или трека.                                                  |
| {parent\_rating\_key}         | Уникальный идентификатор сезона или альбома.                                                         |
| {grandparent\_rating\_key}    | Уникальный идентификатор телешоу или исполнителя.                                                    |
| {большой палец}               | Миниатюра фильма или эпизода в Plex.                                                                 |
| {parent\_thumb}               | Миниатюра Plex для сезона или альбома.                                                               |
| {grandparent\_thumb}          | Миниатюра Plex для телешоу или исполнителя.                                                          |
| {poster\_thumb}               | Миниатюра изображения постера в Plex.                                                                |
| {poster\_title}               | Заголовок для изображения на плакате.                                                                |
| {индексы}                     | Если у медиафайла есть миниатюры предварительного просмотра видео (0 или 1).                         |

### Доступно обновление Pex

| Параметр                   | Описание                                                                    |
| -------------------------- | --------------------------------------------------------------------------- |
| {update\_version}          | Доступная версия обновления для вашего сервера Plex.                        |
| {update\_url}              | Ссылка для скачивания доступного обновления.                                |
| {update\_release\_date}    | Дата выхода доступного обновления.                                          |
| {update\_channel}          | Канал обновлений. (Для публичных пользователей или пользователей Plex Pass) |
| {update\_platform}         | Платформа вашего сервера Plex.                                              |
| {update\_distro}           | Дистрибутив вашего Plex-сервера.                                            |
| {update\_distro\_build}    | Сборка дистрибутива вашего Plex Server.                                     |
| {update\_requirements}     | Требования для доступного обновления.                                       |
| {update\_extra\_info}      | Любая дополнительная информация о доступном обновлении.                     |
| {update\_changelog\_added} | Добавлен список изменений для доступного обновления.                        |
| {update\_changelog\_fixed} | Исправлен список изменений для доступного обновления.                       |

### Доступно обновление Tautulli

| Параметр                         | Описание                                                  |
| -------------------------------- | --------------------------------------------------------- |
| {tautulli\_update\_version}      | Доступная версия обновления для Tautulli.                 |
| {tautulli\_update\_release\_url} | URL страницы релиза на GitHub.                            |
| {tautulli\_update\_tar}          | Ссылка для скачивания архива tar с доступным обновлением. |
| {tautulli\_update\_zip}          | Ссылка для скачивания ZIP-архива доступного обновления.   |
| {tautulli\_update\_commit}       | Хэш коммита для доступного обновления.                    |
| {tautulli\_update\_behind}       | Количество отстающих коммитов для доступного обновления.  |
| {tautulli\_update\_changelog}    | Список изменений для доступного обновления.               |