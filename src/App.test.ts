import * as L from "./liana-core";

it("does stuff", () => {
  const graphView = L.GraphView.create(
    {
      graph: {
        links: {
          0: { id: "0", link: [{ op: "g" }, "Math"] },
          1: { id: "1", link: [{ op: "." }, { ref: "0" }, "pow"] },
          2: { id: "2", link: [{ op: "." }, { ref: "0" }, "sqrt"] },
          3: { id: "3", link: [{ op: "g" }, "console"] },
          4: {
            id: "4",
            link: [{ macroRef: "0" }, { key: "0" }, null, { key: "1" }]
          },
          5: { id: "5", link: [{ op: "[" }, 1, 2, 3] },
          6: { id: "6", link: [{ ref: "4" }, { op: "+" }] }
        },
        macros: {
          0: {
            id: "0",
            macro: { 0: [{ op: "." }, { key: ".0" }, "apply"],1:[{}] }
          }
        }
      }
    },
    { cache: {} }
  );
});
