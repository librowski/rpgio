import { app, net, protocol } from "electron";

protocol.registerSchemesAsPrivileged([
	{
		scheme: "media",
		privileges: {
			secure: true,
			stream: true,
		},
	},
]);

app.whenReady().then(() => {
	protocol.handle("media", ({ url }) => {
		const filePath = replaceProtocol(url);

		return net.fetch(filePath);
	});
});

function replaceProtocol(url: string) {
	return url.replace("media://", "file://");
}
