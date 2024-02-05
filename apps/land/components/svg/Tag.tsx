import React from "react";

const Tag = ({
  color = "#163e82",
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21.502"
      height="21.5"
      viewBox="0 0 21.502 21.5"
      className={className}
    >
      <g id="tag" transform="translate(-2.25 -2.25)">
        <path
          id="Path_721"
          data-name="Path 721"
          d="M14.935,23.75a2.3,2.3,0,0,1-1.628-.676L2.926,12.7a2.3,2.3,0,0,1-.676-1.628V4.554a2.3,2.3,0,0,1,2.3-2.3h6.519a2.3,2.3,0,0,1,1.628.676L23.074,13.3a2.3,2.3,0,0,1,0,3.263l-6.511,6.511a2.3,2.3,0,0,1-1.628.676ZM4.554,3.786a.768.768,0,0,0-.768.768v6.519a.768.768,0,0,0,.23.545L14.39,21.992a.768.768,0,0,0,1.083,0l6.519-6.519a.768.768,0,0,0,0-1.083L11.618,4.016a.768.768,0,0,0-.545-.23Z"
          transform="translate(0 0)"
          fill={color}
        />
        <path
          id="Path_722"
          data-name="Path 722"
          d="M9.821,12.893a3.071,3.071,0,1,1,3.071-3.071A3.071,3.071,0,0,1,9.821,12.893Zm0-4.607a1.536,1.536,0,1,0,1.536,1.536A1.536,1.536,0,0,0,9.821,8.286Z"
          transform="translate(-1.429 -1.429)"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default Tag;
