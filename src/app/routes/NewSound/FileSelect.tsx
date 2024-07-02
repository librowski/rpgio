import { Text } from "@/components/Text/Text";
import { FileUpload, type FileUploadSelectEvent } from "primereact/fileupload";
import { motion } from "framer-motion";
import { Waveform } from "@phosphor-icons/react";
import { useNewSoundFormContext } from "./useNewSoundForm";

export function FileSelect() {
	const { setValue, watch } = useNewSoundFormContext();
	const { filePaths } = watch();

	const isEmpty = filePaths.length === 0;

	function onSelectFiles({ files }: FileUploadSelectEvent) {
		const filePaths = files.map(({ path }) => path);
		setValue("filePaths", filePaths);
		console.log(filePaths);
	}

	function onClear() {
		setValue("filePaths", []);
	}

	return (
		<>
			<div className="flex px-2 gap-2 flex-column">
				<Text<"label"> tag="label" htmlFor="files">
					Files
				</Text>
				<FileUpload
					multiple
					accept="audio/*"
					mode="advanced"
					contentClassName={isEmpty ? "p-4" : "p-0"}
					onSelect={onSelectFiles}
					onClear={onClear}
					cancelLabel="Clear"
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
		</>
	);
}
