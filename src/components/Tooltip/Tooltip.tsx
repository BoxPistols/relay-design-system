import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { primitive } from '../../tokens';

export type TooltipProps = {
  title?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
};

export const Tooltip: React.FC<TooltipProps> = ({ title, placement = 'top', children }) => {
  const t = useTokens();
  const [show, setShow] = useState(false);
  const child = React.Children.only(children);
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {child}
      {show && title && (
        <span style={{
          position: 'absolute',
          bottom: placement === 'top' ? '100%' : 'auto',
          top: placement === 'bottom' ? '100%' : 'auto',
          left: '50%',
          transform: `translate(-50%, ${placement === 'top' ? '-6px' : '6px'})`,
          backgroundColor: primitive.gray[900], color: '#fff',
          fontSize: 12, padding: '4px 8px', borderRadius: 4,
          whiteSpace: 'nowrap', zIndex: 2000, pointerEvents: 'none',
        }}>{title}</span>
      )}
    </span>
  );
};
