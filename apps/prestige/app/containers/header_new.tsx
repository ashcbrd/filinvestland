"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import styled from "styled-components";
import { MenuBtn } from "./components/MenuBtn";

const HeaderNew = () => {
  const pathname = usePathname();

  async function getData() {
    const page = fetch(
      `${process.env.CMS_URL}/api/globals/prestige-navigation`,
      {
        cache: "no-store",
      }
    );

    const req = await Promise.all([page]);

    return {
      page: (await req[0].json()) as any,
    };
  }

  const [showHeader, setShowHeader] = useState(false);
  const [headerAnimation, setHeaderAnimation] = useState("opacity-0");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [data, setData] = useState([]);
  const [headerColor, setHeaderColor] = useState(
    "h-[140px] sm:h-[170px] bg-gradient-to-b from-[rgba(0, 0, 0, 0.6)] to-transparent duration-300"
  );
  ``;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        setData(data?.page?.mainMenu);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const targetSectionPosition = 100;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= targetSectionPosition) {
        setHeaderColor(
          "h-[126px] bg-[#130900] bg-opacity-80 transition duration-300"
        );
      } else {
        setHeaderColor(
          "h-[140px] sm:h-[170px] bg-gradient-to-b from-[rgba(0, 0, 0, 0.6)] to-transparent duration-300"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowHeader(true);
      if (showHeader) {
        setHeaderAnimation("opacity-100");
      } else {
        setHeaderAnimation("opacity-0");
      }
    }, 100);
  });

  const toggleMenuClick = () => {
    setToggleMenu(!toggleMenu);
  };

  if (!showHeader) return null;

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    return (
      <Link
        className={cn(
          "relative p-4 before:absolute before:left-1/2 xl:before:left-4 before:bottom-0 before:transform before:-translate-x-1/2 xl:before:-translate-x-0 before:h-[3px] before:bg-primary transition-all before:transition-all",
          pathname === href
            ? "before:w-12 text-white"
            : "before:w-0 hover:before:w-12 hover:text-white"
        )}
        href={href}
        onClick={() => setToggleMenu(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <StyledHeader
      className={cn(
        `fixed left-0 top-0 z-10 w-full px-4 text-white transition-all duration-150 ease-in-out sm:px-8 md:px-12`,
        headerColor,
        headerAnimation
      )}
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1650px] items-center justify-between">
        <Link
          href="/"
          id="prestige-logo"
          className="flex items-center justify-center"
        >
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="h-auto w-[192px] transition-all md:w-[293px]"
          />
        </Link>

        <MenuBtn toggle={toggleMenu} onClick={toggleMenuClick} />

        <div
          className={cn(
            "justify-between flex flex-1 items-center gap-20 font-cormorant text-[16px] font-thin text-[#F4EBD0]",
            toggleMenu ? "show" : "hide"
          )}
          style={{ zoom: "120%" }}
        >
          <div className="flex gap-x-40">
            {data &&
              data.slice(1, 3).map((d: any) => {
                return <NavLink href={d.link.url}>{d.link.label}</NavLink>;
              })}
          </div>
          <div className="flex gap-x-40">
            {data &&
              data.slice(3, 5).map((d: any) => {
                return <NavLink href={d.link.url}>{d.link.label}</NavLink>;
              })}
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  #prestige-logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  ul > li:nth-child(1) {
    display: none;
    visibility: hidden;
    opacity: 0;
  }

  ul > li:nth-child(3) {
    margin-right: auto;
  }

  #burger-menu-btn {
    display: none;
    visibility: hidden;
    opacity: 0;
  }

  @media screen and (max-width: 1280px) {
    #prestige-logo {
      position: unset;
      transform: none;
    }

    #burger-menu-btn {
      display: block;
      visibility: visible;
      opacity: 100;
    }

    ul {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 10;
      width: 320px;
      height: 100vh;
      padding-top: 140px;
      display: flex;
      flex-direction: column;
      background-color: rgba(19, 9, 0, 0.8);
      transition: all;
      transition-duration: 300ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    ul.hide {
      right: -320px;
    }
    ul.show {
      right: 0;
    }
    ul > li:nth-child(1) {
      display: block;
      visibility: visible;
      opacity: 100;
    }
    ul > li:nth-child(3) {
      margin-right: unset;
    }
  }

  @media screen and (max-width: 1024px) {
    ul {
      width: 100%;
    }
    ul.hide {
      right: -100%;
    }
  }
`;

export default HeaderNew;
