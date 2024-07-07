import React, { FC } from 'react';
import { DARK_PRIMARY_COLOR } from '../../theme';
import { IconProps } from '../types';

interface ExpandLessProps extends IconProps {
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined;
}

const ExpandLess: FC<ExpandLessProps> = ({
  width = '1.5rem',
  height = '1.5rem',
  fill = DARK_PRIMARY_COLOR,
  onClick
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={fill}
      onClick={onClick}
    >
      <path fill={fill} d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
    </svg>
  );
};

export default ExpandLess;
