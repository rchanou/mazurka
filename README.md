## V1 Summary

- First Class Packages and Versioning
- Plain English, Easy-to-Change Variable Names and Descriptions
- Smart Comments
- Easy Test Creation
- “Practical” Types For Side Effects
- “Community” and "Official" Types

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
    - These and sub-properties are unchangeable
    - Used for standard libs, most npm packages
  - Mutable Reference
    - Reference inside object that’s “intended” to be mutated
    - Could potentially also be standalone mutable reference (already exists for “free” in a sense by defining on global object, so...never mind?)
  - Op
    - Same type as Functions?
    - Certain operations not currently modeled as functions, such as `+`, `-`, `new`, etc.
    - New Op: Module
      - For including modules, by specific version
    - Can we derive what's considered a Function solely by analyzing Ops and other Nodes?
  - Events
    - Stream of events for a system. Defines a “program”, not a “function”.
  - Effect
    - Can these all be combined into one property to cover safety, idempotence, and ephemerality?
    - Publish
      - Puts value on Input with ID
      - Examples: Math.random, Date.now
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
  - Function
  - Mark
  - Copy
  - Instance
  - Add
  - Delete
  - Swap (Sugar for Delete and Add)
- Test Types
  - Mark as Invariant
  - Mark as Invalid

## V2
- Networked/Distributed
- Static Types
- Include Other Assets
- Custom Edit Operations

#

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).