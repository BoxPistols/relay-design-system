import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal popover — 祖先の `overflow: hidden` に切られない root-level layer。
 *
 * 使い方:
 *   const [open, setOpen] = useState(false);
 *   const triggerRef = useRef(null);
 *   <button ref={triggerRef} onClick={() => setOpen(o => !o)}>...</button>
 *   <Popover anchorRef={triggerRef} open={open} onClose={() => setOpen(false)}>
 *     ...popover content...
 *   </Popover>
 *
 * - `anchor` の getBoundingClientRect() から fixed 位置を再計算
 * - open 中は scroll / resize を購読して追従
 * - 外側クリックで `onClose` を呼ぶ (self には反応しない)
 * - z-index は tokens.z.popover を期待する外側 sx で指定
 */
export type PopoverProps = {
  anchorRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  onClose?: () => void;
  /** 垂直配置: 'bottom' は anchor 下端 + 4px (デフォルト), 'top' は上端 - 4px */
  placement?: 'bottom' | 'top';
  /** 水平配置: 'start' は anchor 左端に合わせる (デフォルト), 'end' は右端 */
  align?: 'start' | 'end';
  children?: React.ReactNode;
  /** popover 本体の style (外側要素の inline style と合成) */
  style?: React.CSSProperties;
  /** aria-label / role など */
  role?: string;
  'aria-label'?: string;
};

type Rect = { top: number; left: number; right: number; bottom: number; width: number; height: number };

export const Popover: React.FC<PopoverProps> = ({
  anchorRef, open, onClose, placement = 'bottom', align = 'start',
  children, style, role = 'dialog', 'aria-label': ariaLabel,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<Rect | null>(null);

  // anchor rect を測る
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const a = anchorRef.current;
      if (!a) return;
      const r = a.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: r.width, height: r.height });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, anchorRef]);

  // 外側クリックで閉じる
  useLayoutEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (contentRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose?.();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, anchorRef, onClose]);

  if (!open || !rect) return null;

  const top = placement === 'bottom' ? rect.bottom + 4 : rect.top - 4;
  const left = align === 'start' ? rect.left : rect.right;
  const transform = placement === 'top' ? 'translateY(-100%)' : undefined;
  const alignTransform = align === 'end' ? 'translateX(-100%)' : '';

  return createPortal(
    <div
      ref={contentRef}
      role={role}
      aria-label={ariaLabel}
      style={{
        position: 'fixed', top, left,
        transform: [transform, alignTransform].filter(Boolean).join(' ') || undefined,
        ...style,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};
