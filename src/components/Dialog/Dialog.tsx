import React from 'react';
import { useTokens } from '../../theme';
import { typographyVariants } from '../Typography/Typography';

const Backdrop: React.FC<{ open: boolean; onClick?: () => void; children?: React.ReactNode }> = ({ open, onClick, children }) => {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</div>
  );
};

export type DialogProps = {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  slotProps?: { paper?: { sx?: React.CSSProperties } };
};

export const Dialog: React.FC<DialogProps> = ({
  open, onClose, children, maxWidth = 'sm', fullWidth, slotProps = {},
}) => {
  const t = useTokens();
  const wMap: Record<string, number> = { xs: 320, sm: 480, md: 720, lg: 960 };
  if (!open) return null;
  return (
    <Backdrop open={open} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: t.bg.surface, borderRadius: 12, boxShadow: t.shadow.lg,
        maxWidth: wMap[maxWidth], width: fullWidth ? '90%' : 'auto',
        maxHeight: '90vh', overflow: 'auto', ...(slotProps.paper?.sx || {}),
      }}>{children}</div>
    </Backdrop>
  );
};

export const DialogTitle: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties }> = ({ children, sx }) => (
  <div style={{ padding: '20px 24px 0', ...typographyVariants.h5, ...sx }}>{children}</div>
);

export const DialogContent: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties }> = ({ children, sx }) => (
  <div style={{ padding: '16px 24px', ...sx }}>{children}</div>
);

export const DialogActions: React.FC<{ children?: React.ReactNode; sx?: React.CSSProperties }> = ({ children, sx }) => (
  <div style={{ padding: '12px 20px 20px', display: 'flex', gap: 8, justifyContent: 'flex-end', ...sx }}>{children}</div>
);
