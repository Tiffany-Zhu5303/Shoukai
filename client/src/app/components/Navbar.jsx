"use client";
import Link from "next/link";

const Navbar = () => {
    return (
        <div>
            <div className="w-full h-10vh fixed top-0 bg-blush flex justify-between items-center px-8 py-4 text-linen text-xl">
                <Link href='/' className="font-bold hover:text-smoky-black">Shoukai</Link>
                <div className="flex space-x-8 text-linen">
                    <Link href="/discover" className="hover:text-smoky-black">Discover</Link>
                    {/* <Link href="/favorites" className="hover:text-smoky-black">Favorites</Link>
                    <Link href="/history" className="hover:text-smoky-black">History</Link> */}
                    <Link href="/auth/signin" className="hover:text-smoky-black">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;