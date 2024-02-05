import React from "react";

interface Props {
  children: React.ReactNode;
  style?: string;
}

function Card({ children, style }: Props) {
  return (
    <div className={`card bg-base-100 flex w-full flex-col p-4 ${style}`}>
      {children}
    </div>
  );
}

export default Card;
