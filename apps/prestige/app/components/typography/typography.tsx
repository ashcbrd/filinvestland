import React, { useMemo } from "react";
import cn from "classnames";
import Link from "next/link";

type TitleProps = {
  className?: string;
  id?: string;
  text: string | undefined;
  color: "dark" | "light" | "white" | "dim";
  font?: "brittany" | "nunito" | "cormorant" | "sans";
  size?:
    | "15"
    | "16"
    | "18"
    | "20"
    | "22"
    | "24"
    | "26"
    | "30"
    | "35"
    | "40"
    | "heading2"
    | "heading";
  auto_responsive?: boolean;
  slugs?: string;
};

const titleStyles = {
  root: {
    base: "transition-all",
    size: {
      // default sizing
      default: {
        "15": "text-[15px]",
        "16": "text-[16px]",
        "18": "text-[18px]",
        "20": "text-[20px]",
        "22": "text-[22px]",
        "24": "text-[24px]",
        "26": "text-[26px]",
        "30": "text-[30px]",
        "35": "text-[35px]",
        "40": "text-[40px]",
        heading2: "text-[70px]",
        heading: "text-[100px]",
      },
      // will work once auto_responsive is ON
      auto_responsive: {
        "15": "text-[15px]",
        "16": "text-[15px] lg:text-[16px]", // used
        "18": "text-[15px] lg:text-[18px]", // used
        "20": "text-[15px] lg:text-[20px]", // used
        "22": "text-[20px] lg:text-[22px]",
        "24": "text-[18px] lg:text-[24px]", // used
        "26": "text-[18px] lg:text-[26px]", // used
        "30": "text-[22px] lg:text-[30px]", // used
        "35": "text-[30px] lg:text-[35px]",
        "40": "text-[22px] lg:text-[40px]", // used
        heading2: "text-[40px] lg:text-[70px]", // section heading
        heading: "text-[60px] lg:text-[100px]", // home heading
      },
    },
    font: {
      sans: "font-sans",
      nunito: "font-nunito",
      cormorant: "font-cormorant",
      brittany: "font-brittany",
    },
    color: {
      white: "text-white",
      dark: "text-[#261119]",
      dim: "text-[#8D663E]",
      light: "text-[#F4EBD0]",
    },
  },
};

export const Typography: React.FC<TitleProps> = (props) => {
  const {
    className,
    id,
    text,
    size = "16",
    color = "dark",
    font = "nunito",
    auto_responsive = true,
    slugs = ""
  } = props;

  const { root } = titleStyles;

  const baseClasses = cn(
    "TYPOGRAPHY",
    className,
    root.base,
    root.font[font],
    root.color[color],
    auto_responsive ? root.size.auto_responsive[size] : root.size.default[size]
  );

  // temporary fix
  const switchFont = useMemo(() => {
    switch (font) {
      case "brittany":
        return "var(--font-brittany)";
      case "cormorant":
        return "var(--font-cormorant)";
      case "nunito":
        return "var(--font-nunito)";
      default:
        return;
    }
  }, []);

  if (text === "") return null;
  if (text === undefined) return null;

  return (
    <p id={id} className={baseClasses}>
      {slugs ? <Link href={`${slugs}`}>{text}</Link> : text}
    </p>
  );
};
