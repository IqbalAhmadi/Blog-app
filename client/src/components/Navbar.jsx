import { useEffect, useState } from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
} from '@clerk/clerk-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const {getToken} = useAuth()

  // for test - delete later
  useEffect(() => {
    getToken().then((token) => console.log(token))
  })

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="Logo" w={32} h={32} />
        <span>Blogyy</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? 'X' : '☰'}
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 bg-[#e6e6ff] transition-all ease-in-out ${
            open ? '-right-0' : '-right-[100%]'
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <a href="">
            <button className="py-2 px-4 rounded-3xl bg-[#2020a4] text-white">
              Login
            </button>
          </a>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-[#2020a4] text-white">
              Login
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar
