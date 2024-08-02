import {
	Slider as PrimeReactSlider,
	type SliderProps,
} from "primereact/slider";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import clsx from "clsx";
import { Text } from "@/components/Text/Text";

export function Slider(props: Props) {
	const {
		name,
		for: htmlFor,
		value,
		className,
		valueSuffix,
		...rest
	} = { ...DEFAULT_PROPS, ...props };

	const sliderClassName = clsx(className, "px-8");

	return (
		<InputWrapper className="flex gap-2" name={name} for={htmlFor}>
			<div className="flex align-items-center justify-space-between px-1 gap-3">
				<PrimeReactSlider
					pt={{
						handle: {
							style: {
								transform: "scale(0.6)",
							},
						},
						range: {
							style: {
								borderRadius: "3px",
							},
						},
					}}
					className={sliderClassName}
					value={value}
					{...rest}
				/>
				<Text size="small" weight="bold">
					{value}
					{valueSuffix}
				</Text>
			</div>
		</InputWrapper>
	);
}

type Props = SliderProps & {
	for: string;
	name: string;
	valueSuffix?: string;
};

const DEFAULT_PROPS: Required<Pick<Props, "valueSuffix">> = {
	valueSuffix: "",
};
