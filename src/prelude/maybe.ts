import { Fn } from "./common";

export interface Maybe<T> {
  map<U>(mapper: Fn<T, U>): Maybe<U>;
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U>;
  match<U>(nothing: () => U, just: Fn<T, U>): U;
}

export class Just<T> implements Maybe<T> {
  constructor(private readonly obj: T) {}
  map<U>(mapper: Fn<T, U>): Maybe<U> {
    return new Just<U>(mapper(this.obj));
  }
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U> {
    return chainer(this.obj);
  }
  match<U>(nothing: () => U, just: Fn<T, U>): U {
    return just(this.obj);
  }
}

export class Nothing<T> implements Maybe<T> {
  map<U>(mapper: Fn<T, U>): Maybe<U> {
    return new Nothing<U>();
  }
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U> {
    return new Nothing<U>();
  }
  match<U>(nothing: () => U, just: Fn<T, U>): U {
    return nothing();
  }
}

export const join = <T>(m: Maybe<Maybe<T>>): Maybe<T> =>
  m.match(
    () => new Nothing<T>(),
    j => j.match(() => new Nothing<T>(), j2 => new Just(j2))
  );

export const fromList = <T>(xs: T[]): Maybe<T> =>
  xs.length > 0 ? new Just(xs[0]) : new Nothing<T>();

export function sequencePromise<A>(
  maybe: Maybe<Promise<A>>
): Promise<Maybe<A>> {
  return maybe.match<Promise<Maybe<A>>>(
    () => Promise.resolve(new Nothing<A>()),
    j => j.then(a => new Just(a))
  );
}

export function traversePromise<A, B>(
  fn: Fn<A, Promise<Maybe<B>>>,
  maybe: Maybe<A>
): Promise<Maybe<B>> {
  return maybe.match(() => Promise.resolve(new Nothing<B>()), fn);
}
