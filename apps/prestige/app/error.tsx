"use client";

import { useRouter } from "next/navigation";

import Button from "./components/general/button";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  return (
    <div
      className="fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center bg-white"
      style={{ zoom: 1.21 }}
    >
      <div className="flex h-max w-[600px] flex-col items-center gap-y-10">
        <div className="flex flex-col gap-y-6">
          <h1 className="text-center text-4xl font-bold">
            Oops! Something Went Wrong.
          </h1>
          <p className="mx-auto flex w-max items-center gap-x-2 rounded-full bg-red-200 !py-1 pl-2 pr-3 text-center text-sm text-red-500">
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
          <Button className="px-8 py-4" onClick={reset}>
            Try again
          </Button>
          <Button className="px-8 py-4" onClick={router.back}>
            Go Back
          </Button>
        </div>
        <p className="text-center text-sm">
          If the problem persists or you need further assistance, please reach
          out to our{" "}
          <a
            className="text-primary hover:cursor-pointer hover:underline"
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
