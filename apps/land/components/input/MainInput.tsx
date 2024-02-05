import React, { useState } from "react";

const MainInput = (props: any) => {
  const [hasValue, setHasValue] = useState<boolean>(false);

  return (
    <div
      className={`flex items-center gap-3 border-b-[1px] border-white ${ hasValue ? "border-opacity-100" : "border-opacity-50"
      } py-[10px]`}
    >
      <input
        {...props}
        onClick={() => {
            console.log(props);
            if( props.onClick  ) {
                props.onClick();
            }
        }}
        crossOrigin={
          props.crossOrigin == "anonymous" ? "anonymous" : "use-credentials"
        }
        onChange={(e) => {
          setHasValue(e.target.value.length !== 0);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        className="ring-none w-full border-none bg-transparent text-white ring-0"
      />
    </div>
  );
};

export default MainInput;
