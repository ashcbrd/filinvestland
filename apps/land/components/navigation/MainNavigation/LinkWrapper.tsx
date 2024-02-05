import React, { Dispatch, Fragment, ReactNode, useRef, useState } from "react";
import { Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import { combineClass } from "@/helpers/combineClass";
import ChevronDown from "@/components/svg/ChevronDown";
import { useRouter } from "next/navigation";

type T_Flyout_Menu = "" | "full" | "single" | "link";

type T_Sub_Menus = {
  title: string;
  subTitle?: string;
  link: string;
  newTab: boolean;
};

interface I_Props {
  text: string;
  isLink?: boolean;
  link?: string;
  subMenus?: T_Sub_Menus[];
  setCurrentMenuIndex: Dispatch<number | null>;
  setFlyoutMenu: Dispatch<T_Flyout_Menu>;
  menuIndex: number;
  fullComponent?: ReactNode;
  currentMenuIndex: number | null;
  isHovering: boolean;
  setisHovering: Dispatch<boolean>;
  flyoutMenu: string;
  target?: string;
}

const LinkWrapper = ({
  text,
  link,
  isLink,
  subMenus,
  setCurrentMenuIndex,
  setFlyoutMenu,
  menuIndex,
  fullComponent,
  currentMenuIndex,
  isHovering,
  setisHovering,
  flyoutMenu,
  target,
}: I_Props) => {
  const popoverRef = useRef(null);
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const setMenuType = (type: T_Flyout_Menu) => {
    setFlyoutMenu(type);
  };
  const clickPopover = () => {
    // @ts-expect-error
    popoverRef.current?.click();
  };

  return (
    <>
      {!fullComponent && isLink && link && !subMenus && (
        <>
          <Link
            href={link}
            target={target}
            style={{
              opacity:
                isHovering && currentMenuIndex == menuIndex
                  ? "1"
                  : isHovering
                  ? "0.7"
                  : "1",
            }}
            className="cursor-pointer whitespace-nowrap text-[2.5vh] transition duration-500 2lg:text-[1.8vh] xl:text-[2vh]"
            onClick={() => {
              setMenuType("link");
              setCurrentMenuIndex(menuIndex);
            }}
          >
            {text}
          </Link>
        </>
      )}
      {!isLink && !link && !fullComponent && subMenus && (
        <>
          <Popover className="relative">
            {({ close }) => (
              <>
                <Popover.Button
                  className={combineClass(
                    "group inline-flex h-3 whitespace-nowrap border-none text-white ring-0 transition duration-500"
                  )}
                  ref={popoverRef}
                  onMouseEnter={() => {
                    setMenuType("single");
                    setCurrentMenuIndex(menuIndex);
                    clickPopover();
                  }}
                  onClick={() => {
                    setClicked((prev) => !prev);
                  }}
                  style={{
                    opacity:
                      isHovering && currentMenuIndex == menuIndex
                        ? "1"
                        : isHovering
                        ? "0.7"
                        : "1",
                  }}
                  onMouseLeave={() => {
                    setisHovering(false);
                    clicked && clickPopover();
                    setClicked(false);
                  }}
                >
                  <span className="flex items-center gap-2 text-[2.5vh] 2lg:text-[1.8vh] xl:text-[2vh]">
                    {text}
                    {currentMenuIndex === menuIndex ? (
                      <ChevronDown classes="w-[10px] h-[10px] rotate-180 transition-transform" />
                    ) : (
                      <ChevronDown classes="w-[10px] h-[10px] transition-transform" />
                    )}
                  </span>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    className="absolute z-10 mt-1"
                    onMouseLeave={() => clickPopover()}
                    onMouseEnter={() => clickPopover()}
                  >
                    <div className="overflow-hidden shadow-lg">
                      <div className="gap-6 bg-royal-dark-blue sm:gap-8">
                        {subMenus.map((item, index) => (
                          <Link
                            href={`${item.link}`}
                            target={item.newTab ? "_blank" : "_self"}
                            key={index}
                            onClick={() => {
                              setisHovering(false);
                              setClicked(false);
                              close();
                            }}
                            className="flex items-start transition duration-150 ease-in-out hover:bg-oxford-blue"
                          >
                            {/* <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" /> */}
                            <div className="w-[290px] p-4">
                              <p className="whitespace-nowrap text-left text-lg font-medium text-white">
                                {item.title}
                              </p>
                              <p className="mt-1 text-left text-sm text-white opacity-50">
                                {item.subTitle}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </>
      )}
      {fullComponent && (
        <>
          <span
            onClick={() => {
              if (link) {
                router.push(link ? link : "/");
              }
              flyoutMenu == "full" ? setFlyoutMenu("") : setFlyoutMenu("full");
              flyoutMenu == "full"
                ? setCurrentMenuIndex(-1)
                : setCurrentMenuIndex(menuIndex);
            }}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[2.5vh] transition duration-500 2lg:text-[1.8vh] 2xl:text-[2vh]"
            style={{
              opacity:
                isHovering && currentMenuIndex == menuIndex
                  ? "1"
                  : isHovering
                  ? "0.7"
                  : "1",
            }}
            onMouseEnter={() => {
              setMenuType("full");
              setCurrentMenuIndex(menuIndex);
              setisHovering(true);
            }}
            onMouseLeave={() => {
              setisHovering(false);
            }}
          >
            {text}
            {currentMenuIndex === menuIndex ? (
              <ChevronDown classes="w-[10px] h-[10px] rotate-180 transition-transform" />
            ) : (
              <ChevronDown classes="w-[10px] h-[10px] transition-transform" />
            )}
          </span>
        </>
      )}
    </>
  );
};

export default LinkWrapper;
