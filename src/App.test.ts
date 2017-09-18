import * as L from "./liana-core";

it("does stuff", () => {
  const graphView = L.GraphView.create(
    {
      graph: {
        links: {
          0: { id: "0", link: [1] },
          1: { id: "1", link: ["test"] },
          2: { id: "2", link: [{ do: "+" }, 2, 3] }
        },
        macros: {
          0: {
            id: "0",
            macro: { 0: [1] }
          },
          1: { id: "1", macro: { 0: [{ do: "+" }, { key: 0 }, { key: 1 }] } }
        }
      }
    },
    { cache: { 0: 1 } }
  );
});
