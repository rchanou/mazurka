### Vanilla Redux

```
document global 'document';

get-type . #action 'type'

inc add #n 1
dec subtr #n 1
identity #n

get-action-fun #action
  action-type get-type #action
  switch action-type ['INCREMENT' inc 'DECREMENT' dec] identity

counter #state #action
  action-fun get-action-fun #action
  action-fun #state

redux module 'redux' (version)
create-store . redux 'createStore'

get-el-by-id . document 'getElementById' -> string -> element / generator!
add-event-listener . document 'addEventListener'

get-el-inner-html . #el:element 'innerHTML' -> innerHTML mutable! effectful!

get-subscribe . #store:store 'subscribe'

subscribe-to-store #store:store #cb
  subscribe get-subscribe #store
  subscribe #cb

dispatch-store . #store:store 'dispatch' #action

get-value-el get-el-by-id 'value' -> generator!

get-state . #store 'getState' -> generator!
to-string . #state 'toString'

get-store-html #store -> generator!
  store-state get-state #store
  state-string to-string store-state

mutate-from-store #@el-html -> effect!
  store-html get-store-html counter-store
  set! #@el-html store-html

get-mutator-for-counter-subscription #@el-html #EVENT -> effect!
  mutate-from-store #@el-html

init-app #EVENT
  value-el get-value-el document
  @el-html get-el-inner-html value-el
  html-mutator get-mutator-for-counter-subscription @el-html
  mutate-html html-mutator #EVENT
  mutate-from-store-on-store-update subscribe-to-store counter-store html-mutator

run-render-and-subscribe #render #store
  render! #render
  subscribe! subscribe-to-store #store #render

get-dispatch . #store 'dispatch'

INC_TYPE { type: 'INCREMENT' }

create-dispatcher #store-dispatch #payload #EVENT
  dispatch! #store-dispatch #payload -> event -> mutate!

get-dispatch-inc #store #
  dispatch get-dispatch #store
  dispatcher create-dispatcher INC_TYPE

get-dispatch-dec #store #
  dispatch get-dispatch #store
  dispatcher create-dispatcher DEC_TYPE

add-listeners document #store
  inc-button get-el-by-id document 'increment'
  dispatch-inc get-dispatch-inc #store
  add-event-listener document dispatch-inc
  dec-button get-el-by-id document 'decrement'
  dispatch-dec get-dispatch-dec #store
  add-event-listener document dispatch-dec

counter-store create-store counter

init-app INIT  
```

#### Interesting insights from this:
- What, if anything, could be contained in the INIT event object?
- Separate concept of **"setup phase"** to make it easier to bring methods into the world of "purity"?
  - For example, `document.getElementById('value')` not guaranteed to be pure/idempotent in normal app, but this is just called on ce for setup.
  - Same for `store.subscribe`: it has an "effect" (can even be considered "mutable") but is only called once at setup.
- Related: Encapsulate HTML page?
  - Relates to concept of multiple possible JS "runtimes" to choose from, each with different guarantees.
  - One runtime can prohibit any direct modifications to HTML with the exception of an initialization config?
- Passing a bound function itself, rather than executing it, is a matter of calling it as a parameter of "bind"
- Speaking of types...they really would come in handy here, especially with the inversion of methods into independent functions that act on objects.
  - Those functions are still tightly coupled to the data structures that they were pulled out from.
  - This would help with "autocomplete".
  - Could have abstract types a la ReasonML.
- How should "standalone" mutable refs, e.g. **innerHTML**, be implemented via code?
- **innerHTML** is also a potential example of a "multi-dimensional" type, as it's both mutable and effectful (changes UI).

### Deferred Calling (Both with First-Class Support and without)

#### No First-Class Support
```
get-binder #fun
  . #fun 'bind'

bind #fun #args
  binder get-binder #fun
  bound binder #args

deferred-sum #a #b #c
  list = [] null #a #b #c
  bind $sum list
```

#### First-Class Op
```
sum #a #b #c
  deferred-sum $collect #a #b #c

deferred-sum-example 1 3 5

fulfilled-sum deferred-sum-example
```

#### First-Class Unit Input
```
get-days-in-week #
  dw 7

days-in-week get-days-in-week ()

sum #a #b #c #
  sum $sum #a #b #c

sum-test sum 1 3 4 ()

deferred-sum sum 3 4 5

fulfilled-sum deferred-sum ()
```

#### Insights Thus Far...
- Looks like this could work without first-class support.
- The **First-Class Op** maps pretty closely to `bind` in JS.
- The **First-Class Input** seems cool but may not actually map properly to a dependency graph, and thus may not hold water.

### Commit Stream
```

```

### Node Map and/or Commit Stream
```
0 /. /global Math 
1 /. /0 pow
2 /. /0 sqrt
3 /. /global console
4 /. /3 log
5 /1 /i1(number) 2
6 /5 3
7 /5 4
8 /+ /6 /7
9 /2 /8
10 /mark /i1 /5
11 /copy /10
12 /1 /i3 2
13 /2 /11 /12
```

#### Insights...
- How should the ID of a given node be determined?
  - Assigning a numeric ID is essentially a "memoization", which I think is fine.
  - Do the inputs have IDs themselves?
    - Facilitates attaching comments, etc.
    - Final Conclusion: **Yes**
- It's not just groups that get marked. **Everything** is a mark. This form of coding is the process of **discovering** and **revealing** logic and functionality, rather than constructing it.
  