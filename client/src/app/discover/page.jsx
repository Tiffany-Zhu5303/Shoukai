'use client';
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function DiscoverPage() {
    return (
        <div className="flex flex-col justify-center items-center p-20">
            <p className="text-5xl">Discover By</p>
            <div className="p-12 flex space-x-32">
                <div className="flex flex-col justify-center items-center hover:font-bold">
                    <Link href="/anime" className="text-center">
                        <motion.div
                            whileHover={{ rotate: -25 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center items-center pb-8"
                        >
                            <Image 
                            className="rounded-lg w-[300px] h-[400px] origin-top-left" 
                            width={600}
                            height={600}
                            src="/DemonSlayerPoster.jpg" 
                            alt="Demon Slayer Poster" />
                        </motion.div>
                    </Link>
                    <p className="text-center text-2xl pt-4">Anime</p>
                </div>
                <div className="flex flex-col justify-center items-center hover:font-bold">
                    <Link href="/character" className="text-center">
                        <motion.div
                            whileHover={{ rotate: 25 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center items-center pb-8"
                        >
                            <Image 
                            className="rounded-lg w-[300px] h-[400px] origin-bottom-left" 
                            width={600}
                            height={600}
                            src="/Nezuko.jpg" 
                            alt="Nezuko" />
                        </motion.div>
                    </Link>
                    <p className="text-center text-2xl pt-4">Character</p>
                </div>
            </div>
        </div>
    );
}