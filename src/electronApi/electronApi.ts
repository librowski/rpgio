import { app, net, protocol } from "electron";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "audio",
    privileges: {
      secure: true,
      supportFetchAPI: true,
      bypassCSP: true,
      stream: true
    },
  },
]);

app.whenReady().then(() => {
  protocol.handle("audio", (req) => {
    const pathToMedia = new URL(req.url).pathname;
    return net.fetch(`file://${pathToMedia}`);
  });
});

//
// const path = "/home/jl/Downloads/104183__ekokubza123__punch.wav";
//
// function startSoundStream(path: string, id: string) {
//   console.log("Start sound stream", path, id);
//   const stream = createReadStream(path);
//   stream.on("data", onChunkProcessed);
// }
//
// function onChunkProcessed(buffer: Buffer) {
//   mainWindow?.webContents.send("onChunkProcessed", buffer);
// }
