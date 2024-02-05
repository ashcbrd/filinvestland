import React from "react";

const List = ({
  color = "#303030",
  ...props
}: { color?: string } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="22.5"
      viewBox="0 0 27 22.5"
      {...props}
    >
      <g id="list" transform="translate(-4.5 -6.75)">
        <path
          id="Path_980"
          data-name="Path 980"
          d="M11.25,6.75H31.5V9H11.25Z"
          fill={color}
        />
        <path
          id="Path_981"
          data-name="Path 981"
          d="M11.25,27H31.5v2.25H11.25Z"
          fill={color}
        />
        <path
          id="Path_982"
          data-name="Path 982"
          d="M11.25,16.875H31.5v2.25H11.25Z"
          fill={color}
        />
        <path
          id="Path_983"
          data-name="Path 983"
          d="M4.5,16.875H6.75v2.25H4.5Z"
          fill={color}
        />
        <path
          id="Path_984"
          data-name="Path 984"
          d="M4.5,6.75H6.75V9H4.5Z"
          fill={color}
        />
        <path
          id="Path_985"
          data-name="Path 985"
          d="M4.5,27H6.75v2.25H4.5Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default List;
