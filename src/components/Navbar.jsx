import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-end gap-x-10 mx-5 py-5'>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
    </div>
  )
}

export default Navbar