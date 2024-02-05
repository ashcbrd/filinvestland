import Subtitle from "../typography/subtitle";

interface Props {
  title: string;
  children: React.ReactNode;
  topMargin: string;
  TopSideButtons: any;
}

function Title(props: Props) {
  const { title, children, topMargin, TopSideButtons } = props;

  return (
    <div className={`w-full p-6 bg-base-100 ${topMargin || "mt-6"}`}>
      <Subtitle
        styleClass={
          TopSideButtons
            ? "inline-block font-marcellus font-extralight text-[40px]"
            : ""
        }
      >
        {title}
        <img src="/assets/images/underline.png" />
      </Subtitle>

      <div className="h-full w-full pb-6 bg-base-100 mt-6 flex flex-wrap ">
        <div className="w-full md:w-1/2 leading-10">{children}</div>
        {TopSideButtons && (
          <div className="w-full md:w-3/6 flex justify-end">
            {TopSideButtons}
          </div>
        )}
      </div>
    </div>
  );
}

export default Title;
