![Logo](media/ioBroker_logo_s.png)

# ioBroker.docs - ioBroker new website project & documentation

See live documentation at [https://www.iobroker.net/#de/documentation](https://www.iobroker.net/#de/documentation) in different languages.

Project content:

| Folder      | Description                                              |
|-------------|----------------------------------------------------------|
| **admin**   | information that directly affects the admin adapter      |
| **archive** | archived information from older documentations           |
| **blog**    | source for blog messages                                 |
| **docs**    | official iobroker documentation source files             |
| **engine**  | dynamic webpage generation engine                        |
| **info**    | Pop-up texts and documentation list for the Info Adapter |
| **media**   | official files and logos                                 |

## How to build
- Go to `engine-2` directory and write `npm i`.
- Then write `npm run buildOnly`. 
- Go to `engine-2/front-end` directory and write `npm run start`
- Open in the browser `http://localhost:5173`

## TODO
- [ ] Do not translate development documentation. By some flag or path
- [ ] Rewrite the search engine
- [ ] Rewrite translation engine
- [ ] Use https://www.meilisearch.com/docs/learn/self_hosted/getting_started_with_self_hosted_meilisearch for search

## How to create the documentation
See [how to participate](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md)

## Changelog
Read the change log [here](CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>  
