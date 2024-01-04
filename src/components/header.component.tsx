"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  console.log("user:", user);

  return (
    <header className="h-20 bg-transparent">
      <nav className="h-full flex justify-end container items-center p-4">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className="text-ct-dark-600">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/api/auth/signin" className="text-ct-dark-600">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-ct-dark-600">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
