"use client"

import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {

    return <button className="bg-black p-4 rounded-md" onClick={() => signIn("Credentials", { callbackUrl: "/" })}>Sign In</button>
}

export const LogoutButton = () => {
    return <button className="text-white bg-green-600 cursor-pointer p-2 rounded-md" onClick={() => signOut({callbackUrl: 'http://localhost:3000'})}>Sign Out</button>
}