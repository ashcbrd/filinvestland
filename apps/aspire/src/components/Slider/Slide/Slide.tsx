import Link from "next/link";

const Slide = ({
  className,
  header,
  content,
  image,
  arrowType,
  href,
  overlay,
}: {
  className: string;
  header?: string;
  content?: string;
  image?: string;
  arrowType: string;
  href?: any;
  overlay?: any;
}) => {
  if (href) {
    return (
      <Link href={href} className="transition-all duration-[0.3s] ease-in-out hover:!opacity-90">
        <div
          className={`slider-item flex flex-shrink-0 items-center justify-center bg-cover bg-center ${className}`}
          style={{ backgroundImage: image ? `url(${image})` : "" }}
        >
          {arrowType === "bottom" && <div className="absolute bottom-0 left-0 right-0 h-[144px] bg-project-card-shadow"></div>}
          {(header || content) && (
            <div className="slider-content mx-auto max-w-[770px] text-center text-[20px] text-white">
              <h1 className="pb-[30px] text-[70px] font-[500] leading-[75px] md:text-[39px] md:leading-[1.2]">{header}</h1>
              {content}
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`slider-item flex flex-shrink-0 items-center justify-center bg-cover bg-center ${className}`}
      style={{ backgroundImage: image ? `url(${image})` : "" }}
    >
      {overlay}
      {arrowType === "bottom" && <div className="absolute bottom-0 left-0 right-0 h-[144px] bg-project-card-shadow"></div>}
      {(header || content) && (
        <div className="slider-content mx-auto max-w-[770px] text-center text-[20px] text-white">
          <h1 className="pb-[30px] text-[70px] font-[500] leading-[75px]  md:text-[40px] md:leading-[1.2]">{header}</h1>
          {content}
        </div>
      )}
    </div>
  );
};

export default Slide;
