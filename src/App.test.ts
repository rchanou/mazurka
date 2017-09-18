import * as L from "./liana-core";

it("does stuff", () => {
  const graphView = L.GraphView.create({
    graph: {
      links: {
        0: { id: "0", link: [{ op: "g" }, { val: "Math" }] },
        1: { id: "1", link: [{ op: "." }, { ref: "0" }, { val: "pow" }] },
        2: { id: "2", link: [{ op: "." }, { ref: "0" }, { val: "sqrt" }] },
        3: { id: "3", link: [{ op: "g" }, { val: "console" }] },
        4: {
          id: "4",
          link: [{ subRef: "0" }, { id: 0 }, { val: null }, { id: 1 }]
        },
        5: { id: "5", link: [{ op: "[" }, { val: 1 }, { val: 3 }, { val: 5 }] },
        6: { id: "6", link: [{ ref: "4" }, { op: "+" }] }
      },
      subs: {
        0: {
          id: "0",
          sub: {
            0: [{ op: "." }, { subInput: 0 }, { val: "apply" }],
            1: [{ subLink: 0 }]
          }
        }
      }
    }
  });
  console.log(graphView.graph.links.get(1).val);
});
