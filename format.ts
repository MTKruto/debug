import { inspect } from "./deps.ts";

export function format(f: string, ...args: unknown[]) {
  let i = 0;
  const len = args.length;
  let str = String(f).replace(/%[sdjoO%]/g, (x: string): string => {
    if (x === "%%") return "%";
    if (i >= len) return x;
    switch (x) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return Number(args[i++]).toString();
      case "%o":
        return inspect(args[i++]).split("\n").map((_: string) => _.trim()).join(
          " ",
        );
      case "%O":
        return inspect(args[i++]);
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch {
          return "[Circular]";
        }
      default:
        return x;
    }
  });
  for (const x of args.splice(i)) {
    if (x === null || !(typeof x === "object" && x !== null)) {
      str += " " + x;
    } else {
      str += " " + inspect(x);
    }
  }
  return str;
}
