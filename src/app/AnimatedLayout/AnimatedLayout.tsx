import { AnimatePresence } from "framer-motion";
import { useOutlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export function AnimatedLayout() {
	const currentOutlet = useOutlet();
	const { key } = useLocation();

	return (
		<div className="flex-1 overflow-hidden">
			<AnimatePresence mode="popLayout">
				<motion.div
					key={key}
					transition={{ duration: 0.3 }}
					animate={{ opacity: 1, transform: "translateY(0rem)" }}
					initial={{ opacity: 0, transform: "translateY(-1rem)" }}
					exit={{ opacity: 0, transform: "translateY(-1rem)" }}
					className="w-full h-full flex align-items-center justify-content-center overflow-hidden"
				>
					{currentOutlet}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
