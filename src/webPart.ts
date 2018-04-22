import { Maybe, Just, Nothing, sequencePromise, join } from "./prelude/maybe";
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

export const pure = <A>(a: A) => Promise.resolve(new Just(a));
export const fail = <A>(): Promise<Maybe<A>> =>
  Promise.resolve(new Nothing<A>());

export const choose = <A>(options: WebPart<A>[]): WebPart<A> => ({
  run: (arg: A) => {
    if (options.length === 0) {
      return getMonoid<A>().empty.run(arg);
    }
    const [h, ...t] = options;
    return h.run(arg).then((x: Maybe<A>) =>
      x.match(
        () => {
          const wpa: WebPart<A> = choose(t);
          const pma: Promise<Maybe<A>> = wpa.run(arg);
          return pma;
        },
        (a: A) => h.run(arg)
      )
    );
  }
});
