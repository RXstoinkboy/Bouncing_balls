// define Canvas in JS

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

// define random number generator

function rand(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
};

(() => { // IIEF - not necessary but good for practice
    // define canvas width and height to full window

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // define evilCircle object

    let evilCircle = {
        size: 10,
        x: rand(10, canvas.width - 10),
        y: rand(10, canvas.height - 10),
        velX: 20,
        velY: 20,
        draw: function() { // draw method to generate evilCircle on screen
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.stroke();
        },

        movement: function() { // method to control evilCircle with keyboard
            var _this = this
            window.addEventListener('keydown', function(e) {
                if (e.keyCode === 65) { // a
                    _this.x -= _this.velX;
                } else if (e.keyCode === 68) { // d
                    _this.x += _this.velX;
                } else if (e.keyCode === 87) { // w
                    _this.y -= _this.velY;
                } else if (e.keyCode === 83) { // s
                    _this.y += _this.velY;
                };
            });
        },

        borderCollision: function() { // evilCirlce will bounce of the canvas border
            if ((this.x - this.size) <= 0) {
                this.x += 20;
            } else if ((this.x + this.size) >= canvas.width) {
                this.x -= 20;
            } else if ((this.y + this.size) >= canvas.height) {
                this.y -= 20;
            } else if ((this.y - this.size) <= 0) {
                this.y += 20;
            }
        },

        detectCollision: function() {
            for (let j = 0; j < balls.length; j++) {
                if (!(this === balls[j])) {
                    let dx = this.x - balls[j]._x;
                    let dy = this.y - balls[j]._y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.size + balls[j]._size) {
                        balls[j]._exists = false;
                    }
                }
            }
        },
    };

    // Ball class as a constructor for random balls on screen
    class Ball {
        constructor(x, y, size, velX, velY, color, exists) {
            this._x = x;
            this._y = y;
            this._size = size;
            this._velX = velX;
            this._velY = velY;
            this._color = color;
            this._exists = true;

            // preventing balls to have 0 speed
            if (this._velX == 0) {
                this._velX == 10;
            }
            if (this._velY == 0) {
                this._velY == -10;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = this._color;
            ctx.arc(this._x, this._y, this._size, 0, 2 * Math.PI);
            ctx.fill();
        }

        movement() {
            // conditions to make balls bounce from all walls
            if (this._x - this._size <= 0) {
                this._velX = -(this._velX);
            } else if (this._x + this._size >= canvas.width) {
                this._velX = -(this._velX);
            } else if (this._y - this._size <= 0) {
                this._velY = -(this._velY);
            } else if (this._y + this._size >= canvas.height) {
                this._velY = -(this._velY);
            }

            // setting speed for balls
            this._x += this._velX;
            this._y += this._velY;
        }

        detectCollision() { // balls change color when they collide
            for (let j = 0; j < balls.length; j++) {
                if (!(this === balls[j])) {
                    let dx = this._x - balls[j]._x;
                    let dy = this._y - balls[j]._y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this._size + balls[j]._size) {
                        balls[j]._color = 'rgb(' + rand(0, 255) + ',' + rand(0, 255) + ',' + rand(0, 255) + ')';
                        this._color = 'rgb(' + rand(0, 255) + ',' + rand(0, 255) + ',' + rand(0, 255) + ')';
                    }
                }
            }
        }

    }

    evilCircle.movement(); // call before animation 'loop' function to set controls

    let balls = [];

    // starting number of balls
    let ballsLength = 25;
    document.querySelector('p').innerHTML = 'Number of balls: ' + ballsLength;

    function loop() {
        // drawing canvas' semi-transparent background
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // drawing multiple balls

        while (balls.length < ballsLength) {
            let size = rand(12, 17);
            let ball = new Ball(rand(0 + size, canvas.width - size), rand(0 + size, canvas.height - size), size, rand(-10, 10), rand(-10, 10),
                'rgb(' + rand(0, 255) + ',' + rand(0, 255) + ',' + rand(0, 255) + ')', true);
            balls.push(ball);
        }

        // balls methods performed for every ball in balls array
        for (let i = 0; i < balls.length; i++) {
            balls[i].draw();
            balls[i].movement();
            balls[i].detectCollision();
        }

        // erasing balls when they collide with evilCircle
        for (let j = 0; j < balls.length; j++) {
            if (balls[j]._exists === false) {
                balls.splice(j, 1);
                ballsLength -= 1;

                function updateScore() { // score counter
                    document.querySelector('p').innerHTML = 'Number of balls: ' + balls.length;
                }
                updateScore();
            }
        }

        //evilCircle methods
        evilCircle.draw(); // drawing evilCircle
        evilCircle.borderCollision(); // call collision Detection for evilCircle
        evilCircle.detectCollision();

        // rAF for animation
        // rAF pollyfill required for compatibility with all browsers
        requestAnimationFrame(loop);
    };

    loop(); // call loop function

})();