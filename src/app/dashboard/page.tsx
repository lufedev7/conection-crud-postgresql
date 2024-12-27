'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
export interface User {
  email: string
  accessToken: string
  iat: number
  exp: number
  jti: string
}

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const dataSession = session?.user as User

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  const getCats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dataSession.accessToken}`
      }
    })
    const data = await res.json()
    console.log(data)
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button onClick={getCats} className='btn btn-primary'>
        Get Cats
      </button>
    </div>
  )
}

export default DashboardPage
