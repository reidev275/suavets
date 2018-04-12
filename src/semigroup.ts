export interface Semigroup<A> {
  append: (x: A, y: A) => A;
}

export const foldSemigroup = <A>(S: Semigroup<A>, start: A, as: A[]): A =>
  as.reduce((acc, a) => S.append(acc, a), start);

export const sumSemigroup: Semigroup<number> = {
  append: (x, y) => x + y
};

export const productSemigroup: Semigroup<number> = {
  append: (x, y) => x * y
};
