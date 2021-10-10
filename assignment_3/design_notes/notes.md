# Goal
To create a generative mountain landscape that scrolls slowly and plays lofi 
music in the background.

# Classes
## Mountain
### Purpose
* Draw a mountain layer and move this mountain each frame. 
### Implementation notes
* To optimize we could keep a linked list and keep the values that we have 
calculated. This means each frame we only need to calculate the newest value 
and add this value to the tail and pop the head. A linked list is optimal in 
this case because 
    1. we don't need the constant time access benefit that an array provides
    2. inserting a node at the end of a linked list with a tail pointer takes 
    constant time
### Variables
```js
private:
    start           // used for infinite scrolling
    x_offset        // used to offset through perl noise
    first_point createVector(0, viewport height * 100)
    min_height      // min height of this mountain layer
    max_height      // max height of this mountain layer
    noise_offset    // make each layer different => largely different offsets
    speed           // speed layer moves at
    color           // for color of mountain
```
### Functions
```js
constructor(min_height, max_height, noise_offset, speed, color)
    start = 0
    x_offset = 0
    // extremely low to not mess with the left side during fill
    first_point = create a vector with (0, viewport height * 100)
    min_height = min_height
    max_height = max_height
    noise_offset = noise_offset
    speed = speed
    color = color
draw()
    set stroke to color // to match fill color
    begin shape
    set fill to color   // colors mountain
    x_offset = start
    add vertex at first_point
    for i -> width of canvas
        calculate noisy y = [noise(x_offset) * height of canvas]
        map noisy y from (0, height of canvas) to (min_height, max_height)
        increase x_offset by speed
    add vertex at (width, height)
    end shape

    increment start with speed
```
## Moon
### Purpose
* Draw a crescent moon in the sky
### Implementation notes
* Draw a circle the color of the moon and have another circle offset it that is 
the color of the canvas background to make a crescent. Fill the moon with white 
and have a random limited opacity. Maybe make the opacity less if the sky is 
lighter or darker?
### Variables
```js
private:
    x
    y
```
### Functions
```js
constructor(x, y)
    x = x
    y = y
draw()
    create circle w/ limited random size at x and y w/ random limited opacity
```
## Star
### Purpose
* Draw stars in the sky
### Implementation notes
* Randomly pick and x and y within the canvas and create an ellipse there. Fill
with white sounds fine for now. Since mountains take up half of canvas we can 
just make stars that only go down to half the canvas to optimize
### Variables
```js
private:
    x
    y
```
### Functions
```js
constructor(x, y) 
    x = x
    y = y
draw()  // draws one star
    create an ellipse with a limited random size and height at x and y
```
## Colors
### Purpose
* To randomly give us a color palette that looks good for the mountains
### Implementation notes
### Variables
```js
private:
    color_count
    colors
```
### Functions
```js
constructor(color_count)
    color_count = color_count
    colors = new array of size color_count
generate_colors()
    randomly pick an rgb
    loop through and mutate the original rgb to complete palette
get color_palette()
    return colors

```