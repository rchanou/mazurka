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
          link: [{ subRef: "0" }, { in: "0" }, { val: null }, { in: "1" }]
        },
        5: { id: "5", link: [{ op: "[" }, { val: 1 }, { val: 3 }, { val: 5 }] },
        6: { id: "6", link: [{ ref: "4" }, { op: "+" }] },
        7: { id: "7", link: [{ ref: "1" }, { val: 3 }, { val: 2 }] },
        8: { id: "8", link: [{ ref: "1" }, { in: "2" }, { val: 4 }] },
        9: { id: "9", link: [{ ref: "8" }, { val: 3 }] },
        10: { id: "10", link: [{ in: "5" }] },
        11: { id: "11", link: [{ val: 4 }] },
        12: { id: "12", link: [{ ref: "1" }, { ref: "11" }, { ref: "11" }] }
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
  console.log(graphView.graph.links.get(9).val);
});
