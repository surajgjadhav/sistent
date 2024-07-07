import InfoOutlinedIcon from '@/assets/icons/info-outlined-icon';
import { iconSmall } from '@/utility/icons.styles';
import React from 'react';
import { CustomTooltip } from '../CustomTooltip';
import { CustomTooltipProps } from '../CustomTooltip/customTooltip';

interface InfoTooltipProps extends CustomTooltipProps {
  helpText: string;
  style?: React.CSSProperties;
}
export const InfoTooltip = ({ helpText, style = {}, ...props }: InfoTooltipProps) => {
  return (
    <CustomTooltip {...props} title={helpText}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      >
        <InfoOutlinedIcon {...iconSmall} />
      </div>
    </CustomTooltip>
  );
};
