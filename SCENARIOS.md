## Scenarios: How We Might Model Various Programs

### A counter, and a button that increments the counter.

- def mutable count
- def increment
- on initialize: render button with on-click : event-source (event-source passed as parameter?)
- on button-click: update mutable with increment, render 
- app starts
- event with type initialize
- app renders
- user clicks button
- event with type button click triggers counter-update and re-render

### Same as above, but without event system

- def mutable global.count
- def render
- def increment
- def action named update-count
  - mutates global.count with updater increment
  - render global.count
- on init: render button with on-click: update-count
- app starts, ui renders
- user clicks button
- update-count fires

### Vanilla Redux Untested Preliminary Pseudo-Code

```
get-type . #action 'type'
inc add #n 1
dec subtr #n 1
identity #n

get-action-fun #action
  action-type = get-type #action
  switch action-type ['INCREMENT' inc 'DECREMENT' dec] identity

counter #state #action
  action-fun = get-action-fun #action
  action-fun #state

redux module 'redux' (version)
create-store . redux 'createStore'

get-document . #global 'document'
get-el-by-id . #document:document 'getElementById' -> string -> element
add-event-listener . #document:document 'addEventListener'

get-el-inner-html = . #el:element 'innerHTML' -> innerHTML mutable ref! effectful!

render #html-ref #html
  set #html-ref #html

get-subscribe . #store:store 'subscribe'

subscribe-to-store #store:store #cb
  subscribe = get-subscribe #store
  subscribe #cb

dispatch-store . #store:store 'dispatch' #action

get-value-el get-el-by-id #document 'value'

get-store-html #store
  get-state = . #store 'getState'
  state = get-state #
  to-string = .state 'toString'
  to-string #

get-render-app #value-el #html #
  set! #value-el #html #

get-render-from-store #valueEl #store #
  html = get-store-html #store
  set! #valueEl html #

get-render #document
  value-el = get-value-el #document
  render-from-store value-el counter-store

run-render-and-subscribe #render #store
  #render #
  subscribe-to-store #store #render

get-dispatch . #store 'dispatch'

INC_TYPE { type: 'INCREMENT' }

get-dispatch-inc #store #
  dispatch = get-dispatch #store
  dispatch INC_TYPE #

get-dispatch-dec #store #
  dispatch = get-dispatch #store
  dispatch DEC_TYPE #

add-listeners #document #store
  inc-button = get-el-by-id #document 'increment'
  dispatch-inc = get-dispatch-inc #store
  add-event-listener #document dispatch-inc
  dec-button = get-el-by-id #document 'decrement'
  dispatch-dec = get-dispatch-dec #store
  add-event-listener #document dispatch-dec

counter-store create-store counter

do-it-all #document
  render-app = get-render #document
  run-render-and-subscribe render-app counter-store
```

#### Questions this brings up:
- Should initialization happen by passing in a global object? My intuition says to try it.
- Should fulfilling all "holes" not automatically run it, to allow passing the bound function itself? My intuition says to try this first.
- As a corollary of the above, what exactly could/should that "run" parameter be? Could it be the global? An overridable context? Nothing?

### Same as above, but in vanilla JS.

- 

### A button that, when clicked, displays a random number.

- 

### Types for Common Methods and Properties

Anything not persistent can be called "safe".
Anything not idempotent can be called "unbounded".

- console.log - effect 
- Math.random - effect, event-source
- localStorage.set - effect, persistent, idempotent
- localStorage.get - effect, event-source
- ReactDOM.render - effect, idempotent
- Date.now - effect, event-source
- Math.PI - value, number
- Math.floor - fun
- React.createElement - fun

#

### Hypotheses

- A function that contains no effects and no mutable references is pure.