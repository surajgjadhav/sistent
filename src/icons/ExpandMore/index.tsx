import React from 'react';
import { DARK_PRIMARY_COLOR } from '../../theme';
import { IconProps } from '../types';

interface ExpandMoreProps extends IconProps {
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined;
}

const ExpandMore: React.FC<ExpandMoreProps> = ({
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
      <path fill={fill} d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
};

export default ExpandMore;
