import { Text } from "@/components/Text/Text";
import { FileUpload } from "primereact/fileupload";
import { motion } from "framer-motion";
import { Waveform } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { useSoundsStore } from "@/store/sounds";
import { Sound } from "@/player/Sound";
import type { AudioFileOptions } from "@/player/AudioFile";

export function FileSelect({ name }: Props) {
	const [files, setFiles] = useState<File[]>([]);
	const isEmpty = files.length === 0;

	const { addSound } = useSoundsStore();

	function onAddSound() {
		const fileOptionsList: AudioFileOptions[] = files.map(({ path }) => ({
			path,
		}));
		addSound(new Sound({ fileOptionsList, name }));
	}

	return (
		<>
			<div className="flex px-2 gap-2 flex-column">
				<Text<"label"> tag="label" htmlFor="files">
					Files
				</Text>
				<FileUpload
					name="files"
					multiple
					accept="audio/*"
					mode="advanced"
					contentClassName={isEmpty ? "p-4" : "p-0"}
					onSelect={({ files }) => setFiles(files)}
					uploadOptions={{
						className: "hidden",
					}}
					emptyTemplate={
						<Text className="m-2">Drag and drop files to here to upload.</Text>
					}
					itemTemplate={(object, { index }) => {
						const { name } = object as File;
						const backgroundClassName =
							index % 2 ? "surface-100" : "surface-50";
						const className = `flex flex-1 px-4 py-3 gap-2 w-full h-full ${backgroundClassName}`;

						return (
							<motion.div className={className}>
								<Waveform />
								<Text
									weight="thin"
									className="text-overflow-ellipsis white-space-nowrap overflow-hidden"
								>
									{name}
								</Text>
							</motion.div>
						);
					}}
				/>
			</div>

			<div className="flex gap-2 px-2 justify-content-end">
				<Link to={".."}>
					<Button label="Cancel" severity="secondary" />
				</Link>
				<Link to={".."}>
					<Button label="Create" onClick={onAddSound} />
				</Link>
			</div>
		</>
	);
}

type Props = {
	name: string;
};
