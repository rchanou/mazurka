## Scenarios: How We Might Model Various Programs

### A counter and a button that increments the counter.

- def mutable count
- def increment
- on initialize: render button with on-click : event-source (event-source passed as parameter?)
- on button-click: update mutable with increment, render 
- app starts
- event with type initialize
- app renders
- user clicks button
- event with type button click

### A button that, when clicked, displays a random number.

