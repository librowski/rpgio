import { LeftPanel } from "@/app/LeftPanel/LeftPanel";

export function MainView() {
	return (
		<>
			{/*<Splitter className="w-full h-full border-none">
      <SplitterPanel
				minSize={40}
				className="h-full w-full flex align-items-center justify-content-center"
			>*/}
			<LeftPanel />
			{/*
			</SplitterPanel>
			<SplitterPanel
				minSize={20}
				className="h-full w-full flex align-items-center justify-content-center"
			>
				<RightPanel />
			</SplitterPanel>
        
    </Splitter> */}
		</>
	);
}
