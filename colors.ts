import { colors } from "./deps.ts";

// @ts-ignore: lib
const isBrowser = typeof Deno === "undefined" &&
  // @ts-ignore: lib
  typeof process === "undefined" && typeof window !== "undefined" &&
  // @ts-ignore: lib
  typeof document !== "undefined";

export type ColorFunction = (message: string) => string[];
export const colorFunctions: ColorFunction[] = [
  (v) => {
    if (isBrowser) {
      return [`%c${v}`, "color: red"];
    } else {
      return [colors.red(v)];
    }
  },
  (v) => {
    if (isBrowser) {
      return [`%c${v}`, "color: green"];
    } else {
      return [colors.green(v)];
    }
  },
  (v) => {
    if (isBrowser) {
      return [`%c${v}`, "color: yellow"];
    } else {
      return [colors.yellow(v)];
    }
  },
  (v) => {
    if (isBrowser) {
      return [`%c${v}`, "color: blue"];
    } else {
      return [colors.blue(v)];
    }
  },
  (v) => {
    if (isBrowser) {
      return [`%c${v}`, "color: magenta"];
    } else {
      return [colors.magenta(v)];
    }
  },
  (v) => {
    if (isBrowser) {
      return [`%c${v}`, "color: cyan"];
    } else {
      return [colors.cyan(v)];
    }
  },
];

function hashCode(s: string): number {
  let h = 0;
  const l = s.length;
  let i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
}

export function generateColor(message: string): ColorFunction {
  const hash = Math.abs(hashCode(message));
  return colorFunctions[hash % colorFunctions.length];
}
