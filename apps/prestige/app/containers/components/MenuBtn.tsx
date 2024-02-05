import React from "react";
import cn from "classnames";
type MenuBtnProps = React.HTMLAttributes<HTMLButtonElement> & {
  toggle?: boolean;
};

export const MenuBtn: React.FC<MenuBtnProps> = ({ toggle, onClick }) => {
  return (
    <button
      id="burger-menu-btn"
      className={cn("outline-nonew h-10 w-auto px-4", toggle ? "z-[11]" : "")}
      onClick={onClick}
    >
      <span className="flex h-3 w-full flex-col items-end justify-between">
        <span
          className={cn(
            "block h-[2px] w-10 bg-white transition-all",
            toggle ? "mt-[5px] -rotate-[45deg] transform" : ""
          )}
        />
        <span
          className={cn(
            "block h-[2px] bg-white transition-all",
            toggle ? "mb-[5px] w-10 rotate-[45deg] transform" : "w-5"
          )}
        />
      </span>
    </button>
  );
};
