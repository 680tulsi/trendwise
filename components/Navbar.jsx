"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-lg">
      
      <Link href="/" className="flex items-center gap-3">
        <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer hover:text-green-300 transition flex items-center gap-2">
          TrendWise
          <Image src="/logo.png" alt="TrendWise Logo" width={45} height={45} />
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium transition">
            Dashboard
          </button>
        </Link>

        <Link href="/admin">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition">
            Admin
          </button>
        </Link>
      </div>
    </nav>
  );
}
