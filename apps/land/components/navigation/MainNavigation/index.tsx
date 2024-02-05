"use client";
import React, { useState, Fragment, useEffect, useMemo } from "react";
import { combineClass } from "@/helpers/combineClass";
import MainLogo from "@/components/svg/MainLogo";
import LinkWrapper from "./LinkWrapper";
import { Popover, Transition } from "@headlessui/react";
import HamburgerMenu from "@/components/svg/HamburgerMenu";
import Link from "next/link";
import Accordion from "./Accordion";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import ROUTES from "@/helpers/routes";
import useGetNavigation from "./hooks/useGetNavigation";
import formatNavigations from "./helpers/formatNavigations";
import { menus as staticMenus } from "./menus";
import Close from "@/components/svg/Close";

type T_Flyout_Menu = "" | "full" | "single" | "link";

const MainNavigation = ({ className }: { className?: string }) => {
  const { data: navigationRes, isLoading } = useGetNavigation();
  const pathname = usePathname();
  const params = useParams();
  const [flyoutMenu, setFlyoutMenu] = useState<T_Flyout_Menu>("");
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number | null>(null);
  const [scroll] = useState(0);
  const [showFixedNavigation, setShowFixedNavigation] = useState(false);
  const [wasScroll, setWasScroll] = useState(false);
  const [menus, setMenus] = useState(staticMenus);
  const [isHovering, setisHovering] = useState(false);
  const searchParams = useSearchParams();

  const onWindowScroll = () => {
    let scroll = window.scrollY;
    if (scroll > 160) {
      setWasScroll(true);
    } else {
      setWasScroll(false);
    }
  };
  useEffect(() => {
    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll);
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  useEffect(() => {
    setFlyoutMenu("");
    setCurrentMenuIndex(null);
    setWasScroll(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (navigationRes) {
      setMenus(formatNavigations(navigationRes));
    }
    console.log(navigationRes, "nav");
  }, [navigationRes]);

  useEffect(() => {
    if (showFixedNavigation) {
      setWasScroll(true);
    }
  }, [showFixedNavigation]);

  useEffect(() => {
    if (scroll === 0) {
      setWasScroll(false);
      setShowFixedNavigation(false);
    }
  }, [scroll]);

  const accordionRefs = useMemo(() => {
    return (
      menus.map(() => {
        return React.createRef<HTMLButtonElement>();
      }) ?? []
    );
  }, [menus]);

  const renderNavigation = () => {
    return (
      <nav
        className={
          "fixed top-0 z-[200] w-full transition-all " +
          (wasScroll
            ? "bg-royal-dark-blue bg-opacity-95"
            : className
            ? className
            : "")
        }
        // className={` top-0 z-[200] w-full ${
        //   wasScroll && flyoutMenu !== "full"
        //     ? "bg-royal-dark-blue bg-opacity-95"
        //     : className
        //     ? className
        //     : "bg-transparent bg-opacity-95"
        // } max-h-screen`}
      >
        <div className="hiddenNav">
          <div
            className={combineClass(
              flyoutMenu === "full" ? "bg-royal-dark-blue bg-opacity-95" : "",
              "delay-50 transition"
            )}
            onMouseLeave={() => {
              setFlyoutMenu("");
              setCurrentMenuIndex(null);
            }}
          >
            <div className="flex items-center px-9 py-6 font-bold text-white lg:py-8 lg:pr-16">
              <div className="">
                <Link href="/">
                  <MainLogo logo={navigationRes?.headerLogo} />
                </Link>
              </div>
              <div className="flex-1">
                <ul className="my-4 flex list-none items-center justify-center gap-7 text-center 2lg:gap-6">
                  {menus.map((menu, index) => {
                    const wrapperProps = {
                      ...menu,
                      setCurrentMenuIndex: setCurrentMenuIndex,
                      setFlyoutMenu: setFlyoutMenu,
                      flyoutMenu: flyoutMenu,
                      menuIndex: index,
                      currentMenuIndex: currentMenuIndex,
                      isHovering: isHovering,
                      setisHovering: setisHovering,
                    };
                    return (
                      <li key={index}>
                        <LinkWrapper {...wrapperProps} />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="relative h-[7.5vh] w-[11vw]">
                <Link
                  href={{
                    pathname: navigationRes
                      ? `${navigationRes?.callToActionLink}`
                      : "/",
                    query: {
                      ...(params?.projectSlug && {
                        project: params?.projectSlug,
                      }),
                    },
                  }}
                >
                  <button
                    className="delay-50 h-[7.5vh] w-[11vw] bg-blue text-[2vh] text-white transition hover:opacity-90 focus:bg-dark-cornflower-blue disabled:bg-royal-dark-blue disabled:text-wild-blue-yonder"
                    disabled={isLoading}
                  >
                    {navigationRes
                      ? navigationRes.callToActionText
                      : "Loading..."}
                  </button>
                </Link>
                {/* Not equal to Sellers and Buyers - Small Dropdown */}
                {flyoutMenu &&
                  currentMenuIndex !== 3 &&
                  currentMenuIndex !== 4 && (
                    <div
                      className="absolute -bottom-16 right-0 cursor-pointer"
                      onClick={() => {
                        setFlyoutMenu("");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  )}
              </div>
            </div>
            <div
              className={`px-9 pb-10 ${
                flyoutMenu === "full" ? "block" : "hidden"
              }`}
            >
              {menus[currentMenuIndex as number]?.fullComponent}
            </div>
          </div>
          {flyoutMenu === "full" && (
            <div
              onClick={() => {
                setFlyoutMenu("");
                setCurrentMenuIndex(null);
              }}
              className="h-screen w-full bg-transparent"
            ></div>
          )}
        </div>
        <Popover className="showMini relative z-[200]">
          {({ open, close }) => (
            <>
              <div
                className={`relative z-50  ${
                  open ? "bg-royal-dark-blue" : "bg-transparent"
                } transition duration-200 ease-out`}
              >
                <div className="flex items-center gap-14 py-5 pl-6 pr-4 md:pl-4 md:pr-4">
                  <div className="flex-1">
                    <Link href={`${ROUTES.HOME.url ?? '/'}`}>
                      <MainLogo logo={navigationRes?.headerLogo} />
                    </Link>
                  </div>
                  <Popover.Button className="delay-50 focus:ring-none flex-none p-3 transition focus:bg-oxford-blue focus:outline-none">
                    {open ? <Close /> : <HamburgerMenu />}
                  </Popover.Button>
                </div>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel className="absolute inset-x-0 z-50 transform shadow-lg">
                  <div className="max-h-[104vh] overflow-scroll bg-royal-dark-blue">
                    {menus.map((item, index) => {
                      if (item.subMenus) {
                        return (
                          <Accordion
                            key={index}
                            accordionRefs={accordionRefs}
                            index={index}
                            title={item.text}
                          >
                            <div className="flex flex-col gap-4 divide-y divide-solid divide-oxford-blue">
                              {item.subMenus.map(
                                (subMenu: any, subMenuIndex) => (
                                  <Link
                                    key={subMenuIndex}
                                    href={`${subMenu.link ?? "/"}`}
                                    target={
                                      subMenu?.target
                                        ? subMenu?.target
                                        : item.newTab
                                        ? "_blank"
                                        : "_self"
                                    }
                                    className="pt-4"
                                    onClick={() => close()}
                                  >
                                    <div className="mb-2 text-lg text-white">
                                      {subMenu.title}
                                    </div>
                                    <div className="text-sm text-white opacity-50">
                                      {subMenu.subTitle}
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>
                          </Accordion>
                        );
                      } else {
                        return (
                          <Link
                            key={index}
                            href={`${item.link ?? "/"}`}
                            target={item.newTab ? "_blank" : "_self"}
                            onClick={() => close()}
                            className="flex w-full px-4 py-4 text-lg font-medium text-white hover:bg-oxford-blue focus:bg-oxford-blue"
                          >
                            {item.text}
                          </Link>
                        );
                      }
                    })}
                    <Link
                      href={{
                        pathname: navigationRes
                          ? `${navigationRes?.callToActionLink}`
                          : "/",
                        query: {
                          ...(params?.projectSlug && {
                            project: params?.projectSlug,
                          }),
                        },
                      }}
                      onClick={() => close()}
                      className="flex w-full px-4 py-4 text-lg font-medium text-white hover:bg-oxford-blue focus:bg-oxford-blue"
                    >
                      {navigationRes
                        ? navigationRes.callToActionText
                        : "Loading..."}
                    </Link>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </nav>
    );
  };

  return (
    <>
      <div className={"fixed z-[200] block max-h-screen w-full  "}>
        {renderNavigation()}
      </div>
      <Transition
        show={showFixedNavigation}
        as={Fragment}
        enter="transition ease duration-500 transform"
        enterFrom="opacity-0 -translate-y-12"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-12"
      >
        {renderNavigation()}
      </Transition>
    </>
  );
};

export default MainNavigation;
