import React from "react";
import { autorun } from "mobx";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
// import { Button, Welcome } from "@storybook/react/demo";

import * as L from "../src/liana-core";

class Test extends React.Component {
  constructor(props) {
    super(props);

    const testDep = "https://unpkg.com/redux@3.7.2/dist/redux.min.js";

    const graphView = L.GraphView.create(
      {
        graph: {
          packages: {
            0: { id: 0, path: testDep }
          },
          links: {
            0: { id: "0", link: [{ op: "g" }, { val: "Math" }] },
            1: { id: "1", link: [{ op: "." }, { ref: "0" }, { val: "pow" }] },
            2: { id: "2", link: [{ op: "." }, { ref: "0" }, { val: "sqrt" }] },
            3: { id: "3", link: [{ op: "g" }, { val: "console" }] },
            4: {
              id: "4",
              link: [{ subRef: "0" }, { in: "0" }, { val: null }, { in: "1" }]
            },
            5: {
              id: "5",
              link: [{ op: "[" }, { val: 1 }, { val: 3 }, { val: 5 }]
            },
            6: { id: "6", link: [{ ref: "4" }, { op: "+" }] },
            7: { id: "7", link: [{ ref: "1" }, { val: 3 }, { val: 2 }] },
            8: { id: "8", link: [{ ref: "1" }, { in: "2" }, { val: 4 }] },
            9: { id: "9", link: [{ ref: "8" }, { val: 3 }] },
            11: { id: "11", link: [{ val: 4 }] },
            12: {
              id: "12",
              link: [{ ref: "1" }, { ref: "11" }, { ref: "11" }]
            },
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
            18: {
              id: "18",
              link: [{ op: "." }, { ref: "17" }, { val: "map" }]
            },
            19: { id: "19", link: [{ op: "+" }, { in: "11" }, { val: 5.4 }] },
            20: {
              id: "20",
              link: [{ ref: "18" }, { ref: "5" }, { ref: "19" }]
            },
            21: { id: "21", link: [{ ref: "1" }, { in: "12" }, { val: 2 }] },
            22: {
              id: "22",
              link: [{ op: "." }, { ref: "17" }, { val: "spread" }]
            },
            23: { id: "23", link: [{ ref: "22" }, { op: "+" }] },
            24: { id: "24", link: [{ op: "+" }, { in: "1" }, { val: 1 }] },
            25: { id: "25", link: [{ op: "+" }, { in: "1" }, { val: -1 }] },
            26: { id: "26", link: [{ op: "." }, { in: "a" }, { val: "type" }] },
            27: {
              id: "27",
              link: [
                { op: "s" },
                { ref: "26" },
                { val: "INCREMENT" },
                { ref: "24" },
                { val: "DECREMENT" },
                { ref: "25" }
              ]
            },
            28: { id: "28", link: [{ ref: "27" }, { in: "a" }] },
            29: { id: "29", link: [{ op: "==" }, { in: "b" }, { val: null }] },
            30: {
              id: "30",
              link: [{ op: "?" }, { ref: "29" }, { val: 0 }, { ref: "28" }]
            },
            31: { id: "31", link: [{ op: "+" }, { param: "a" }, { val: 13 }] },
            32: { id: "32", link: [{ val: 14 }] }
          },
          calls: {
            0: {
              id: "0",
              link: "31",
              params: {
                a: "32"
              }
            }
          },
          subs: {
            0: {
              id: "0",
              sub: {
                0: [{ ref: "18" }, { param: 0 }, { ref: "21" }],
                1: [{ ref: "23" }, { subLink: 0 }],
                2: [{ ref: "2" }, { subLink: 1 }]
              }
            }
          }
        }
      },
      { system: SystemJS }
    );

    // const flows = {
    //   0: {
    //     id: "0",
    //     flow: {
    //       0: [{ op: "." }, { param: 1 }, { val: "type" }],
    //       1: [{ op: "s" }, { subRef: 0 }, { val: "INCREMENT" }, { ref: "24" }, { val: "DECREMENT" }, { ref: "25" }],
    //       2: [{ subRef: 1 }, { param: 0 }],
    //       3: [{ op: "==" }, { param: 0 }, { val: null }],
    //       4: [{ op: "if" }, { subRef: 3 }, { val: 0 }, { subRef: 2 }]
    //     }
    //   }
    // };

    const { graph } = graphView;

    const getVal = id => graph.links.get(id).val;
    const a = getVal(18);
    const b = getVal(5);
    const c = getVal(19);
    const d = getVal(23);

    const subLink = graph.subs.get(0).sub.get(0)[0].ref.link;
    // console.log(subLink, 'le link')
    graphView.graph.expandSub("0", "24", { ref: "5" });
    const e = getVal("24-2");
    console.log(e);
    console.log(getVal("32"));
    const f = graph.calls.get(0).val;
    console.log("fff", f);
    // const snap = getSnapshot(graph.links);
    // console.log(JSON.stringify(snap));
    // console.log("le test", testPkg);
    autorun(() => {
      console.log("le pkg", graph.packages.get(0).with());
    });
  }

  render() {
    return <div>nothing to see here!</div>;
  }
}

storiesOf("Liana", module).add("default", () => <Test />);

// storiesOf("Welcome", module).add("to Storybook", () => (
//   <Welcome showApp={linkTo("Button")} />
// ));

// storiesOf("Button", module)
//   .add("with text", () => (
//     <Button onClick={action("clicked")}>Hello Button</Button>
//   ))
//   .add("with some emoji", () => (
//     <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
//   ));
