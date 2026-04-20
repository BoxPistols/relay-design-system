import React from 'react';
import { useTokens } from '../../theme';

const Backdrop: React.FC<{ open: boolean; onClick?: () => void; children?: React.ReactNode }> = ({ open, onClick, children }) => {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</div>
  );
};

export type DrawerProps = {
  open: boolean;
  onClose?: () => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  children?: React.ReactNode;
  slotProps?: { paper?: { sx?: React.CSSProperties } };
};

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, anchor = 'left', children, slotProps = {} }) => {
  const t = useTokens();
  const isH = anchor === 'left' || anchor === 'right';
  if (!open) return null;
  return (
    <Backdrop open={open} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'absolute',
        ...(anchor === 'left' && { left: 0, top: 0, bottom: 0 }),
        ...(anchor === 'right' && { right: 0, top: 0, bottom: 0 }),
        ...(anchor === 'top' && { left: 0, right: 0, top: 0 }),
        ...(anchor === 'bottom' && { left: 0, right: 0, bottom: 0 }),
        width: isH ? 300 : '100%', height: isH ? '100%' : 'auto',
        backgroundColor: t.bg.surface, boxShadow: t.shadow.lg,
        ...(slotProps.paper?.sx || {}),
      }}>{children}</div>
    </Backdrop>
  );
};
