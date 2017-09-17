import { types } from "mobx-state-tree";

const Keyword = types.model("Keyword", { name: types.string });

const Primitive = types.union(
  Keyword,
  types.string,
  types.number,
  types.boolean
);

const Node = types.model("Node", {
  id: types.identifier,
  from: types.array(Primitive)
});
