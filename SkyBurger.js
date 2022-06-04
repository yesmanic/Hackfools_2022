
var toppings = []; // track falling toppins
var stack = []; // track burger stack

var player; // bottom bun

var score;
var toppingWidth;
var toppingChance;
  // Top-left corner of the img is at (0, 0)
  // Width and height are the img's original width and height
  
  function setup() {

      
      createCanvas(600, 400);
      
      /* initialize values */
      score = 0;
      toppingWidth = 125;
      toppingChance = 0.5;
      
      /* initialize bottom bun */
      player = new Topping(width / 2, height - 15, toppingWidth, color("#fac934"));
      stack.push(player);
      player.stacked = true;
    }
    
    function draw() {
        
        background(198, 251, 249);
        
        strokeWeight(5);
        stroke(0)
        noFill()
        rect (0, 0, 599, 399)
        
        handleKeys();
        handleToppings();
        handleStack();
        handleDifficulty(frameCount, score);
        
        attemptNewTopping(frameCount);
        
        drawScore();
        // loadImage('assets/quesunto.png', img => {
        //     image(img, 0, 0);
        //   });
    }
    
/**
 * handles player input
 */
function handleKeys() {

	if (keyIsDown(LEFT_ARROW)) {
		player.move(createVector(-5, 0));
	}

	if (keyIsDown(RIGHT_ARROW)) {
		player.move(createVector(5, 0));
	}

}

/**
 * tweak the values to increase difficulty
 * every half-a-second
 */
function handleDifficulty(frame, score) {

	if (frame % 30 === 0) { // every half-a-second

		toppingWidth = map(score, 0, 500, 100, 10);
		toppingChance = map(score, 0, 500, 0.5, 0.999);
	}

}

/**
 * draws & updates stack
 * moves the entire stack
 * shifts stack to screen
 * updates score
 */
function handleStack() {

	/* calculate bottom toppings first */
	for (var i = stack.length - 1; i >= 0; i--) {

    stack[i].update();

		/* move the entire stack */
    if (stack[i - 1] != null) // if the previous topping exists
      stack[i].moveTo(stack[i - 1].position); // set the position to the previous topping

    if (stack.length - 1 > score && stack.length > 15) {
			// if the stack exceeds half of the screen's height

      stack[i].move(createVector(0, +12)); // move all toppings downward
    }

  }

	/* draw the top toppings first */
	for (var i = 0; i < stack.length; i++) {

		stack[i].draw();
	}

	/* update score */
  if (stack.length - 1 > score) {
    score++;
  }
}

/**
 * updates & draws toppings
 * checks for game over
 * checks for stacks
 */
function handleToppings() {

	for (var i = 0; i < toppings.length; i++) {

		/* update & draw */
    toppings[i].update();
    toppings[i].draw();

    if (keyIsDown(ENTER) || score === 10) {
        endGame();
        setTimeout(() => {
            window.location.replace("/pedido.html")
        }, 2000)
    }

		/* check for the end of the game */
    //if (toppings[i].position.y > height)
    	//endGame();

		/* check for stacks */
    if (toppings[i].stacksWith(stack[stack.length - 1])) {
			// if the topping stacks, push to the stack

      toppings[i].stacked = true;
      stack.push(toppings[i]);
      toppings.splice(i, 1);
    }

  }
}

/**
 * pushes a new topping to the toppings array
 * bases frequency off of frame
 */
function attemptNewTopping(frame) {

	if (frame % 90 === 0) { // every 1.5 seconds

		if (random() < toppingChance) {
			// based upon a random chance, a new topping might be pushed

			toppings.push(new Topping(random(width), 0, toppingWidth, rCol()));
		}
	}
}

/**
 * draws the score
 */
function drawScore() {

	textSize(50);
  text(score, 10, 70);
}

/**
 * ends loop, displays message
 */
function endGame() {

  textAlign(CENTER);
  fill(255);
  text("Pedido\nFinalizado!", width / 2, height / 2);
  textAlign(LEFT);
  noLoop();
}

/**
 * returns a random color
 */



function rCol() {

    let index = [0, 1, 2, 3, 4, 5]

    let cores = ["255, 0, 0", "255, 233, 0", "255, 84, 0", "0, 120, 3", "255, 161, 0", "255, 255, 255"]

    let contador = [0, 0, 0, 0, 0, 0]

    let numAleatorio = random(index);

    contador[numAleatorio]++

    console.log(stack)

  return color(`rgb(${cores[numAleatorio]})`);
}