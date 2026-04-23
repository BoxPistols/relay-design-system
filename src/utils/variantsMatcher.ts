/**
 * variantsMatcher - MUI v9 の styleOverrides.variants 配列と **ほぼ同じ** セマンティクス。
 *
 * MUI v9 ではコンポーネントのスタイルを以下のように宣言する:
 *
 *   theme.components.MuiButton.styleOverrides.root.variants = [
 *     { props: { variant: 'contained', color: 'primary' }, style: {...} },
 *     { props: { size: 'small' }, style: {...} },
 *   ]
 *
 * この関数は実行時に props を受け取り、props が match する rule の style を
 * 先頭から順にマージして返す (後勝ち)。
 *
 * ⚠️ **本家 MUI v9 との差異**: 本家の `variants[].props` は値等値マッチのみ。
 * ここでは便利のため **関数述語** `(v) => boolean` も受け付ける拡張があるが、
 * これに依存した variants は本家に移行時 silently 機能しなくなる。
 * 本物の `@mui/material` に置き換える前に**関数述語を使っている variants は
 * 値等値に潰すか、コンポーネント側に条件ロジックを移す**こと。
 */

export type VariantRule<P = any, S = React.CSSProperties> = {
  props: Partial<{ [K in keyof P]: P[K] | ((v: P[K]) => boolean) }>;
  style: S;
};

const matchProps = <P>(cond: VariantRule<P>['props'], props: P): boolean =>
  Object.entries(cond).every(([k, v]) =>
    typeof v === 'function' ? (v as any)((props as any)[k]) : (props as any)[k] === v
  );

export const variantsMatcher = <P, S = React.CSSProperties>(
  rules: VariantRule<P, S>[],
  props: P
): S => rules.reduce((acc, r) => matchProps(r.props, props) ? ({ ...acc, ...r.style } as S) : acc, {} as S);
