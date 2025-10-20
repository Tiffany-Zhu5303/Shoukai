import { motion } from "motion/react";
import { PiSpinnerBold } from 'react-icons/pi';

export default function LoadingSpinner() {
    return (
        <div className="w-full h-full p-4 flex justify-center items-center">
            <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            >
                <PiSpinnerBold size='3em' className="text-rose-red"/>
            </motion.div>
        </div>
    );
};