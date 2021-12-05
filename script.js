// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, stroke,strokeWeight,windowHeight, remove,LEFT_ARROW,RIGHT_ARROW, windowWidth, width, mouseX, mouseY, pop, collideCircleCircle, collideRectCircle, findIndex, rect, keyIsDown, text
 */

let lives,
  playerNumber,
  paddleOne,
  paddleTwo,
  ballOne,
  ballTwo,
  brickW,
  brickH,
  bricks,
  score,
  gameIsOver;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);
  score = 0;
  paddleOne = new Paddle("red");
  paddleTwo = new Paddle("blue");
  ballOne = new Ball("red");
  ballTwo = new Ball("blue");
  lives = 2;
  gameIsOver = false;
  brickW = 50;
  brickH = 40;
  bricks = [];

  for (let j = 1; j < 7; j++) {
    for (let i = 0; i < 10; i++) {
      bricks.push(new Brick(i * (width / 10), j * (height / 15)));
    }
  }
}

function draw() {
  background(220, 0, 80);
  paddleOne.draw();
  paddleOne.move(1);
  paddleTwo.draw();
  paddleTwo.move(2);
  ballOne.draw();
  ballOne.move(paddleOne);
  ballTwo.draw();
  ballTwo.move(paddleTwo);
  text(`Lives: ${lives}`);
  text(`Score: ${score}`);
  gameOver();
  drawBricks();
}

class Paddle {
  constructor(color) {
    this.paddleWidth = width / 7;
    this.paddleHeight = 20;
    this.xPosition = random(0, width - this.paddleWidth);
    this.yPosition = height - 40;
    this.color = color;
    this.paddleSpeed = 8;
  }

  draw() {
    fill(this.color);
    rect(this.xPosition, this.yPosition, this.paddleWidth, this.paddleHeight);
    ellipse(this.xPosition, this.yPosition, this.diameter);
  }

  move(playerNumber) {
    // Determine which paddle to move
    if (playerNumber === 1) {
      if (keyIsDown(65) && this.xPosition > 0)
        this.xPosition -= this.paddleSpeed;
      // Move paddleOne left
      else if (keyIsDown(68) && this.xPosition < width - this.paddleWidth)
        this.xPosition += this.paddleSpeed; // Move paddleOne right
    } else if (playerNumber === 2) {
      if (keyIsDown(LEFT_ARROW) && this.xPosition > 0)
        this.xPosition -= this.paddleSpeed;
      // Move paddleTwo left
      else if (
        keyIsDown(RIGHT_ARROW) &&
        this.xPosition < width - this.paddleWidth
      )
        this.xPosition += this.paddleSpeed; // Move paddleTwo right
    }
  }
}

class Ball {
  constructor(color) {
    this.diameter = 10;
    this.xPosition = random(0, width);
    this.yPosition = (height * 2) / 3;
    this.baseXVelocity = 3;
    this.baseYVelocity = 3;
    this.xVelocity = 5;
    this.yVelocity = 5;
    this.color = color;
  }

  draw() {
    fill(this.color);
    ellipse(this.xPosition, this.yPosition, this.diameter);
  }

  move(paddle) {
    console.log(this.xPosition);
    console.log(this.xVelocity);
    // Bounce ball off walls
    if (this.xPosition >= width - this.diameter) {
      this.xVelocity *= -1;
    } else if (this.xPosition <= this.diameter) {
      this.xVelocity *= -1;
    }

    // Collision with paddle
    if (
      collideRectCircle(
        paddle.xPosition,
        paddle.yPosition,
        paddle.paddleWidth,
        paddle.paddleHeight,
        this.xPosition,
        this.yPosition,
        this.diameter
      )
    ) {
      this.yVelocity *= -1;
    }

    // Collision with brick
    for (let i = 0; i < bricks.length; i++) {
      if (
        collideRectCircle(
          bricks[i].xPosition,
          bricks[i].yPosition,
          bricks[i].width,
          bricks[i].height,
          this.xPosition,
          this.yPosition,
          this.diameter
        )
      ) {
        this.yVelocity *= -1;
      }
    }

    // Bounce ball off ceiling and bottom
    if (this.yPosition < this.diameter) {
      this.yVelocity *= -1;
    }
    if (this.yPosition >= height) {
      lives -= 1;
    }

    this.xPosition += this.xVelocity;
    this.yPosition += this.yVelocity;
  }
}

//class for bricks
class Brick {
  constructor(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = width / 10;
    this.height = height / 15;
  }

  draw() {
    stroke(10);
    rect(this.xPosition, this.yPosition, this.width, this.height);
  }
  getHit(ball) {
    if (
      collideRectCircle(
        this.xPosition,
        this.yPosition,
        this.width,
        this.height,
        ball.xPosition,
        ball.yPosition,
        ball.diameter
      )
    ) {
      this.xPosition = width + 2000;
      this.yPosition = height + 2000;
      score++;
    }
  }
}

function drawBricks() {
  for (let i = 0; i < bricks.length; i++) {
    if (
      collideRectCircle(
        bricks[i].xPosition,
        bricks[i].yPosition,
        bricks[i].width,
        bricks[i].height,
        ballOne.xPosition,
        ballOne.yPosition,
        ballOne.diameter
      )
    ) {
      bricks.splice(i, 1);
      ballOne.yVelocity *= -1;
    } else if (
      collideRectCircle(
        bricks[i].xPosition,
        bricks[i].yPosition,
        bricks[i].width,
        bricks[i].height,
        ballTwo.xPosition,
        ballTwo.yPosition,
        ballTwo.diameter
      )
    ) {
      bricks.splice(i, 1);
      ballTwo.yVelocity *= -1;
    } else {
      fill(20);
      bricks[i].draw();
    }
  }
  if (bricks == []) {
    text("CONGRATULATIONS", width / 2, height / 2);
  }
}

function gameOver() {
  if (ballOne.yPosition > height && ballTwo.yPosition > height) {
    text("GAME OVER", width / 2, height / 2);
  }
}
