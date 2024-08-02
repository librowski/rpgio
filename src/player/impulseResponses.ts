import echoBridgeUrl from "@/assets/impulseResponses/EchoBridge.wav";
import lionsGateBridgeUrl from "@/assets/impulseResponses/LionsGateBridge.wav";
import millsGreekTheaterUrl from "@/assets/impulseResponses/MillsGreekTheater.wav";
import cranbrookArtMuseumUrl from "@/assets/impulseResponses/Cranbrook Art Museum.wav";
import racquetballCourtUrl from "@/assets/impulseResponses/RacquetballCourt.wav";
import { context } from "./globals";

export async function getImpulseResponse(url: string) {
  if (url === "none") {
    return;
  }

	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await context.decodeAudioData(arrayBuffer);

	return audioBuffer;
}

export const IMPULSE_RESPONSES: ImpulseResponse[] = [
	{
		name: "Echo Bridge",
		url: echoBridgeUrl,
	},
	{
		name: "Lions Gate Bridge",
		url: lionsGateBridgeUrl,
	},
	{
		name: "Mills Greek Theater",
		url: millsGreekTheaterUrl,
	},
	{
		name: "Cranbrook Art Museum",
		url: cranbrookArtMuseumUrl,
	},
	{
		name: "Racquetball Court",
		url: racquetballCourtUrl,
	},
];

type ImpulseResponse = {
	name: string;
	url: string;
};
