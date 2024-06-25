import { LeftPanel } from "./LeftPanel/LeftPanel";
import { RightPanel } from "./RightPanel/RightPanel";
import { Topbar } from "./Topbar/Topbar";

import { Splitter, SplitterPanel } from "primereact/splitter";

export function Layout() {
	return (
		<>
			<Topbar />
			<Splitter className="h-full border-none">
				<SplitterPanel className="h-full w-full flex align-items-center justify-content-center">
					<LeftPanel />
				</SplitterPanel>
				<SplitterPanel className="h-full w-full flex align-items-center justify-content-center">
					<RightPanel />
				</SplitterPanel>
			</Splitter>
		</>
	);
}
