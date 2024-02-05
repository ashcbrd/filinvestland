import Link from "next/link";
import React, { useEffect } from "react";
import CookiePolicy from "../components/policy";
import { headers } from "next/headers";
import { getDomainRedirection } from "../utils";

const rawData = [
  {
    id: "first-column",
    data: [
      {
        id: "home",
        label: "Home",
        link: "/",
      },
      {
        id: "heritage",
        label: "Heritage",
        link: "/about-us",
      },
      {
        id: "projects",
        label: "Projects",
        link: "/projects",
      },
      {
        id: "virtual-tours",
        label: "Virtual Tours",
        link: "/virtual",
      },
      {
        id: "news-and-blog",
        label: "News & Blog",
        link: "/news",
      },
    ],
  },
  {
    id: "second-column",
    data: [
      // {
      //   id: "gallery",
      //   label: "Gallery",
      //   link: "/",
      // },
      {
        id: "contact",
        label: "Contact",
        link: `${process.env.LAND_URL}/contact-us`,
      },
      {
        id: "privacy-policy",
        label: "Privacy Policy",
        link: `${process.env.LAND_URL}`,
      },
      {
        id: "careers",
        label: "Careers",
        link: `${process.env.LAND_URL}/careers`,
      },
      {
        id: "terms-of-use",
        label: "Terms of Use",
        link: `${process.env.LAND_URL}`,
      },
    ],
  },
  {
    id: "third-column",
    data: [
      {
        id: "facebook",
        label: "Facebook",
        link: "https://www.facebook.com/PrestigeByFilinvest/",
      },
      {
        id: "youtube",
        label: "Youtube",
        link: "https://www.youtube.com/channel/UCCEVPeuwSwk19cX7kbH1m5A",
      },
    ],
  },
];

async function getData() {
  const footerPrestigeQuery = await fetch(
    `${process.env.CMS_URL}/api/globals/prestige-footer`,
    { cache: "no-cache" }
  );

  return await footerPrestigeQuery.json();
}

const FooterNew = async () => {
  const headersList = headers();
  const data = await getData();

  return (
    <footer className="h-auto w-full bg-[#160B01] text-white">
      <div className="h-auto w-full px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
        <div className="mx-auto h-auto w-full max-w-[1650px]">
          {/* xl:grid-cols-[1fr,500px] 2xl:grid-cols-[1fr,600px] */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-base sm:grid-cols-12 lg:text-lg">
              {data?.usefulLinks?.map((parent: any) => (
                <ul key={parent.id} className="space-y-4 sm:col-span-4">
                  {parent.UsefulLink.map((child: any) => {
                    const hasLink =
                      child.url.indexOf("http://") == 0 ||
                      child.url.indexOf("https://") == 0;
                    let href = child.url;

                    if (hasLink) {
                      href = getDomainRedirection(
                        headersList.get("host") as string,
                        child.url
                      );
                    }

                    return (
                      <li
                        key={child.id}
                        className="block text-center sm:text-left"
                      >
                        <Link
                          target={hasLink ? "_blank" : ""}
                          id={child.id}
                          href={href}
                          rel={hasLink ? "noopener noreferrer" : ""}
                          className="inline-flex p-2 text-center hover:text-primary sm:text-left"
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>

            {/* <div className="space-y-4">
              <a className="block text-center sm:text-left">Stay Updated</a>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Email"
                  className="font-nunito h-14 w-full border-b-2 border-[#BC5D07] bg-transparent text-xl text-[#967E67] outline-none transition-all duration-200 ease-in-out placeholder:text-[#967E67] hover:border-[#F4EBD0] focus:border-[#F4EBD0]"
                />
                <div className="pointer-events-none absolute bottom-0 right-3 top-0 flex items-center">
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M16.5597 7.17617L2.23573 0.664181C1.13543 0.131037 0.0352476 1.54471 0.822454 2.48006L4.63597 7.24474L5.14584 7.8858C5.22976 7.98961 5.27554 8.11906 5.27554 8.25255C5.27554 8.38604 5.22976 8.51549 5.14584 8.61930C5.02026 8.78393 1.10080 13.6758 0.822418 14.0251C0.656235 14.2327 0.564865 14.4903 0.563054 14.7562C0.561244 15.0221 0.649100 15.2809 0.812441 15.4908C0.975782 15.7006 1.20508 15.8493 1.46331 15.9129C1.72155 15.9764 1.99366 15.9510 2.23573 15.8409L16.5597 9.32893C16.7645 9.23334 16.9378 9.08128 17.0593 8.89062C17.1807 8.69995 17.2452 8.47860 17.2452 8.25255C17.2452 8.02651 17.1807 7.80515 17.0593 7.61449C16.9378 7.42382 16.7645 7.27176 16.5597 7.17617Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="min-h-[7rem] w-full px-8 py-8 md:px-12">
        <div className="mx-auto flex h-full w-full max-w-[1650px] flex-col items-center justify-between gap-4 sm:flex-row">
          <img
            src={data?.PrestigeFilinvestLogo?.url ?? `/assets/images/logo.png`}
            alt="Logo"
            className="h-[50px]"
          />
          <div className="">{data?.copyrightText}</div>
        </div>
      </div>
      <CookiePolicy />
    </footer>
  );
};

export default FooterNew;
