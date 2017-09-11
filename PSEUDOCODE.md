
### Vanilla Redux

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

#### Interesting insights from this:
- Initialization could happen by passing in the global object of the current runtime.
  - What if no global exists?
  - Perhaps a nice story for dependency injection would be useful here, among other places.
- Currying is automatic; passing a bound function without executing it is a matter of sending in an unused "hole" which could be anything.
  - Should this be given a special type, a la the **unit** type in ReasonML?
- Speaking of types...they really would come in handy here, especially with the inversion of methods into independent functions that act on objects.
  - Those functions are still tightly coupled to the data structures that they were pulled out from.
  - This would help with "autocomplete".
  - Could have abstract types a la ReasonML.
- How should "standalone" mutable refs, e.g. **innerHTML**, be implemented via code?
- **innerHTML** is also a potential example of a "multi-dimensional" type, as it's both mutable and effectful (changes UI).
