import Link from "next/link";

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-start ml-32 pt-32'>
      <p className="text-7xl leading-[1.5]">Find something new <br /> to binge</p>
      <div className="flex space-x-8">
        <Link 
        href="/discover">
          <button className="px-8 py-4 mt-12 text-2xl">
            Let&apos;s Go!
          </button>
        </Link>
      </div>
    </div>
  );
}
