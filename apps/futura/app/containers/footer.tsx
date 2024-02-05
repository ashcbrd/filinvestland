import React from "react";
import CookiePolicy from "../components/policy";
import { getDomainRedirection } from "../utils";
import { headers } from "next/headers";

async function getData() {
  const page = fetch(`${process.env.CMS_URL}/api/globals/futura-footer`, {
    cache: "no-store",
  });

  const req = await Promise.all([page]);

  return {
    page: (await req[0].json()) as any,
  };
}

const Footer = async () => {
  const headersList = headers();
  const req = (await getData()) as any;
  const sections: any = {
    page: req.page,
  };

  return (
    <div className="md:px-4 ">
      <footer>
        <div className="mx-auto rounded-t-[20px] bg-[#BF0B09] px-8 py-8 text-white">
          <div className="container mt-10 flex flex-wrap justify-between">
            {/* Existing content */}
            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <img
                src={sections?.page?.FuturaFilinvestLogo?.url || ""}
                alt="Logo"
              />
              <p className="mt-12 w-[193px] md:text-[18px]">
                {sections?.page?.description}
              </p>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <h2 className="mb-8 font-normal md:text-[18px]">Contact Us</h2>
              <p className="font-normal text-white md:text-[18px]">
                {sections?.page?.ContactUs?.address || ""}
              </p>
              <br />
              <p className="font-normal text-white md:text-[18px]">
                {sections?.page.ContactUs?.firstPhone || ""}
              </p>
              <br />
              <a
                href={`mailto:${sections?.page?.ContactUs?.emailAddress}`}
                className="font-normal text-white transition-all hover:underline md:text-[18px]"
              >
                {sections?.page?.ContactUs?.emailAddress || ""}
              </a>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <h2 className="mb-8 font-normal  md:text-[18px]">
                Connect with us
              </h2>
              <ul className="mt-4 flex">
                <li className="w-1/2 transition-all hover:-translate-y-1 md:w-auto">
                  <a href={sections?.page?.ConnectWithUs?.facebookLink}>
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.3386 26.7113V18.9537H21.9414L22.332 15.9295H19.3386V13.9989C19.3386 13.1236 19.5806 12.5271 20.8372 12.5271L22.4373 12.5265V9.82153C22.1606 9.78557 21.2107 9.70312 20.1052 9.70312C17.7967 9.70312 16.2162 11.1122 16.2162 13.6994V15.9295H13.6055V18.9537H16.2162V26.7113H19.3386Z"
                        fill="white"
                      />
                      <circle
                        cx="18"
                        cy="18.1797"
                        r="17.75"
                        stroke="#FF9B9B"
                        stroke-width="0.5"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-1/2 px-2 transition-all hover:-translate-y-1 md:w-auto">
                  <a href={sections?.page?.ConnectWithUs?.twitterLink}>
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18.1797"
                        r="17.75"
                        stroke="#FF9B9B"
                        stroke-width="0.5"
                      />
                      <path d="M11.5 26L25 11H23.5L9.5 26H11.5Z" fill="white" />
                      <path
                        d="M21 26L10 11H15L26 26H21Z"
                        fill="#BF0B09"
                        stroke="white"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-1/2  transition-all hover:-translate-y-1 md:w-auto">
                  <a href={sections?.page?.ConnectWithUs?.linkedInLink}>
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18.1797"
                        r="17.75"
                        stroke="#FF9B9B"
                        stroke-width="0.5"
                      />
                      <path
                        d="M10.2215 24.0641V16.0214C10.2215 15.4691 10.6693 15.0214 11.2215 15.0214H12.4707C13.023 15.0214 13.4707 15.4691 13.4707 16.0214V24.0641C13.4707 24.6164 13.023 25.0641 12.4707 25.0641H11.2215C10.6693 25.0641 10.2215 24.6164 10.2215 24.0641Z"
                        fill="white"
                      />
                      <path
                        d="M15.1691 24.0641V16.0214C15.1691 15.4691 15.6168 15.0214 16.1691 15.0214H17.4182C17.9705 15.0214 18.4182 15.4691 18.4182 16.0214V24.0641C18.4182 24.6164 17.9705 25.0641 17.4182 25.0641H16.1691C15.6168 25.0641 15.1691 24.6164 15.1691 24.0641Z"
                        fill="white"
                      />
                      <path
                        d="M21.9627 14.7998C20.1574 14.5875 18.9725 15.592 18.4831 16.2801C18.3846 16.4186 18.3443 16.5866 18.3443 16.7565V20.4858C18.3443 18.492 19.0089 17.3844 20.5597 17.4582C21.8002 17.5173 22.0612 18.8613 22.0365 19.5259L22.0972 24.0775C22.1045 24.6245 22.5501 25.0641 23.0971 25.0641H24.27C24.7991 25.0641 25.2366 24.6529 25.258 24.1243C25.3161 22.6825 25.353 20.5147 25.2118 19.009C24.9903 16.6459 24.4734 15.0952 21.9627 14.7998Z"
                        fill="white"
                      />
                      <circle
                        cx="11.8461"
                        cy="11.8461"
                        r="1.8461"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-1/2 px-2 transition-all hover:-translate-y-1 md:w-auto">
                  <a href={sections?.page?.ConnectWithUs?.youtubeLink}>
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18.1797"
                        r="17.75"
                        stroke="#FF9B9B"
                        stroke-width="0.5"
                      />
                      <path
                        d="M26.6497 14.0574C26.4538 13.3232 25.8796 12.7444 25.1514 12.5467C23.8211 12.1797 18.4998 12.1797 18.4998 12.1797C18.4998 12.1797 13.1787 12.1797 11.8484 12.5327C11.1342 12.7302 10.546 13.3233 10.3501 14.0574C10 15.3985 10 18.1797 10 18.1797C10 18.1797 10 20.9749 10.3501 22.302C10.5462 23.0361 11.1202 23.6149 11.8485 23.8126C13.1927 24.1797 18.5 24.1797 18.5 24.1797C18.5 24.1797 23.8211 24.1797 25.1514 23.8266C25.8797 23.629 26.4538 23.0502 26.6499 22.3161C26.9999 20.9749 26.9999 18.1938 26.9999 18.1938C26.9999 18.1938 27.0139 15.3985 26.6497 14.0574ZM16.8056 20.7491V15.6103L21.2306 18.1797L16.8056 20.7491Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4 w-full md:mb-0 md:w-1/5">
              <h2 className="mb-8 font-normal  md:text-[18px]">Useful links</h2>
              <ul className="mt-2 flex flex-wrap">
                {sections?.page?.UsefulLinks.length > 0
                  ? sections?.page?.UsefulLinks?.map(
                      ({ link }: { link: any }) => (
                        <li className="w-1/2 md:w-full">
                          <a
                            className="hover:opacity-70"
                            target="_blank"
                            href={getDomainRedirection(
                              headersList.get("host") as string,
                              link?.url
                            )}
                          >
                            {link?.label}
                          </a>
                        </li>
                      )
                    )
                  : "Loading..."}
              </ul>
            </div>

            {/* <div className="w-full md:w-1/5 mb-4 md:mb-0">
              <h2 className="text-[30px] font-bold mb-8 font-marcellus">
                {sections.page.RightSection[0].description1 ||
                  "Never miss out on a moment with us."}
              </h2>
              <p className="mt-4 text-[16px]">
                {sections.page.RightSection[0].description2 ||
                  "Sign up to get the latest on sales, new releases and more."}
              </p>
            </div> */}
          </div>
        </div>
      </footer>
      {/* Copyright notice */}
      <div className="mx-auto mb-10 rounded-b-[20px] bg-[#BF0B09] py-12 text-center text-sm text-white">
        {sections?.page?.copyrightText ||
          "Copyright © 2023 Futura by Filinvest"}
      </div>
      <CookiePolicy />
    </div>
  );
};

export default Footer;
