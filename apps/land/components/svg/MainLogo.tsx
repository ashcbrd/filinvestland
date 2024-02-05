import React from "react";
import Image from "next/image";

const MainLogo = ({ logo }:any) => {
  return (
    <div className="2lg:w-[180px] h-[33x] w-[160px] md:h-[50x] md:w-[220px] lg:h-[65x] lg:w-[270px]">
      {logo?.url && <Image
        src={logo?.url ? logo?.url : logo }
        className="h-full w-full object-fill"
        width={174}
        height={47}
        alt="logo"
      />}
    </div>
  );
};

export default MainLogo;
