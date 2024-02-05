import React from "react";

const Search = ({
  color = "#163e82",
  ...props
}: { color?: string } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.859"
      height="15.859"
      viewBox="0 0 15.859 15.859"
      {...props}
    >
      <path
        id="search-sharp"
        d="M19.234,17.862,14.5,13.131A6.157,6.157,0,1,0,13.131,14.5l4.731,4.73ZM9.525,13.733a4.208,4.208,0,1,1,4.207-4.208,4.208,4.208,0,0,1-4.207,4.208Z"
        transform="translate(-3.375 -3.375)"
        fill={color}
      />
    </svg>
  );
};

export default Search;
