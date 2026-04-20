import { describe, it, expect } from 'vitest';
import { variantsMatcher } from './variantsMatcher';

describe('variantsMatcher (MUI v9 styleOverrides.variants セマンティクス)', () => {
  const rules = [
    { props: { size: 'small' }, style: { height: 32 } },
    { props: { size: 'medium' }, style: { height: 40 } },
    { props: { variant: 'contained', color: 'primary' }, style: { bg: '#1976d2' } },
    { props: { variant: 'outlined' }, style: { bw: 1 } },
  ];

  it('等値 match で単一ルールの style を返す', () => {
    const r = variantsMatcher<any>(rules, { size: 'small' });
    expect(r).toEqual({ height: 32 });
  });

  it('複合条件 (variant × color) の match', () => {
    const r = variantsMatcher<any>(rules, { variant: 'contained', color: 'primary' });
    expect(r).toEqual({ bg: '#1976d2' });
  });

  it('複数ルール match はマージされる (後勝ち)', () => {
    const r = variantsMatcher<any>(rules, { size: 'small', variant: 'outlined' });
    expect(r).toEqual({ height: 32, bw: 1 });
  });

  it('non-match は空オブジェクトを返す', () => {
    const r = variantsMatcher<any>(rules, { size: 'large' });
    expect(r).toEqual({});
  });

  it('関数 predicate も受け付ける', () => {
    // 第 2 型引数で任意の style 型を受けられる (CSSProperties 外でもテスト可能)
    const predicateRules = [
      { props: { count: (n: number) => n > 10 }, style: { big: true } },
    ];
    expect(variantsMatcher<any, { big?: boolean }>(predicateRules, { count: 42 })).toEqual({ big: true });
    expect(variantsMatcher<any, { big?: boolean }>(predicateRules, { count: 5 })).toEqual({});
  });
});
