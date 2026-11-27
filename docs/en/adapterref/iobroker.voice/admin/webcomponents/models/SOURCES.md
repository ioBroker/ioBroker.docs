---
chapters: {"pages":{"en/adapterref/iobroker.voice/README.md":{"title":{"en":"ioBroker.voice"},"content":"en/adapterref/iobroker.voice/README.md"},"en/adapterref/iobroker.voice/admin/webcomponents/models/SOURCES.md":{"title":{"en":"Bundled model provenance"},"content":"en/adapterref/iobroker.voice/admin/webcomponents/models/SOURCES.md"}}}
---
# Bundled model provenance

| File                                                                                        | Source                                                                                      | License                       |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------- |
| `io_broker.onnx`                                                                            | -                                                                                           | provided by GermanBluefox     |
| `melspectrogram.onnx`, `embedding_model.onnx`                                               | [openWakeWord v0.5.1 release](https://github.com/dscripka/openWakeWord/releases/tag/v0.5.1) | CC BY-NC-SA 4.0 model license |
| `hey_jarvis_v0.1.onnx`, `alexa_v0.1.onnx`, `hey_mycroft_v0.1.onnx`, `hey_rhasspy_v0.1.onnx` | [openWakeWord v0.5.1 release](https://github.com/dscripka/openWakeWord/releases/tag/v0.5.1) | CC BY-NC-SA 4.0 model license |

OpenWakeWord code is Apache 2.0; [its README](https://github.com/dscripka/openWakeWord#license) assigns the included pretrained models the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/). The model files are separate from this adapter's MIT source code. Use requires compliance with the model licenses, including attribution and noncommercial restrictions.

SHA-256 of the downloaded files:

```text
alexa_v0.1.onnx       6ff566a01d12670e8d9e3c59da32651db1575d17272a601b7f8a39283dfbae3e
embedding_model.onnx 70d164290c1d095d1d4ee149bc5e00543250a7316b59f31d056cff7bd3075c1f
hey_jarvis_v0.1.onnx 94a13cfe60075b132f6a472e7e462e8123ee70861bc3fb58434a73712ee0d2cb
hey_mycroft_v0.1.onnx c2a311e8fa1338de89c31b3b46dc4dffd4af2f9a8d6ddead48893c2d301b1f18
hey_rhasspy_v0.1.onnx 5a9b3ed3be2910e35780e097905aa9f35a9c10038df47914cf2b3ec4d670f6ea
io_broker.onnx        e119d3f1351d3c13b8f1cd1db0decea96194a6d3cf54006885882f56d8296117
melspectrogram.onnx  ba2b0e0f8b7b875369a2c89cb13360ff53bac436f2895cced9f479fa65eb176f
```