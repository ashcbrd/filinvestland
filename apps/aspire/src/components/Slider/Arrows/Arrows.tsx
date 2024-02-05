import React from "react";
import Icons from "@/assets/icons";

let timer;

const Arrows = ({
    className,
    setCurrent,
    setLast,
    type,
    slideLength = 0,
    duration,
    infinite,
    prevArrowClassName,
    nextArrowClassName,
    timer
}: {
    className: string,
    setCurrent: any,
    setLast: any,
    type: string,
    slideLength: number,
    duration: number,
    infinite: boolean,
    prevArrowClassName: string,
    nextArrowClassName: string,
    timer: any
}) => {
    const onPrev = () => {
        clearInterval(timer);

        setCurrent( (c: number) => {
            if( infinite ) {
                setLast(false);

                if( c - 1 < 0 ) {
                    timer = setTimeout(() => {
                        setCurrent( () => {
                            setLast(true);

                            return slideLength - 1;
                        })
                    }, duration);

                    return c - 1;
                }
            }

            if( c - 1 < 0 ) {
                return 0;
            }

            return c - 1;
        });
    }

    const onNext = () => {
        clearInterval(timer);
        
        setCurrent( (c: number) => {
            setLast(false);

            if( infinite ) {
                if( c + 1 > slideLength - 1 ) {
                    timer = setTimeout(() => {
                        setCurrent( () => {
                            setLast(true);

                            return 0;
                        })
                    }, duration);

                    return c + 1;
                }
            }

            if( c + 1 > slideLength - 1 ) {
                return c;
            }

            return c + 1;
        });
    }

    if( type === "bottom" ) {
        return (
            <div className="pointer-events-none flex items-center absolute bottom-[29px] left-[29px]">
                <button className={`${ prevArrowClassName } pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[90deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] mr-[13px]`} onClick={ onPrev }>
                    { Icons.ArrowWhite }
                </button>
                <button className={`${ nextArrowClassName } pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[270deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px]`} onClick={ onNext }>
                    { Icons.ArrowWhite }
                </button>
            </div>
        )
    }

    if( type === "bottom-sm" ) {
        return (
            <div className="pointer-events-none flex items-center absolute bottom-[15px] left-[15px]">
                <button className={`${ prevArrowClassName } pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[90deg] w-[28px] h-[28px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] mr-[7px]`} onClick={ onPrev }>
                    { Icons.ArrowWhite }
                </button>
                <button className={`${ nextArrowClassName } pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[270deg] w-[28px] h-[28px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px]`} onClick={ onNext }>
                    { Icons.ArrowWhite }
                </button>
            </div>
        )
    }

    return (
        <div className={ `${ className } pointer-events-none absolute top-[50%] translate-y-[-50%] left-[14px] right-[14px] flex justify-between` }>
            <button className={`${ prevArrowClassName } pointer-events-auto transition-all duration-[0.3s] ease-in-out hover:opacity-50 bg-[#171717]/50 rotate-[90deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] mr-[13px]`} onClick={ onPrev }>
                { Icons.ArrowWhite }
            </button>
            <button className={`${ nextArrowClassName } pointer-events-auto transition-all duration-[0.3s] ease-in-out hover:opacity-50 bg-[#171717]/50 rotate-[270deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px]`} onClick={ onNext }>
                { Icons.ArrowWhite }
            </button>
        </div>
    )
}

export default Arrows;