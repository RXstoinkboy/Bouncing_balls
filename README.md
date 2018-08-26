# Bouncing_balls
Simple JS/canvas bouncing balls animation with added interaction - you can catch balls and score points.

Project is strongly based on https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice. 
It was built by me as a learning project for JavaScript and OOP. It is my first JS code, but I tried to practice as much as possible of good coding practice.

## Technologies used:
1. vanilla ES 6.
2. IIEF even if it is not necessary in this case.
3. rAF polyfill for better compatybility.

## Features:
1. evilCirlce object is controlled with WASD.
2. Balls are generated randomly from Balls class constructor object.
3. Balls have random color, starting position and velocity.
4. Balls bounce from window borders.
5. Balls are added into "balls" array.
6. Balls change color when they collide with eachother.
7. Balls are deleted from the array when they collide with evilCircle object.
8. Score counter is updated after each ball which disappears. 
9. Starting number of balls can be modified by changing let ballsLength variable.

## Requirements:
There are no requirements to run this code besides a modern browser.

## Notes:
I  have some trouble with preventing balls to have 0 (zero) X or Y axis speed. Even though I added an if condition which should prevent it, there are still problems accuring. 
