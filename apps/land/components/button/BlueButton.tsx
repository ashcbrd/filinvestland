import React from "react";
import Link from "next/link";
export default function BlueButton({ text, href = "/contact-us" }: any) {
  return (
    <Link
      href={`${href}`}
      className="flex w-full items-center justify-center bg-[#0F59ED] px-12 py-6 text-[16px] text-white"
    >
      {text}
    </Link>
  );
}
