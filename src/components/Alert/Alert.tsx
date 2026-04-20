import React from 'react';
import { useTokens } from '../../theme';
import { variantsMatcher } from '../../utils';
import { fonts } from '../../tokens';
import { CheckCircle, Error as ErrorIcon, Warning, Info, Close } from '../../icons';
import { IconButton } from '../IconButton';

export type AlertSeverity = 'success' | 'error' | 'warning' | 'info';
export type AlertVariant = 'standard' | 'filled' | 'outlined';

export type AlertProps = {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  onClose?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const Alert: React.FC<AlertProps> = ({
  severity = 'info', variant = 'standard', onClose, icon, action, children, sx,
}) => {
  const t = useTokens();
  const sev: any = { success: t.success, error: t.danger, warning: t.warning, info: t.info }[severity];
  const icMap: Record<string, React.ReactElement> = {
    success: <CheckCircle/>, error: <ErrorIcon/>, warning: <Warning/>, info: <Info/>,
  };
  const rootStyle = variantsMatcher<{ variant: AlertVariant }>([
    { props: { variant: 'standard' }, style: { backgroundColor: sev.soft, color: sev.dark || sev.main } },
    { props: { variant: 'filled' }, style: { backgroundColor: sev.main, color: t.text.onBrand } },
    { props: { variant: 'outlined' }, style: { backgroundColor: 'transparent', border: `1px solid ${sev.main}`, color: sev.main } },
  ], { variant });
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 14px', borderRadius: 8,
      fontSize: 14, fontFamily: fonts.sans, ...rootStyle, ...sx,
    }}>
      <span style={{ display: 'inline-flex', paddingTop: 2 }}>{icon || icMap[severity]}</span>
      <div style={{ flex: 1 }}>{children}</div>
      {action}
      {onClose && (
        <IconButton size="small" onClick={onClose} sx={{ marginLeft: 'auto', color: 'inherit' }}>
          <Close fontSize="small"/>
        </IconButton>
      )}
    </div>
  );
};
