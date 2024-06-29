import { Text } from "@/components/Text/Text";
import { motion, Reorder } from "framer-motion";

export function SceneCard({ scene }: Props) {
	const { name, image } = scene;

	return (
		<Reorder.Item key={name} value={scene} className="list-none">
			<motion.div
				className="w-15rem h-8rem flex flex-column surface-0 border-round cursor-pointer"
				whileHover={{ opacity: 1 }}
				initial={{ opacity: 0.8 }}
			>
				<div
					className="flex-1 bg-no-repeat bg-cover bg-center"
					style={{ backgroundImage: `url(${image})` }}
				/>
				<div className="px-2 py-1">
					<Text>{name}</Text>
				</div>
			</motion.div>
		</Reorder.Item>
	);
}

type Props = {
	scene: { image: string; name: string };
};
