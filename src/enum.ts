import { Ord } from "./ord";

export interface Enum<A> {
  succ(a: A): A;
  pred(a: A): A;
}

export const getIntermediates = <A>(
  e: Enum<A>,
  ord: Ord<A>,
  start: A,
  end: A
): A[] => {
  const result = [];
  let current = start;
  while (ord.lessThan(current, end) || ord.equals(current, end)) {
    result.push(current);
    current = e.succ(current);
  }
  return result;
};
