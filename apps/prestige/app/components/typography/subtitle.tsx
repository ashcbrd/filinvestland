import React from 'react';

interface Props {
  styleClass: string;
  children: React.ReactNode;
}

function Subtitle({ styleClass, children }: Props) {
  return <div className={`${styleClass}`}>{children}</div>;
}

export default Subtitle;
