import { Monoid, sumMonoid } from "./monoid";
import { Fn, Fn3 } from "./common";

export interface Foldable<B> {
  reduce<A>(agg: Fn3<A, B, A>, empty: A): A;
}

export const foldMap = <A, B>(M: Monoid<A>, f: Fn<B, A>, bs: Foldable<B>): A =>
  bs.reduce((acc, b) => M.append(acc, f(b)), M.empty);

export const fold = <A>(M: Monoid<A>, as: Foldable<A>): A =>
  foldMap(M, x => x, as);
