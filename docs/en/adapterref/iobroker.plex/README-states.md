---
chapters: {"pages":{"en/adapterref/iobroker.plex/README.md":{"title":{"en":"ioBroker.plex"},"content":"en/adapterref/iobroker.plex/README.md"},"en/adapterref/iobroker.plex/README-states.md":{"title":{"en":"Channels & States"},"content":"en/adapterref/iobroker.plex/README-states.md"},"en/adapterref/iobroker.plex/README-tautulli.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.plex/README-tautulli.md"}}}
---
# Channels & States
The following tables list all channels and states which will be created by the adapter.

## With Basis Setup
All states from the basic setup will be received without Plex Pass or Tautulli.

| Channel / Folder | State | Description |
| ---------------- | ----- | ----------- |
| __libraries__ | - | Plex Libraries |
| libraries._\<libraryName\>_ | - | Plex Library _\<libraryName\>_ |
| libraries._\<libraryName\>_ | allowsync | Allow Sync |
| libraries._\<libraryName\>_ | art | Picture path |
| libraries._\<libraryName\>_ | composite | Composite |
| libraries._\<libraryName\>_ | filters | Indicator if filter is applied |
| libraries._\<libraryName\>_ | refreshing | Indicator if currently refreshing |
| libraries._\<libraryName\>_ | thumb | Thumbnail of the Library |
| libraries._\<libraryName\>_ | key | ID of library |
| libraries._\<libraryName\>_ | type | Type of Library |
| libraries._\<libraryName\>_ | title | Name of the Library |
| libraries._\<libraryName\>_ | agent | Agent |
| libraries._\<libraryName\>_ | scanner | Used scanner for media |
| libraries._\<libraryName\>_ | language | Language |
| libraries._\<libraryName\>_ | uuid | Unique ID |
| libraries._\<libraryName\>_ | updatedat | Timestamp of last update |
| libraries._\<libraryName\>_ | createdat | Timestamp of library creation |
| libraries._\<libraryName\>_ | scannedat | Timestamp of last scan |
| libraries._\<libraryName\>_ | location | Storage Locations |

| Channel / Folder | State | Description |
| ---------------- | ----- | ----------- |
| __servers__ | - | Plex Servers |
| servers._\<serverName\>_ | - | Plex Server _\<serverName\>_ |
| servers._\<serverName\>_ | name | Server Name |
| servers._\<serverName\>_ | host | Server Host |
| servers._\<serverName\>_ | address | Server Address |
| servers._\<serverName\>_ | port | Server Port |
| servers._\<serverName\>_ | machineIdentifier | Server Identifier |
| servers._\<serverName\>_ | version | Server Software Version |

| Channel / Folder | State | Description |
| ---------------- | ----- | ----------- |
| __settings__ | - | Plex Settings |
| settings.butler | - | Settings Butler |
| settings.butler | ButlerStartHour | Time at which tasks start to run |
| settings.butler | ButlerEndHour | Time at which tasks stop running |
| settings.butler | ButlerTaskBackupDatabase | Backup database every three days |
| settings.butler | ButlerDatabaseBackupPath | Backup directory |
| settings.butler | ButlerTaskOptimizeDatabase | Optimize database every week |
| settings.butler | ButlerTaskCleanOldBundles | Remove old bundles every week |
| settings.butler | ButlerTaskCleanOldCacheFiles | Remove old cache files every week |
| settings.butler | ButlerTaskRefreshLocalMedia | Refresh local metadata every three days |
| settings.butler | ButlerTaskRefreshLibraries | Update all libraries during maintenance |
| settings.butler | ButlerTaskUpgradeMediaAnalysis | Upgrade media analysis during maintenance |
| settings.butler | ButlerTaskRefreshPeriodicMetadata | Refresh metadata periodically |
| settings.butler | ButlerTaskDeepMediaAnalysis | Perform extensive media analysis during maintenance |
| settings.butler | ButlerTaskRefreshEpgGuides | Perform refresh of program guide data. |
| settings.butler | ButlerTaskReverseGeocode | Fetch missing location names for items in photo sections |
| settings.butler | ButlerTaskGenerateAutoTags | Analyze and tag photos |
| settings.channels | - | Settings Channels |
| settings.channels | iTunesSharingEnabled | Enable iTunes plugin |
| settings.channels | iTunesLibraryXmlPath | iTunes library XML path |
| settings.channels | disableCapabilityChecking | Disable capability checking |
| settings.channels | PluginsLaunchTimeout | Number of seconds to wait before a plugin times out |
| settings.dlna | - | Settings Dlna |
| settings.dlna | DlnaEnabled | Enable the DLNA server |
| settings.dlna | DlnaPlatinumLoggingLevel | DLNA server logging level |
| settings.dlna | DlnaClientPreferences | DLNA client preferences |
| settings.dlna | DlnaReportTimeline | DLNA server timeline reporting |
| settings.dlna | DlnaDefaultProtocolInfo | DLNA default protocol info |
| settings.dlna | DlnaDeviceDiscoveryInterval | DLNA media renderer discovery interval |
| settings.dlna | DlnaAnnouncementLeaseTime | DLNA server announcement lease time |
| settings.dlna | DlnaDescriptionIcons | DLNA server description icons |
| settings.extras | - | Settings Extras |
| settings.extras | CinemaTrailersType | Choose Cinema Trailers from |
| settings.extras | CinemaTrailersFromLibrary | Include Cinema Trailers from movies in my library |
| settings.extras | CinemaTrailersFromTheater | Include Cinema Trailers from new and upcoming movies in theaters |
| settings.extras | CinemaTrailersFromBluRay | Include Cinema Trailers from new and upcoming movies on Blu-ray |
| settings.extras | CinemaTrailersPrerollID | Movie pre-roll video |
| settings.general | - | Settings General |
| settings.general | FriendlyName | Friendly name |
| settings.general | sendCrashReports | Send crash reports to Plex |
| settings.general | logDebug | Enable Plex Media Server debug logging |
| settings.general | LogVerbose | Enable Plex Media Server verbose logging |
| settings.general | MinimumProgressTime | |
| settings.general | ButlerUpdateChannel | Server update Channel |
| settings.library | - | Settings Library |
| settings.library | FSEventLibraryUpdatesEnabled | Scan my library automatically |
| settings.library | FSEventLibraryPartialScanEnabled | Run a partial scan when changes are detected |
| settings.library | watchMusicSections | Include music libraries in automatic updates |
| settings.library | ScheduledLibraryUpdatesEnabled | Scan my library periodically |
| settings.library | ScheduledLibraryUpdateInterval | Library scan interval |
| settings.library | autoEmptyTrash | Empty trash automatically after every scan |
| settings.library | allowMediaDeletion | Allow media deletion |
| settings.library | allowMediaDeletionLanOnly | |
| settings.library | OnDeckWindow | Weeks to consider for On Deck and Continue Watching |
| settings.library | OnDeckIncludePremieres | Include season premieres in On Deck |
| settings.library | ScannerLowPriority | Run scanner tasks at a lower priority |
| settings.library | GenerateBIFBehavior | Generate video preview thumbnails |
| settings.library | GenerateChapterThumbBehavior | Generate chapter thumbnails |
| settings.library | LoudnessAnalysisBehavior | Analyze audio tracks for loudness |
| settings.library | LocationVisibility | Location visibility |
| settings.network | - | Settings Network |
| settings.network | ConfigurationUrl | Web Manager URL |
| settings.network | EnableIPv6 | Enable server support for IPv6 |
| settings.network | secureConnections | Secure connections |
| settings.network | customCertificatePath | Custom certificate location |
| settings.network | customCertificateKey | Custom certificate encryption key |
| settings.network | customCertificateDomain | Custom certificate domain |
| settings.network | PreferredNetworkInterface | Preferred network interface |
| settings.network | GdmEnabled | Enable local network discovery (GDM) |
| settings.network | WanPerUserStreamCount | Remote streams allowed per user |
| settings.network | LanNetworksBandwidth | LAN Networks |
| settings.network | MinutesAllowedPaused | Terminate Sessions Paused for Longer Than |
| settings.network | TreatWanIpAsLocal | Treat WAN IP As LAN Bandwidth |
| settings.network | customConnections | Custom server access URLs |
| settings.network | allowedNetworks | List of IP addresses and networks that are allowed without auth |
| settings.network | enableAirplay | |
| settings.network | enableHttpPipelining | Enable HTTP Pipelining |
| settings.network | WebHooksEnabled | Webhooks |
| settings.other | - | Settings Other |
| settings.other | MachineIdentifier | A unique identifier for the machine |
| settings.other | AllowHighOutputBitrates | |
| settings.other | AcceptedEULA | Has the user accepted the EULA |
| settings.other | LanguageInCloud | Use language preferences from plex.tv |
| settings.other | ArticleStrings | Comma-separated list of strings considered articles when sorting titles. A server restart is required for a change to take effect. |
| settings.other | TranscoderCanOnlyRemuxVideo | The transcoder can only remux video |
| settings.other | TranscoderVideoResolutionLimit | Maximum video output resolution for the transcoder |
| settings.other | TranscoderPhotoFileSizeLimitMiB | |
| settings.other | PublishServerOnPlexOnlineKey | Publish server on Plex Online |
| settings.other | PlexOnlineMail | |
| settings.other | PlexOnlineUrl | |
| settings.other | ManualPortMappingMode | |
| settings.other | ManualPortMappingPort | |
| settings.other | LastAutomaticMappedPort | |
| settings.other | SyncMyPlexLoginGCDeferral | |
| settings.other | SyncPagingItemsLimit | |
| settings.other | BackgroundQueueIdlePaused | |
| settings.other | WanPerStreamMaxUploadRate | Limit remote stream bitrate |
| settings.other | WanTotalMaxUploadRate | External network total upload limit (kbps) |
| settings.other | forceAutoAdjustQuality | |
| settings.other | EnableABRDebugOverlay | |
| settings.other | ABRKeepOldTranscodes | |
| settings.other | ForceABRDisabled | |
| settings.other | LogTokensForDebug | Allow Plex Media Server tokens in logs |
| settings.other | GenerateIndexFilesDuringAnalysis | |
| settings.other | ButlerTaskGenerateMediaIndexFiles | |
| settings.other | LoudnessAnalysisThreads | |
| settings.other | RadioTopTracksPerAlbum | |
| settings.other | RadioDaysSinceLastPlayed | |
| settings.other | RadioDirectoryThreshold | |
| settings.other | GracenoteUser | |
| settings.other | CertificateVersion | |
| settings.other | EyeQUser | |
| settings.other | DvrShowUnsupportedDevices | |
| settings.other | DvrComskipRemoveIntermediates | |
| settings.other | DvrComskipKeepOriginal | |
| settings.other | DvrOnConnectTestingUrl | |
| settings.other | SubtitlesPersistIfAdmin | |
| settings.other | DvrIncrementalEpgLoader | |
| settings.other | DvrAllowUnsupportedCountry | |
| settings.transcoder | - | Settings Transcoder |
| settings.transcoder | TranscoderQuality | Transcoder quality |
| settings.transcoder | SegmentedTranscoderTimeout | Segmented transcoder timeout |
| settings.transcoder | TranscoderTempDirectory | Transcoder temporary directory |
| settings.transcoder | TranscoderDefaultDuration | Transcoder default duration |
| settings.transcoder | TranscoderThrottleBuffer | Transcoder default throttle buffer |
| settings.transcoder | TranscoderPruneBuffer | Transcoder default prune buffer |
| settings.transcoder | TranscoderLivePruneBuffer | |
| settings.transcoder | TranscoderH264Preset | |
| settings.transcoder | TranscoderH264BackgroundPreset | Background transcoding x264 preset |
| settings.transcoder | TranscoderH264Options | |
| settings.transcoder | TranscoderH264OptionsOverride | |
| settings.transcoder | TranscoderH264MinimumCRF | |
| settings.transcoder | TranscoderLogLevel | |
| settings.transcoder | HardwareAcceleratedCodecs | Use hardware acceleration when available |
| settings.transcoder | SystemAudioCodecs | |
| settings.transcoder | HardwareDevicePath | |
| settings.transcoder | TranscodeCountLimit | Maximum simultaneous video transcode |

## With Advanced Setup

### with either Plex Pass or Tautulli
The following states will be received when an event is being received by the webhook - either with Plex Pass or with Tautulli being setup.

__Note:__ With Tautulli being setup, the states can be highly customized to basically anything. See the [instructions on how to setup the webhook (step 4)](https://github.com/iobroker-community-adapters/ioBroker.plex#1222-webhook).

With the standard Plex Pass or Tautulli setup, the following states will be received and created:
- \* Indicates that the state is only given when using Plex Plass
- \*\* Indicates that the state is only given when using Tautulli

| Channel / Folder | State | Description |
| ---------------- | ----- | ----------- |
| __\_playing__ | - | Plex Media being played |
| \_playing._\<playerName-playerId\>_ | - | Player _\<playerName\>_ |
| \_playing._\<playerName-playerId\>_ | datetime | DateTime of the event being received |
| \_playing._\<playerName-playerId\>_ | event | Event triggered on Plex, may be<br>- Media starts playing (`media.play`)<br>- Media playback pauses (`media.pause`)<br>- Media playback resumes (`media.resume`)<br>- Media playback stops (`media.stop`)<br>- Media is viewed (played past the 90% mark) (`media.scrobble`)<br>- Media is rated (`media.rate`) |
| \_playing._\<playerName-playerId\>_ | owner\* | Event sent because the owner has a webhook configured |
| \_playing._\<playerName-playerId\>_ | source | Source of event (either `plex` or `tautulli`) |
| \_playing._\<playerName-playerId\>_ | timestamp | Timestamp of the event being received |
| \_playing._\<playerName-playerId\>_ | user\* | Event sent because the user has a webhook configured |
| \_playing._\<playerName-playerId\>_.Account | - | Account Information |
| \_playing._\<playerName-playerId\>_.Account | id | Plex ID of Plex User |
| \_playing._\<playerName-playerId\>_.Account | thumb | Avatar of Plex User |
| \_playing._\<playerName-playerId\>_.Account | title | Name of Plex User |
| \_playing._\<playerName-playerId\>_.Account | userId\*\* | ID of Plex User |
| \_playing._\<playerName-playerId\>_.Metadata | - | Metadata Information |
| \_playing._\<playerName-playerId\>_.Metadata | addedAt | The date (in date format) the item was added to Plex. |
| \_playing._\<playerName-playerId\>_.Metadata | art\* | The artwork of the item |
| \_playing._\<playerName-playerId\>_.Metadata | chapterSource\* |  |
| \_playing._\<playerName-playerId\>_.Metadata | Collection | Collections as a list |
| \_playing._\<playerName-playerId\>_.Metadata | contentRating | The content rating for the item. (e.g. TV-MA, TV-PG, etc.) |
| \_playing._\<playerName-playerId\>_.Metadata | Country\* | Countries as a list |
| \_playing._\<playerName-playerId\>_.Metadata | Director | Directors as a list |
| \_playing._\<playerName-playerId\>_.Metadata | duration | The duration (in minutes) for the item |
| \_playing._\<playerName-playerId\>_.Metadata | Field | Fields as a list |
| \_playing._\<playerName-playerId\>_.Metadata | Genre | Genres as a list |
| \_playing._\<playerName-playerId\>_.Metadata | guid |  |
| \_playing._\<playerName-playerId\>_.Metadata | key |  |
| \_playing._\<playerName-playerId\>_.Metadata | lastViewedAt | The date (in date format) the item was last viewed on Plex |
| \_playing._\<playerName-playerId\>_.Metadata | librarySectionID | The library ID of the item |
| \_playing._\<playerName-playerId\>_.Metadata | librarySectionKey | The library key of the item |
| \_playing._\<playerName-playerId\>_.Metadata | librarySectionTitle | The library name of the item |
| \_playing._\<playerName-playerId\>_.Metadata | librarySectionType\* |  |
| \_playing._\<playerName-playerId\>_.Metadata | originallyAvailableAt | The release date (in date format) for the item |
| \_playing._\<playerName-playerId\>_.Metadata | primaryExtraKey\* |  |
| \_playing._\<playerName-playerId\>_.Metadata | Producer\* | Producers as a list |
| \_playing._\<playerName-playerId\>_.Metadata | rating | The rating (out of 10) for the item |
| \_playing._\<playerName-playerId\>_.Metadata | ratingImage |  |
| \_playing._\<playerName-playerId\>_.Metadata | ratingKey | The unique identifier for the movie, episode, or track. |
| \_playing._\<playerName-playerId\>_.Metadata | Role | Roles as a list |
| \_playing._\<playerName-playerId\>_.Metadata | Similar\* | Similar as a list |
| \_playing._\<playerName-playerId\>_.Metadata | studio | The studio for the item |
| \_playing._\<playerName-playerId\>_.Metadata | summary | A short plot summary for the item |
| \_playing._\<playerName-playerId\>_.Metadata | tagline | A tagline for the media item |
| \_playing._\<playerName-playerId\>_.Metadata | thumb | The thumbnail of the item |
| \_playing._\<playerName-playerId\>_.Metadata | title | The full title of the item |
| \_playing._\<playerName-playerId\>_.Metadata | titleSort\* | The sorting title of the item |
| \_playing._\<playerName-playerId\>_.Metadata | type | The type of media. (movie, show, season, episode, artist, album, track, clip) |
| \_playing._\<playerName-playerId\>_.Metadata | updatedAt | The date (in date format) the item was updated on Plex |
| \_playing._\<playerName-playerId\>_.Metadata | Writer | Writers as a list |
| \_playing._\<playerName-playerId\>_.Metadata | year | The release year for the item |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | - | Audio Information |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_bitrate | The audio bitrate of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_bitrate_mode | The audio bitrate mode of the original media. (cbr or vbr) |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_channel_layout | The audio channel layout of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_channels | The audio channels of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_codec | The audio codec of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_language | The audio language of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_language_code | The audio language code of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.audio\*\* | audio_sample_rate | The audio sample rate (in Hz) of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree\* | - | Collections Information |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.CollectionTree._\<index\>_\* | tag | Tag / Name of this category |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree\* | - | Countries Information |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.CountryTree._\<index\>_\* | tag | Tag / Name of this category |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree\* | - | Director Information |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.DirectorTree._\<index\>_\* | tag | Tag / Name of this category |
| \_playing._\<playerName-playerId\>_.Metadata.FieldTree\* | - | Fields Information |
| \_playing._\<playerName-playerId\>_.Metadata.FieldTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.FieldTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.FieldTree._\<index\>_\* | _\<index\>_  | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.FieldTree._\<index\>_\* | locked |  |
| \_playing._\<playerName-playerId\>_.Metadata.FieldTree._\<index\>_\* | name |  |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree\* | - | Genre Information |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.GenreTree._\<index\>_\* | tag | Tag / Name of this category |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree\* | - | Producers Information |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree\* | \_data | Producer dat Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.ProducerTree._\<index\>_\* | tag | Tag / Name of this category |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree\* | - | Roles Information |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | role | Name of role |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | tag | Name of the actor |
| \_playing._\<playerName-playerId\>_.Metadata.RoleTree._\<index\>_\* | thumb | Thumbnail of the actor |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree\* | - | Similar Information |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.SimilarTree._\<index\>_\* | tag | Tag / Name of this category |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | - | Subtitles Information |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | subtitle_codec | The subtitle codec of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | subtitle_container | The subtitle container of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | subtitle_forced | If the subtitles are forced. (0 or 1) |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | subtitle_format | The subtitle format of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | subtitle_language | The subtitle language of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | subtitle_language_code | The subtitle language code of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.subtitles\*\* | subtitle_location | The subtitle location of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | - | Video Information |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | \_data |  Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | aspect_ratio | The aspect ratio of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | bitrate | The bitrate of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | container | The media container of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_bit_depth | The video bit depth of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_bitrate | The video bitrate of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_codec | The video codec of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_codec_level | The video codec level of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_framerate | The video framerate of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_height | The video height of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_language | The video language of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_language_code | The video language code of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_ref_frames | The video reference frames of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_resolution | The video resolution of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.video\*\* | video_width | The video width of the original media. |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree\* | - | Writers Information |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree._\<index\>_\* | - | each item as its own index |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree._\<index\>_\* | \_data | Data of this folder in JSON format |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree._\<index\>_\* | count | Number of items within Plex in that category |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree._\<index\>_\* | filter | Filter to select this specific category |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree._\<index\>_\* | id | ID of this category |
| \_playing._\<playerName-playerId\>_.Metadata.WriterTree._\<index\>_\* | tag | Tag / Name of this category |
| \_playing._\<playerName-playerId\>_.Player | - | Player Information |
| \_playing._\<playerName-playerId\>_.Player | local | Indication whether Player is local |
| \_playing._\<playerName-playerId\>_.Player | localAddress\*\* | Local IP address |
| \_playing._\<playerName-playerId\>_.Player | publicAddress\*| Public IP address |
| \_playing._\<playerName-playerId\>_.Player | title | Name of Plex Player |
| \_playing._\<playerName-playerId\>_.Player | uuid | ID of Plex Player |
| \_playing._\<playerName-playerId\>_.Server | - | Server Information |
| \_playing._\<playerName-playerId\>_.Server | title | Name of Plex Server |
| \_playing._\<playerName-playerId\>_.Server | uuid | ID of Plex Server |

### only with Tautulli

| Channel / Folder | State | Description |
| ---------------- | ----- | ----------- |
| __statistics__ | - | Plex Watch Statistics |
| statistics.libraries | - | Library Watch Statistics |
| statistics.libraries._\<libraryName\>_ | - | Library Watch Statistics _\<libraryName\>_ |
| statistics.libraries._\<libraryName\>_.01-last_24h | - | Watched last 24 hours |
| statistics.libraries._\<libraryName\>_.01-last_24h | query_days | Days querying |
| statistics.libraries._\<libraryName\>_.01-last_24h | total_time | Total Time |
| statistics.libraries._\<libraryName\>_.01-last_24h | total_plays | Total plays |
| statistics.libraries._\<libraryName\>_.02-last_7d | - | Watched last 7 days |
| statistics.libraries._\<libraryName\>_.02-last_7d | query_days | Days querying |
| statistics.libraries._\<libraryName\>_.02-last_7d | total_time | Total Time |
| statistics.libraries._\<libraryName\>_.02-last_7d | total_plays | Total plays |
| statistics.libraries._\<libraryName\>_.03-last_30d | - | Watched last 30 days |
| statistics.libraries._\<libraryName\>_.03-last_30d | query_days | Days querying |
| statistics.libraries._\<libraryName\>_.03-last_30d | total_time | Total Time |
| statistics.libraries._\<libraryName\>_.03-last_30d | total_plays | Total plays |
| statistics.libraries._\<libraryName\>_.00-all_time | - | Watched all time |
| statistics.libraries._\<libraryName\>_.00-all_time | query_days | Days querying |
| statistics.libraries._\<libraryName\>_.00-all_time | total_time | Total Time |
| statistics.libraries._\<libraryName\>_.00-all_time | total_plays | Total plays |
| statistics.users | - | User Watch Statistics |
| statistics.users._\<userName\>_ | - | User Watch Statistics _\<userName\>_ |
| statistics.users._\<userName\>_.01-last_24h | - | Watched last 24 hours |
| statistics.users._\<userName\>_.01-last_24h | query_days | Days querying |
| statistics.users._\<userName\>_.01-last_24h | total_time | Total Time |
| statistics.users._\<userName\>_.01-last_24h | total_plays | Total plays |
| statistics.users._\<userName\>_.02-last_7d | - | Watched last 7 days |
| statistics.users._\<userName\>_.02-last_7d | query_days | Days querying |
| statistics.users._\<userName\>_.02-last_7d | total_time | Total Time |
| statistics.users._\<userName\>_.02-last_7d | total_plays | Total plays |
| statistics.users._\<userName\>_.03-last_30d | - | Watched last 30 days |
| statistics.users._\<userName\>_.03-last_30d | query_days | Days querying |
| statistics.users._\<userName\>_.03-last_30d | total_time | Total Time |
| statistics.users._\<userName\>_.03-last_30d | total_plays | Total plays |
| statistics.users._\<userName\>_.00-all_time | - | Watched all time |
| statistics.users._\<userName\>_.00-all_time | query_days | Days querying |
| statistics.users._\<userName\>_.00-all_time | total_time | Total Time |
| statistics.users._\<userName\>_.00-all_time | total_plays | Total plays |

| Channel / Folder | State | Description |
| ---------------- | ----- | ----------- |
| __users__ | - | Plex Users |
| users._\<userName\>_ | - | Plex User _\<userName\>_ |
| users._\<userName\>_ | username | Name of User |
| users._\<userName\>_ | filter_music | Filter Music |
| users._\<userName\>_ | user_id | User ID |
| users._\<userName\>_ | thumb | Thumbnail |
| users._\<userName\>_ | shared_libraries | Shared Libraries |
| users._\<userName\>_ | do_notify | Do Notify |
| users._\<userName\>_ | filter_movies | Filter Movies |
| users._\<userName\>_ | friendly_name | Friendly Name |
| users._\<userName\>_ | is_allow_sync | User may sync media |
| users._\<userName\>_ | filter_photos | Filter Photos |
| users._\<userName\>_ | filter_all | Filter All |
| users._\<userName\>_ | keep_history | Keep History |
| users._\<userName\>_ | is_admin | User is admin |
| users._\<userName\>_ | filter_tv | Filter TV |
| users._\<userName\>_ | allow__\<userName\>_ | Allow _\<userName\>_ |
| users._\<userName\>_ | is_restricted | User is restricted |
| users._\<userName\>_ | is_home_user | User is Home User |
| users._\<userName\>_ | email | Email address |