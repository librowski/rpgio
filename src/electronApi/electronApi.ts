import { app, net, protocol } from "electron";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "media",
    privileges: {
      secure: true,
      supportFetchAPI: true,
      bypassCSP: true,
      stream: true,
    },
  },
]);

app.whenReady().then(() => {
  protocol.handle("media", ({ url }) => {
    const filePath = replaceHash(replaceProtocol(url));

    return net.fetch(filePath);
  });
});

function replaceProtocol(url: string) {
  return url.replace("media://", "file://");
}

function replaceHash(url: string) {
  return url.replace("#", "%23");
}
