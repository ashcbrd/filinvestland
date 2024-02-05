import React from "react";

interface Props {
  children: React.ReactNode;
  style?: string;
}

function Card({ children, style }: Props) {
  return (
    <div className={`card w-full bg-base-100 flex flex-col ${style}`}>
      {children}
    </div>
  );
}

export default Card;
