import React from 'react';
import { useTokens } from '../../theme';
import { Typography } from '../Typography';
import { Check } from '../../icons';

/**
 * ★ MUI v9 で大幅強化された Stepper
 * - <ol>/<li> セマンティクス
 * - role="tablist" / role="tab" / aria-selected / aria-posinset / aria-setsize 自動付与
 * - Roving tabindex 実装
 */

export type StepperProps = {
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  alternativeLabel?: boolean;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
};

export const Stepper: React.FC<StepperProps> = ({
  activeStep = 0, orientation = 'horizontal', alternativeLabel, children, sx,
}) => {
  const t = useTokens();
  const steps = React.Children.toArray(children);
  return (
    <ol role="tablist" aria-orientation={orientation} style={{
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: orientation === 'vertical' ? 8 : 0,
      listStyle: 'none', margin: 0, padding: 0, width: '100%', ...sx,
    }}>
      {steps.map((step: any, i) => (
        <React.Fragment key={i}>
          {React.cloneElement(step, {
            index: i,
            active: activeStep === i,
            completed: activeStep > i,
            totalSteps: steps.length,
            orientation, alternativeLabel,
          })}
          {i < steps.length - 1 && orientation === 'horizontal' && (
            <div style={{
              flex: 1, height: 1,
              backgroundColor: activeStep > i ? t.brand.main : t.border.default,
              alignSelf: alternativeLabel ? 'flex-start' : 'center',
              marginTop: alternativeLabel ? 12 : 0,
              transition: 'background 0.3s',
            }}/>
          )}
        </React.Fragment>
      ))}
    </ol>
  );
};

export type StepProps = {
  index?: number;
  active?: boolean;
  completed?: boolean;
  totalSteps?: number;
  orientation?: 'horizontal' | 'vertical';
  alternativeLabel?: boolean;
  children?: React.ReactNode;
};

export const Step: React.FC<StepProps> = ({
  index, active, completed, totalSteps, orientation, alternativeLabel, children,
}) => (
  <li role="presentation" style={{
    display: 'flex', flexDirection: alternativeLabel ? 'column' : 'row',
    alignItems: 'center', gap: 8,
  }}>
    {React.Children.map(children, (c: any) => c && React.cloneElement(c, {
      index, active, completed, totalSteps, orientation, alternativeLabel,
    }))}
  </li>
);

export type StepLabelProps = {
  index?: number;
  active?: boolean;
  completed?: boolean;
  totalSteps?: number;
  alternativeLabel?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  optional?: React.ReactNode;
};

export const StepLabel: React.FC<StepLabelProps> = ({
  index = 0, active, completed, totalSteps = 1, alternativeLabel,
  children, icon, optional,
}) => {
  const t = useTokens();
  return (
    <div role="tab"
      aria-selected={active}
      aria-posinset={index + 1}
      aria-setsize={totalSteps}
      tabIndex={active ? 0 : -1}
      style={{
        display: 'flex', flexDirection: alternativeLabel ? 'column' : 'row',
        alignItems: 'center', gap: 8, cursor: 'pointer', outline: 'none',
      }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center',
        backgroundColor: completed ? t.brand.main : active ? t.brand.main : t.bg.sunken,
        color: (completed || active) ? t.text.onBrand : t.text.muted,
        fontSize: 13, fontWeight: 600, transition: 'all 0.2s', flexShrink: 0,
      }}>
        {completed ? <Check fontSize="small" sx={{ width: 14, height: 14 }} strokeWidth={3}/> : icon || (index + 1)}
      </div>
      <div style={{ textAlign: alternativeLabel ? 'center' : 'left' }}>
        <Typography variant="body2" sx={{
          fontWeight: active ? 600 : 400,
          color: active || completed ? t.text.primary : t.text.secondary,
        }}>
          {children}
        </Typography>
        {optional && <Typography variant="caption" color="secondary">{optional}</Typography>}
      </div>
    </div>
  );
};
