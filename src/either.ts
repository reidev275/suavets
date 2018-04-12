import { Fn, Fn3 } from "./common";
import { Foldable } from "./foldable";

export interface Either<L, R> extends Foldable<R> {
  map<U>(mapper: Fn<R, U>): Either<L, U>;
  chain<U>(chainer: Fn<R, Either<L, U>>): Either<L, U>;
  match<U>(left: Fn<L, U>, right: Fn<R, U>): U;
}

export class Left<L, R> implements Either<L, R> {
  constructor(private readonly obj: L) {}

  map<U>(mapper: Fn<R, U>): Either<L, U> {
    return new Left<L, U>(this.obj);
  }

  chain<U>(chainer: Fn<R, Either<L, U>>): Either<L, U> {
    return new Left<L, U>(this.obj);
  }

  reduce<A>(agg: Fn3<A, R, A>, empty: A): A {
    return empty;
  }

  match<U>(left: Fn<L, U>, right: Fn<R, U>): U {
    return left(this.obj);
  }
}

export class Right<L, R> implements Either<L, R> {
  constructor(private readonly obj: R) {}

  map<U>(mapper: Fn<R, U>): Either<L, U> {
    return new Right<L, U>(mapper(this.obj));
  }

  chain<U>(chainer: Fn<R, Either<L, U>>): Either<L, U> {
    return chainer(this.obj);
  }

  reduce<A>(agg: Fn3<A, R, A>, empty: A): A {
    return agg(empty, this.obj);
  }

  match<U>(left: Fn<L, U>, right: Fn<R, U>): U {
    return right(this.obj);
  }
}

export function sequencePromise<L, A>(
  either: Either<L, Promise<A>>
): Promise<Either<L, A>> {
  return either.match<Promise<Either<L, A>>>(
    l => Promise.resolve(new Left<L, A>(l)),
    r => r.then(a => new Right<L, A>(a))
  );
}
