import * as L from "./liana-core";

it("does stuff", () => {
  const graphView = L.GraphView.create(
    {
      graph: {
        links: {
          0: { id: "0", link: [1] },
          1: { id: "1", link: ["test"] },
          2: { id: "2", link: [{ do: "+" }, 2, 3] },
          3: { id: "3", link: [{ do: "+" }, { key: 0 }, { key: 1 }] },
          4: { id: "4", link: [{ ref: "3" }] },
          5: { id: "5", link: [{ ref: "4" }] }
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
  const test = graphView.graph.links.get("4").link[0].ref.id;
  console.log(test);
});
