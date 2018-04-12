export type Fn<A, B> = (a: A) => B;
export type Fn3<A, B, C> = (a: A, b: B) => C;

export const id = <A>(a: A): A => a;

export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}

export const compose = <A, B, C>(f: Fn<A, B>, g: Fn<B, C>): Fn<A, C> => a =>
  g(f(a));

export const flip = <A, B, C>(f: Fn3<A, B, C>) => (b: B, a: A): C => f(a, b);
