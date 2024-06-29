import { Text } from "@/components/Text/Text";
import { FileUpload } from "primereact/fileupload";
import { motion } from "framer-motion";
import { Waveform } from "@phosphor-icons/react";
import { useState } from "react";

export function FileSelect() {
	const [files, setFiles] = useState<File[]>([]);
	const isEmpty = files.length === 0;

	return (
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
					const backgroundClassName = index % 2 ? "surface-100" : "surface-50";
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
	);
}
