import { Maybe, Just, sequencePromise, join } from "./prelude/maybe";
import { Semigroup } from "./prelude/semigroup";
import { Monoid } from "./prelude/monoid";

export interface WebPart<A> {
  run(a: A): Promise<Maybe<A>>;
}

export const getSemigroup = <A>(): Semigroup<WebPart<A>> => ({
  append: (x, y) => ({
    run: async (a: A) => {
      const maybeA: Maybe<A> = await x.run(a);
      const foo: Maybe<Promise<Maybe<A>>> = maybeA.map(y.run);
      const bar: Maybe<Maybe<A>> = await sequencePromise(foo);
      return join(bar);
    }
  })
});

export const getMonoid = <A>(): Monoid<WebPart<A>> => ({
  ...getSemigroup<A>(),
  empty: {
    run: (a: A) => Promise.resolve(new Just(a))
  }
});
