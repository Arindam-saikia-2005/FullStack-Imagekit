"use client";
import { GoHome } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";
import { signOut} from "next-auth/react";

function Navbar() {

  return (
    <nav className="w-full flex justify-between px-10 py-4 bg-gray-900">
      <div className="flex gap-2">
        <p className="text-xl font-semibold">
          <a href="/">Video with AI</a>
        </p>
        <span>
          <GoHome size={25} />
        </span>
      </div>
      <div className="flex space-x-5">
        <Link href="/upload">
          <span>
            <IoCloudUploadOutline size={25} />
          </span>
        </Link>
        <span onClick={() => signOut()}>
          <IoLogOutOutline size={25} />
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
