import { types } from "mobx-state-tree";

export const parse = (prog, pragma = "/") => {
  const parsed = {};

  for (const key in prog) {
    parsed[key] = prog[key].map(
      s => (typeof s === "string" && s.startsWith(pragma) ? [B, s.slice(1)] : s)
    );
  }

  return parsed;
};

const Op = types.enumeration([
  "global",
  "input",
  "pipe",
  "merge",
  "group",
  "push",
  ""
]);

const Token = types.union();

const Commit = types.frozen(types.array(Token));
