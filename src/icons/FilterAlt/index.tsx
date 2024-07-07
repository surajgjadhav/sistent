import React, { FC } from 'react';
import { IconProps } from '../types';

interface FilterAltProps extends IconProps {
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined;
}

const FilterAlt: FC<FilterAltProps> = ({ width = '1.5rem', height = '1.5rem', fill, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={fill}
      onClick={onClick}
    >
      <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z" />
    </svg>
  );
};

export default FilterAlt;
