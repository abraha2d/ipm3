import React from "react";

export const CssFilters = () => {
  return (
    <svg height="0" width="0">
      <defs>
        <filter id="red" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="2 0 0 0 0 0 0.25 0 0 0 0 0 0.25 0 0 0 0 0 1 0"
          />
        </filter>
        <filter id="blue" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.5 0 0 0 0 0 0.5 0 0 0 0 0 2 0 0 0 0 0 1 0"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CssFilters;
