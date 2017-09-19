import * as L from "./liana-core";
import * as _ from "lodash";

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
        11: { id: "11", link: [{ val: 4 }] },
        12: { id: "12", link: [{ ref: "1" }, { ref: "11" }, { ref: "11" }] },
        13: { id: "13", link: [{ op: "+" }, { val: 3 }, { val: 5.4 }] },
        14: {
          id: "14",
          link: [{ op: "+" }, { in: "5" }, { in: "5" }, { in: "6" }]
        },
        15: {
          id: "15",
          link: [{ ref: 14 }, { val: 4.3 }, { val: 1.7 }, { val: 2.2 }]
        },
        16: {
          id: "16",
          link: [{ op: "[" }, { val: 3 }, { val: 5 }, { val: 7 }]
        },
        17: { id: "17", link: [{ op: "_" }] },
        18: { id: "18", link: [{ op: "." }, { ref: "17" }, { val: "map" }] },
        19: { id: "19", link: [{ op: "+" }, { in: "11" }, { val: 5.4 }] },
        20: { id: "20", link: [{ ref: "18" }, { ref: "5" }, { ref: "19" }] }
        // 21: { id: "21", link: [{ ref: "20" }, { ref: "5" }] }
      },
      subs: {
        0: {
          id: "0",
          sub: {
            0: [{ op: "." }, { param: 0 }, { val: "map" }],
            1: [{ subLink: 0 }, { param: 1 }, { param: 2 }]
          }
        }
      }
    }
  });

  const getVal = id => graphView.graph.links.get(id).val;
  const a = getVal(18);
  const b = getVal(5);
  const c = getVal(19);
  console.log(c(3), _.map([2, 5], c));
});
