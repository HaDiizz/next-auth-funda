import React from 'react'
import Image from 'next/image'

const User = ({ session }) => {
  console.log(session);
  return (
    <div>
        <h1>Logged In</h1>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
        <Image width={"300"} height={"300"} alt='profile' src={session.user.image} />
    </div>
  )
}

export default User