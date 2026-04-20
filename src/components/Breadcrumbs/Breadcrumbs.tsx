import React from 'react';
import { useTokens } from '../../theme';

export type BreadcrumbsProps = {
  separator?: React.ReactNode;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ separator = '/', children, sx }) => {
  const t = useTokens();
  const items = React.Children.toArray(children);
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, flexWrap: 'wrap', ...sx }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: t.text.muted }}>{separator}</span>}
          {item}
        </React.Fragment>
      ))}
    </nav>
  );
};
