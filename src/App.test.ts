import * as L from "./liana-core";

it("does stuff", () => {
  const graph = L.Graph.create({
    0: [1],
    1: ["test"],
    4: [{ id: 0 }],
    5: { 0: [{ value: "+" }] }
  });
});
