const macros = {
  0: {
    0: ["/1", "/i.0", "/i.2"],
    1: ["/1", "/i.1", "/i.2"],
    2: ["/+", "/.0", "/.1"],
    3: ["/2", "/.2"]
  },
  1: {
    0: [
      "/l",
      "/i.0",
      {
        0: ["/1", "/x", 2] // does this need to be assigned to an id? what about multi-step cases?
      }
    ],
    1: ["/...", "/+", "/.0"], // is this right?
    2: ["/2", "/.1"]
  }
};

const graph = {
  macros,
  0: ["/.", "/g", "Math"],
  1: ["/.", "/0", "pow"],
  2: ["/.", "/0", "sqrt"],
  3: ["/.", "/g", "console"]
};
