import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#3D1F00]">
      <footer className="bg-[#3A1B00] py-8 text-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            {/* Existing content */}
            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <img src="/assets/images/logo.png" alt="Logo" />
              <p className="mt-12 w-[193px] text-[18px]">
                Filinvest offers quality horizontal home projects perfect for
                you and your family.
              </p>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <h2 className="mb-8 text-[18px] font-normal text-[#D4721B]">
                Contact Us
              </h2>
              <p className="text-[18px] font-normal text-white">
                79 EDSA, Mandaluyong City, 1550 Philippines
              </p>
              <br />
              <p className="text-[18px] font-normal text-white">
                (63 2) 7 918 8188
              </p>
              <br />
              <p className="text-[18px] font-normal text-white">
                marketing@aspirebyfilinvest.com
              </p>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <h2 className="mb-8 text-[18px] font-normal text-[#D4721B]">
                Connect with us
              </h2>
              <ul className="mt-4 flex flex-wrap">
                <li className="w-1/2 md:w-auto">
                  <a href="#home">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.3395 26.5316V18.774H21.9424L22.3329 15.7498H19.3395V13.8193C19.3395 12.944 19.5816 12.3474 20.8382 12.3474L22.4383 12.3468V9.64184C22.1616 9.60588 21.2117 9.52344 20.1062 9.52344C17.7977 9.52344 16.2172 10.9325 16.2172 13.5197V15.7498H13.6064V18.774H16.2172V26.5316H19.3395Z"
                        fill="white"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="17.75"
                        stroke="#FAB300"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-1/2 px-2 md:w-auto">
                  <a href="#about">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.638 12.7908C25.0619 13.0435 24.4481 13.211 23.8082 13.2923C24.4665 12.8992 24.969 12.2815 25.2052 11.537C24.5914 11.903 23.9137 12.1615 23.1915 12.3057C22.6086 11.6851 21.778 11.3008 20.8718 11.3008C19.1136 11.3008 17.6981 12.7278 17.6981 14.4773C17.6981 14.729 17.7194 14.9711 17.7717 15.2015C15.1315 15.0727 12.7954 13.8073 11.226 11.8797C10.952 12.3551 10.7913 12.8992 10.7913 13.4849C10.7913 14.5848 11.3577 15.5597 12.2019 16.1241C11.6917 16.1145 11.1911 15.9663 10.7671 15.733C10.7671 15.7427 10.7671 15.7553 10.7671 15.7679C10.7671 17.3111 11.8679 18.593 13.3114 18.8882C13.0529 18.9589 12.7712 18.9928 12.4788 18.9928C12.2755 18.9928 12.0702 18.9812 11.8776 18.9386C12.289 20.1962 13.4566 21.1208 14.845 21.1508C13.7645 21.996 12.3926 22.5053 10.9075 22.5053C10.647 22.5053 10.3972 22.4937 10.1475 22.4617C11.5542 23.3689 13.2214 23.8868 15.0192 23.8868C20.863 23.8868 24.058 19.0461 24.058 14.8501C24.058 14.7097 24.0531 14.5741 24.0464 14.4396C24.6766 13.9923 25.2062 13.4336 25.638 12.7908Z"
                        fill="white"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="17.75"
                        stroke="#FAB300"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-1/2  md:w-auto">
                  <a href="#services">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="17.75"
                        stroke="#FAB300"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M22.0969 10.3906H14.292C12.1459 10.3906 10.3896 12.1469 10.3896 14.293V22.0982C10.3896 24.2438 12.1459 26.0006 14.292 26.0006H22.0969C24.243 26.0006 25.9993 24.2438 25.9993 22.0982V14.293C25.9993 12.1469 24.243 10.3906 22.0969 10.3906ZM24.6984 22.0982C24.6984 23.5323 23.5318 24.6997 22.0969 24.6997H14.292C12.8577 24.6997 11.6905 23.5323 11.6905 22.0982V14.293C11.6905 12.8585 12.8577 11.6915 14.292 11.6915H22.0969C23.5318 11.6915 24.6984 12.8585 24.6984 14.293V22.0982Z"
                        fill="white"
                      />
                      <path
                        d="M22.422 14.9435C22.9608 14.9435 23.3976 14.5067 23.3976 13.9679C23.3976 13.429 22.9608 12.9922 22.422 12.9922C21.8831 12.9922 21.4463 13.429 21.4463 13.9679C21.4463 14.5067 21.8831 14.9435 22.422 14.9435Z"
                        fill="white"
                      />
                      <path
                        d="M18.1937 14.293C16.0379 14.293 14.291 16.04 14.291 18.1957C14.291 20.3505 16.0379 22.0988 18.1937 22.0988C20.349 22.0988 22.0964 20.3505 22.0964 18.1957C22.0964 16.04 20.349 14.293 18.1937 14.293ZM18.1937 20.7978C16.7569 20.7978 15.592 19.6329 15.592 18.1957C15.592 16.7585 16.7569 15.5939 18.1937 15.5939C19.6305 15.5939 20.7955 16.7585 20.7955 18.1957C20.7955 19.6329 19.6305 20.7978 18.1937 20.7978Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-1/2 px-2 md:w-auto">
                  <a href="#contact">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="17.75"
                        stroke="#FAB300"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M26.6497 13.8777C26.4538 13.1435 25.8796 12.5647 25.1514 12.367C23.8211 12 18.4998 12 18.4998 12C18.4998 12 13.1787 12 11.8484 12.3531C11.1342 12.5506 10.546 13.1436 10.3501 13.8777C10 15.2188 10 18 10 18C10 18 10 20.7952 10.3501 22.1223C10.5462 22.8564 11.1202 23.4352 11.8485 23.6329C13.1927 24 18.5 24 18.5 24C18.5 24 23.8211 24 25.1514 23.6469C25.8797 23.4493 26.4538 22.8705 26.6499 22.1364C26.9999 20.7952 26.9999 18.0141 26.9999 18.0141C26.9999 18.0141 27.0139 15.2188 26.6497 13.8777ZM16.8056 20.5694V15.4306L21.2306 18L16.8056 20.5694Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <h2 className="mb-8 text-[18px] font-normal text-[#D4721B]">
                Useful links
              </h2>
              <ul className="mt-2 flex flex-wrap">
                <li className="w-1/2 md:w-full">
                  <a href="#facebook">Terms of Use</a>
                </li>
                <li className="w-1/2 md:w-full">
                  <a href="#twitter">Privacy Policy</a>
                </li>
                <li className="w-1/2 md:w-full">
                  <a href="#instagram">Contact Support</a>
                </li>
                <li className="w-1/2 md:w-full">
                  <a href="#linkedin">FAQs</a>
                </li>
              </ul>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <h2 className="font-marcellus mb-8 text-[30px] font-bold">
                Never miss out on a moment with us.
              </h2>
              <p className="mt-4 text-[16px]">
                Sign up to get the latest on sales, new releases and more.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright notice */}
      <div className="bg-[#3D1F00]  py-12  text-center text-sm text-white">
        Copyright © 2023 Prestige by Filinvest
      </div>
    </div>
  );
};

export default Footer;
