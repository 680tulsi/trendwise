"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-lg">
      
      <Link href="/" className="flex items-center gap-3">
        <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer hover:text-green-300 transition flex items-center gap-2">
          TrendWise
          <Image src="/logo.png" alt="Logo" width={45} height={45} />
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <p className="hidden md:block font-medium">Welcome, {session.user.name}</p>
            
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-white shadow"
              />
            )}

            <Link href="/dashboard">
              <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium transition">
                Dashboard
              </button>
            </Link>

            <button
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
            onClick={() => signIn("google")}
          >
            Sign In with Google
          </button>
        )}
      </div>
    </nav>
  );
}
