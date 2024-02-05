"use client";

import { useRouter } from "next/navigation";

import Button from "./components/button";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-[99999] bg-white">
      <div className="flex flex-col w-[600px] h-max items-center gap-y-10">
        <div className="flex flex-col gap-y-6">
          <h1 className="font-bold text-4xl text-center">
            Oops! Something Went Wrong.
          </h1>
          <p className="flex gap-x-2 items-center text-center text-red-500 text-sm bg-red-200 rounded-full w-max mx-auto pl-2 pr-3 py-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13ZM13 17H11V15H13V17Z"
                fill="#DA2626"
              />
            </svg>
            {error.message}
          </p>
        </div>
        <div className="flex items-center gap-x-6">
          <Button className="py-4 px-8" onClick={reset}>
            Try again
          </Button>
          <Button className="py-4 px-8" onClick={router.back}>
            Go Back
          </Button>
        </div>
        <p className="text-center text-sm">
          If the problem persists or you need further assistance, please reach
          out to our{" "}
          <a
            className="text-red-500 hover:cursor-pointer hover:underline"
            href="https://beta.filinvestland.com/contact-us"
            target="_blank"
          >
            Support Team
          </a>
          . Our team is here to help you resolve this issue as quickly as
          possible.
        </p>
      </div>
    </div>
  );
};

export default error;
