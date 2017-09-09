## V1 Summary

- First Class Packages and Versioning
- Plain English, Easy-to-Change Variable Names and Descriptions
- Smart Comments
- Easy Test Creation
- “Practical” Types For Side Effects
- “Community” and "Official" Types
- Whitelist of Known/"Accepted" methods for references

## Details

- Node Types
  - Immutable
  - Generic
  - Number
  - String
  - Boolean
  - Regex
  - Undefined
  - null
  - Others...
  - Static Reference
    - Object reference that can't be mutated
    - Use for standard lib methods and most npm packages
  - Mutable Reference
    - Reference inside object that’s “intended” to be mutated
    - Could potentially also be standalone mutable reference (already exists for “free” in a sense by defining on global object, so...never mind?)
  - Op
    - Same type as Functions?
    - Certain operations not currently modeled as functions, such as `+`, `-`, `new`, etc.
    - New Op: Module
      - For including modules, by specific version
    - Can we derive what's considered a Function solely by analyzing Ops and other Nodes?
  - Input
    - What "drives" the system. Callbacks/listeners push events to these inputs.
  - Generator
    - Returns a non-deterministic value; essentially a "non-idempotent" function
    - Examples: Math.random, Date.now, shortid
  - Effect
    - Can these all be combined into one property to cover safety, idempotence, and ephemerality?
    - Publish
      - Puts value on certain input
      - Pass to event handlers
    - Safe (Level 0)
      - Safe to re-run after a relevant code change, for example
      - Examples: log, render
    - Unsafe (Levels)
      - Examples: write to disk
    - Idempotent
      - Effects “stabilize” eventually
      - Examples: render, GET, PUT, PATCH, DELETE
      - Counterexamples: log, POST, write to disk
    - Ephemeral (Levels?)
      - Easy to clear effects and “waste”
      - Examples: log, play sound, render, memory
      - Counterexamples: write to disk, launch missile
    - Unknown
- Edit and Commit Types
  - Create
    - Creates a new "flow" (initial node)
  - Link
    - links node to another
  - Add
    - Sugar for Create + Link
    - For existing flow, creates copy with node appended
  - Remove
    - For existing flow, creates copy with node removed
  - Change
    - Sugar for Add an Remove
  - Instance
    - Creates copy of flow (to include in another flow)
    - JS analogy: function call
    - Change to original flow changes this flow
  - Variant
    - Creates copy of flow
    - Flow copy behavior can be modified
    - Change to original flow can propagate to branch flow
      - Proposed behavior: branch flows can show diffs and user can selectively patch them in.
  - Fork
    - Creates copy of flow
    - Changes to original flow DO NOT change fork
- View Types
  - Select Node
  - Select Flow
    - select multiple nodes to define a "flow" section that the user wishes to operate on
    - require labeling first?
  - Collapse
  - Show Versions
- Test Types
  - Mark as Invariant
    - must hold true
  - Mark as Invalid
    - necessary? basically sugar for "must NOT hold true"

## V2
- Networked/Distributed
- Static Types
- Include Other Assets
- Custom Edit Operations

#

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).