/*
  References:
    1) https://www.w3schools.com/jsref/met_loc_reload.asp
*/
// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width
 *    frameRate, stroke, noFill, keyCode, UP_ARROW, DOWN_ARROW
 *    RIGHT_ARROW, LEFT_ARROW, fill, collideRectRect, noLoop, loop
 */

let backgroundColor, playerSnake, currentApple, score, squareSize, badApples;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 0;
  frameRate(12);
  squareSize = 10;
  playerSnake = new Snake();
  currentApple = new Apple();
  badApples = [];
  
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  drawBadApples();

  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  fill("white");
  text(`Score: ${score}`, 20, 20);
}

function createBadApples() {
  if (score % 3 == 0)
    badApples.push(new badApple());
}

function drawBadApples() {
  for (let i = 0; i < badApples.length; i++)
    badApples[i].showSelf();
}

class Snake {
  constructor() {
    this.size = squareSize;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "N";
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)];
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
    // Add new head to front of tail
    this.tail.unshift(new TailSegment(this.x, this.y));

    // Remove last segment of tail
    this.tail.pop();
  }

  showSelf() {
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }

  checkApples() {
    // Check if snake head has collided with apple
    if (
      collideRectRect(
        this.x,
        this.y,
        this.size,
        this.size,
        currentApple.x,
        currentApple.y,
        currentApple.size,
        currentApple.size
      )
    ) {
      score++;
      this.extendTail();
      createBadApples();
      currentApple = new Apple();
    }

    for (let i = 0; i < badApples.length; i++) {
      if (
        collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          badApples[i].x,
          badApples[i].y,
          badApples[i].size,
          badApples[i].size
        )
      ) {
        console.log("GAME OVER!!!!!");
        gameOver();
      }
    }
  }

  checkCollisions() {
    // Check if snake hits border
    if (this.x >= width) this.x = -1;
    else if (this.x < 0) this.x = width - 1;
    else if (this.y >= height) this.y = -1;
    else if (this.y < 0) this.y = width - 1;

    // Check every tail segment for collision with the head
    for (let i = 1; i < this.tail.length; i++) {
      if (
        collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          this.tail[i].x,
          this.tail[i].y,
          this.tail[i].size,
          this.tail[i].size
        )
      ) {
        console.log("GAME OVER!!!!!");
        gameOver();
      }
    }
  }

  extendTail() {
    // Add new tail segment to the end in same position as current last tail segment
    let lastTailSegment = this.tail[this.tail.length - 1];
    this.tail.push(new TailSegment());
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = squareSize;
  }

  showSelf() {
    fill("white");
    stroke(0, 0, 0);
    rect(this.x, this.y, this.size, this.size);
    noStroke();
  }
}

class Apple {
  constructor() {
    this.x = squareSize * random((width - squareSize) / squareSize);
    this.y = squareSize * random((height - squareSize) / squareSize);
    this.size = squareSize;
  }

  showSelf() {
    fill(35, 70, 80);
    rect(this.x, this.y, this.size, this.size);
  }
}

class badApple {
  constructor() {
    this.x = squareSize * random((width - squareSize) / squareSize);
    this.y = squareSize * random((height - squareSize) / squareSize);
    this.size = squareSize;
  }

  showSelf() {
    fill(0, 80, 80);
    rect(this.x, this.y, this.size, this.size);
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else if (keyCode === 32) {
    restartGame();
  } else {
    console.log("wrong key");
  }
}

function restartGame() {
  score = 0;
  badApples = [];
  playerSnake = new Snake();
  currentApple = new Apple();
  loop();
}

function gameOver() {
  text("GAME OVER", width / 2 - 50, height / 2);
  noLoop();
}

// The following code is based on https://www.w3schools.com/jsref/met_loc_reload.asp
function reload() {
    location.reload();
  }
  // End of code from https://www.w3schools.com/jsref/met_loc_reload.asp
