import { WavyBackground } from '@/components/ui/wavy-background'
import Link from 'next/link'

export default function Page() {
  return (
    <WavyBackground className="flex flex-col items-center justify-center px-4 py-12 hero-pattern">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Celestial Zone
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-12">
          Unlock the mysteries of the universe with our AI horoscopes tailored just for you. Whether
          you&apos;re a starry-eyed Cancer or a fiery Leo, the cosmos is calling.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
            <span className="relative">Sign Up</span>
          </Link>
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
            <span className="relative">Log In</span>
          </Link>
        </div>
      </div>
    </WavyBackground>
  )
}
