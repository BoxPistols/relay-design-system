/**
 * variantsMatcher - MUI v9 の styleOverrides.variants 配列と同じセマンティクス。
 *
 * MUI v9 ではコンポーネントのスタイルを以下のように宣言する:
 *
 *   theme.components.MuiButton.styleOverrides.root.variants = [
 *     { props: { variant: 'contained', color: 'primary' }, style: {...} },
 *     { props: { size: 'small' }, style: {...} },
 *   ]
 *
 * この関数は実行時に props を受け取り、props が match する rule の style を
 * すべてマージして返す。条件は値等値 (===) または関数述語。
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
