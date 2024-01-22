import Image from "next/image";
import { Cinzel } from "next/font/google";
const cinzel = Cinzel({ subsets: ["latin"] });

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black animate-pulse text-green-400">
      <div className="flex-shrink p-10 w-full flex justify-center items-center">
        <div className="text-2xl sm:text-4xl">
          <span className={cinzel.className}>Loading...</span>
        </div>
      </div>
      <div className="flex-grow  flex flex-col items-center w-full relative">
        <Image
          src="/zherka-banner.jpg"
          alt="loading banner of Zherka"
          className="overflow-hidden"
          fill={true}
          objectFit="contain"
        />
      </div>
    </div>
  );
}
