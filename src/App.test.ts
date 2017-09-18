import * as L from "./liana-core";

it("does stuff", () => {
  const graph = L.Graph.create({
    0: [1],
    1: ["test"],
    2: [{ id: 0 }],
    3: { 0: [{ do: "+" }] },
    4: [{ do: "+" }, 2, 3]
  });

  const graphView = L.GraphView.create({ graph }, { cache: { 0: 1 } });
  graphView.evaluate(3);
  graphView.evaluate(2);
});
