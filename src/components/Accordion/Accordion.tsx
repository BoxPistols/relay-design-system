import React, { useState } from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';
import { ArrowDown } from '../../icons';

export type AccordionProps = {
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (e: any, expanded: boolean) => void;
  sx?: React.CSSProperties;
};

export const Accordion: React.FC<AccordionProps> = ({
  children, defaultExpanded, expanded: ctlExp, onChange, sx,
}) => {
  const t = useTokens();
  const [internal, setInternal] = useState(defaultExpanded ?? false);
  const exp = ctlExp !== undefined ? ctlExp : internal;
  return (
    <div style={{ borderBottom: `1px solid ${t.border.subtle}`, ...sx }}>
      {React.Children.map(children, (c: any) => c && React.cloneElement(c, {
        expanded: exp,
        onToggle: () => { setInternal(!exp); onChange?.(null, !exp); },
      }))}
    </div>
  );
};

export const AccordionSummary: React.FC<{
  expanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
  expandIcon?: React.ReactElement;
  sx?: React.CSSProperties;
}> = ({ expanded, onToggle, children, expandIcon = <ArrowDown/>, sx }) => (
  <button onClick={onToggle} style={{
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 0', border: 'none', background: 'transparent', cursor: 'pointer',
    fontFamily: fonts.sans, fontSize: 14, fontWeight: 500, textAlign: 'left', color: 'inherit', ...sx,
  }}>
    <span>{children}</span>
    <span style={{
      transition: 'transform 0.2s',
      transform: expanded ? 'rotate(180deg)' : 'none',
    }}>{expandIcon}</span>
  </button>
);

export const AccordionDetails: React.FC<{
  expanded?: boolean;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}> = ({ expanded, children, sx }) => (
  <div style={{
    maxHeight: expanded ? 400 : 0, overflow: 'hidden',
    transition: 'max-height 0.25s',
    padding: expanded ? '0 0 14px' : 0, fontSize: 14, ...sx,
  }}>{children}</div>
);
