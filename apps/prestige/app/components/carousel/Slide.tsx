import Link from "next/link";

const Slide = ({ 
    className,
    header, 
    content,
    image,
    arrowType,
    href,
    overlay
}: {
    className: string
    header?: string,
    content?: string,
    image?: string,
    arrowType: string,
    href?: any,
    overlay?: any
}) => {
    if( href ) {
        return (
            <Link href={ href } className="transition-all duration-[0.3s] ease-in-out hover:!opacity-90">
                <div className={`flex-shrink-0 slider-item flex items-center justify-center bg-cover bg-center ${ className }`} style={{ backgroundImage: image ? `url(${ image })` : "" }}>
                    { arrowType === "bottom" && (
                        <div className="absolute bottom-0 left-0 right-0 bg-project-card-shadow h-[144px]"></div>
                    )}
                    { ( header || content ) && (
                        <div className="slider-content text-white text-center max-w-[770px] mx-auto text-[20px]">
                            <h1 className="text-[70px] leading-[75px] font-[500] pb-[30px] md:text-[39px] md:leading-[1.2]">{ header }</h1>
                            { content }
                        </div>
                    )}
                </div>
            </Link>
        )
    } 

    return (
        <div className={`flex-shrink-0 slider-item flex items-center justify-center bg-cover bg-center ${ className }`} style={{ backgroundImage: image ? `url(${ image })` : "" }}>
            { overlay }
            { arrowType === "bottom" && (
                <div className="absolute bottom-0 left-0 right-0 bg-project-card-shadow h-[144px]"></div>
            )}
            { ( header || content ) && (
                <div className="slider-content text-white text-center max-w-[770px] mx-auto text-[20px]">
                    <h1 className="text-[70px] leading-[75px] font-[500] pb-[30px] md:text-[48px] md:leading-[1.2]">{ header }</h1>
                    { content }
                </div>
            )}
        </div>
    );
}

export default Slide;