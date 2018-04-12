import { Semigroup, sumSemigroup, productSemigroup } from "./semigroup";

export interface Monoid<M> extends Semigroup<M> {
  empty: M;
}

export const sumMonoid: Monoid<number> = {
  empty: 0,
  ...sumSemigroup
};

export const productMonoid: Monoid<number> = {
  empty: 1,
  ...productSemigroup
};

export const anyMonoid: Monoid<boolean> = {
  empty: false,
  append: (x, y) => x || y
};

export const allMonoid: Monoid<boolean> = {
  empty: true,
  append: (x, y) => x && y
};
