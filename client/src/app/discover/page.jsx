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
                    <div className="relative inline-block">
                        <Link href="/anime" className="text-center">
                            <div className="absolute inset-0 bg-blush rounded-lg shadow-md" />
                            <motion.div
                                whileHover={{ rotate: -25 }}
                                transition={{ duration: 0.5 }}
                                className="flex justify-center items-center origin-bottom-left"
                            >
                                <Image 
                                className="rounded-lg w-[300px] h-[400px] z-10" 
                                width={600}
                                height={600}
                                src="/DemonSlayerPoster.jpg" 
                                alt="Demon Slayer Poster" />
                            </motion.div>
                        </Link>
                    </div>
                    <p className="text-center text-2xl pt-8">Anime</p>
                </div>
                <div className="flex flex-col justify-center items-center hover:font-bold">
                    <div className="relative inline-block">
                        <Link href="/character" className="text-center">
                            <div className="absolute inset-0 bg-blush rounded-lg shadow-md" />
                            <motion.div
                                whileHover={{ rotate: 25 }}
                                transition={{ duration: 0.5 }}
                                className="flex justify-center items-center origin-bottom-right">
                                <Image 
                                className="rounded-lg w-[300px] h-[400px] z-10" 
                                width={600}
                                height={600}
                                src="/Nezuko.jpg" 
                                alt="Nezuko" />
                            </motion.div>
                        </Link>
                    </div>
                    <p className="text-center text-2xl pt-8">Character</p>
                </div>
            </div>
        </div>
    );
}