import { LeftPanel } from "@/app/LeftPanel/LeftPanel";
import { RightPanel } from "@/app/RightPanel/RightPanel";

import { Splitter, SplitterPanel } from "primereact/splitter";

export function MainView() {
	return (
		<Splitter className="w-full h-full border-none">
			<SplitterPanel className="h-full w-full flex align-items-center justify-content-center">
				<LeftPanel />
			</SplitterPanel>
			<SplitterPanel className="h-full w-full flex align-items-center justify-content-center">
				<RightPanel />
			</SplitterPanel>
		</Splitter>
	);
}
