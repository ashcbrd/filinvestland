import React from "react";
import { setters } from "@/context/Projects";

const FeaturedSlide = ({
    slide
}: {
    slide: any
}) => {
    const methods = setters();
    const onUpdateSelected = () => {
        methods.setFeaturedSelected(slide.Project);
    }

    return (
        <div className="px-[8px] pt-[17px]">
            <div className="transition-all duration-[0.3s] ease-in-out relative">
                <button onClick={ onUpdateSelected } className="w-full block bg-cover bg-center h-[303px] bg-aqua-blue transition-all duration-[0.3s] ease-in-out hover:opacity-[0.7]" style={{ backgroundImage: `url(${ slide.Project.PropertyImages.length > 0 ? slide.Project.PropertyImages[0].image.url : null })` }}></button>
                <span className="absolute text-white  left-[29px] bottom-[19px] text-[16px] font-[500]">Artist Illustration</span>
            </div>
        </div>
    );
}

export default FeaturedSlide;