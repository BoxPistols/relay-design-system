import React from 'react';
import { useTokens } from '../../theme';
import { fonts } from '../../tokens';

export type TabsProps = {
  value: number;
  onChange?: (e: any, v: number) => void;
  children?: React.ReactNode;
  variant?: 'standard';
  sx?: React.CSSProperties;
};

export const Tabs: React.FC<TabsProps> = ({ value, onChange, children, sx }) => {
  const t = useTokens();
  const tabs = React.Children.toArray(children) as React.ReactElement[];
  return (
    <div role="tablist" style={{ borderBottom: `1px solid ${t.border.subtle}`, display: 'flex', gap: 4, ...sx }}>
      {tabs.map((tab, i) => (
        <button key={i} role="tab" aria-selected={value === i}
          tabIndex={value === i ? 0 : -1}
          onClick={() => onChange?.(null, i)}
          style={{
            padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
            color: value === i ? t.brand.main : t.text.secondary,
            fontSize: 14, fontWeight: 500, fontFamily: fonts.sans,
            borderBottom: `2px solid ${value === i ? t.brand.main : 'transparent'}`,
            marginBottom: -1, display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'all 0.15s',
          }}>
          {(tab.props as any).icon}
          {(tab.props as any).label}
        </button>
      ))}
    </div>
  );
};

export type TabProps = { label?: React.ReactNode; icon?: React.ReactElement; value?: any };
export const Tab: React.FC<TabProps> = () => null;
