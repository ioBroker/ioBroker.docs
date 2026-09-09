---
chapters: {"pages":{"en/adapterref/iobroker.motioneye/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/README.md"},"en/adapterref/iobroker.motioneye/settings.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/settings.md"},"en/adapterref/iobroker.motioneye/cameras.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/cameras.md"},"en/adapterref/iobroker.motioneye/modes.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/modes.md"},"en/adapterref/iobroker.motioneye/alert-level.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/alert-level.md"},"en/adapterref/iobroker.motioneye/datapoints.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/datapoints.md"},"en/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/vis-stream.md"},"en/adapterref/iobroker.motioneye/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

[Back to documentation index](/#/adapters/motioneye)

## Live stream in VIS (VIS1 / VIS2)

Recommended approach: **HTML widget** with a **binding** to `streamUrl`. The adapter fills this datapoint with a complete `<img>` snippet — no manual MotionEye URL required.

### Steps

1. **Enable the stream** — set `<camera>.stream` to `true`, or trigger `<camera>.streamPulse` for a timed preview.
2. **Add an HTML widget** to your VIS view.
3. **Binding in the HTML field**, for example:

   ```
   {motioneye.0.garten.streamUrl}
   ```

   Replace `0` with your instance number and `garten` with the camera channel folder (lowercase, see Objects tab).

4. Wait a few seconds after enabling the stream — `streamUrl` updates when the MJPEG port is ready.
5. **Optional:** bind a switch widget to `<camera>.stream` to control the stream from VIS.

### Notes

- `streamUrl` is read-only and updates automatically when the stream turns on or off.
- **HTTPS VIS + HTTP MotionEye:** browsers may block mixed content; use HTTP VIS or HTTPS for MotionEye as well.
- Multi-camera dashboards: the adapter can re-link sibling streams after VIS re-renders one camera.