"use client"

import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";


const CookiePolicy = () => {
    const [cookiePolicy, setCookiePolicy] = useState(1);

    const onSetPolicy = () => {
        setCookie("policy", 1);
        setCookiePolicy(1);
    }

    useEffect(() => {
        setCookiePolicy(getCookie("policy") ? 1 : 0);
    }, []);

    if( cookiePolicy ) return null;
    
    return (
        <div id="policy" className="rounded-[5px] fixed bottom-[25px] left-0 right-0 max-w-[1000px] mx-auto bg-[#311700]/90 text-white p-[20px] px-[30px] z-[9999]" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 40px 2px" }}>
            <h3 className="pb-[10px] text-[24px] font-[700] font-cormorant">Cookie Policy</h3>
            <p className="pb-[25px]">Filinvest.com uses cookies to ensure that you get the best experience. By continuing to browse our site, you are agreeing to our use of cookies. For further info, please read our <a href="https://fli-land.stagingurls.com/privacy" target="_blank" className="underline">Privacy Policy</a></p>
            <button onClick={ onSetPolicy } className="rounded-[50px] font-cormorant mb-[5px] bg-primary text-white px-[25px] h-[45px] flex items-center text-[17px] font-[600] border border-primary transition-all duration-[0.3s] ease-in-out hover:!bg-transparent hover:!text-primary">I agree</button>
        </div>
    )
}

export default CookiePolicy;