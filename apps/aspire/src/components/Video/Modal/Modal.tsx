"use client"

import React, { useState } from "react";

const Modal = ({
    className = "",
    backgroundImage = "",
    video
}: {
    className?: string,
    backgroundImage?: string,
    video?: any
}) => {
    const classes = "relative bg-cover bg-center flex items-center justify-center " + className;
    const ref = React.createRef();
    const [playing, setPlaying] = useState(false);

    const onPlay = () => {
        if( ref.current ) {
            (ref.current as any).play();
        }
    }

    const onPause = () => {
        if( playing ) {
            if( ref.current ) {
                (ref.current as any).pause();
            }
        }
    }

    return (
        <div onClick={ onPause } className={`${ classes } overflow-hidden md:!h-[350px]`} style={{ backgroundImage: backgroundImage ? `url(${ backgroundImage })` : "" }}>
            { !playing && <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/30 pointer-events-none z-[1]"></div> }
            { video && (
                <video className="w-full absolute top-[50%] translate-y-[-50%] left-0 right-0 md:w-auto md:left-[50%] md:translate-x-[-50%] md:right-0 md:max-w-[none] md:max-h-[100%]" ref={ ref as any } onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
                    <source src={ video.url } />
                </video>
            )}
            { !playing && (
                <button onClick={ onPlay } className="relative z-[2]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 98 98" fill="none">
                        <circle cx="49" cy="49" r="48" stroke="#FAFAFA" stroke-width="2"/>
                        <path d="M58 49L44.5 56.7942L44.5 41.2058L58 49Z" fill="white"/>
                    </svg>
                </button>
            )}
        </div>
    )
}

export default Modal;