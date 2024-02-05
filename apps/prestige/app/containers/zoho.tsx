"use client"

import { useEffect } from "react";

const Zoho = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.setAttribute("type", "text/javascript");

        let code = `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "${ process.env.NEXT_PUBLIC_PRESTIGE_ZOHO_BOT_WIDGET_CODE }", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zoho.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);`;
        script.appendChild(document.createTextNode(code));

        const chatWithUs = document.querySelector('.chat-with-us-body');
        chatWithUs?.appendChild(script);

        const interval = setInterval(async () => {
            const parent = document.getElementById("zsiq_float");
            const item   = document.getElementsByClassName('zsiq_custommain siq_bR')

            item?.[0]?.setAttribute('style','width:270px !important; height:84px !important; margin-right:40px !important; cursor:pointer;')
            item?.[0]?.setAttribute('id', 'zoho-trigger');
            
            if (parent) {
                parent.style.display = "block";
                parent.style.width = "280px !important";
                parent.style.height = "70px !important";
                parent.style.position = "absolute";
                parent.style.right = "40px";
                parent.setAttribute('style','width:100px;');
            }

            clearInterval(interval);
        }, 1000);

        return () => {
            try {
                document.removeChild(script);
            } catch (error) {
                console.log("Zobot is not properly configured.");
            }
        };
    }, []);

    return null;
};

export default Zoho;
