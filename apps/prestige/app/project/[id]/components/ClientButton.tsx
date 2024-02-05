'use client'
import { useRouter } from "next/navigation";

export function ClientButtonNavigator({ path, label }: { path: string, label: string }) {

    const route = useRouter()
    const navigate = () => {
        route.push(path);
    }

    return (<button onClick={navigate} className="prestige-button whitespace-nowrap outline-none inline-flex items-center justify-center gap-2 transition-all h-[57px] lg:h-[73px] px-8 lg:px-12 lg:text-[28px] tracking-wider capitalize font-cormorant rounded-none text-white cursor-pointer bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700">
        {label}
    </button>);

}

export default ClientButtonNavigator;
