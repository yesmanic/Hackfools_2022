
var toppings = []; 
var stack = []; 

var player; 

var score;
var toppingWidth;
var toppingChance;
  
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
       
    }
    
function handleKeys() {

	if (keyIsDown(LEFT_ARROW)) {
		player.move(createVector(-5, 0));
	}

	if (keyIsDown(RIGHT_ARROW)) {
		player.move(createVector(5, 0));
	}

}


function handleDifficulty(frame, score) {

	if (frame % 30 === 0) { 

		toppingWidth = map(score, 0, 500, 100, 10);
		toppingChance = map(score, 0, 500, 0.5, 0.999);
	}

}


function handleStack() {

	
	for (var i = stack.length - 1; i >= 0; i--) {

    stack[i].update();

		
    if (stack[i - 1] != null) 
      stack[i].moveTo(stack[i - 1].position); 

    if (stack.length - 1 > score && stack.length > 15) {
			

      stack[i].move(createVector(0, +12)); 
    
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
            window.location.replace("pedido.html")
        }, 2000)
    }

		
    if (toppings[i].stacksWith(stack[stack.length - 1])) {
			

      toppings[i].stacked = true;
      stack.push(toppings[i]);
      toppings.splice(i, 1);
    }

  }
}


function attemptNewTopping(frame) {

	if (frame % 90 === 0) { 

		if (random() < toppingChance) {
			

			toppings.push(new Topping(random(width), 0, toppingWidth, rCol()));
		}
	}
}


function drawScore() {

	textSize(50);
  text(score, 10, 70);
}


function endGame() {

  textAlign(CENTER);
  fill(255);
  text("Pedido\nFinalizado!", width / 2, height / 2);
  textAlign(LEFT);
  noLoop();
}





function rCol() {

    let index = [0, 1, 2, 3, 4, 5]

    let cores = ["255, 0, 0", "255, 233, 0", "255, 84, 0", "0, 120, 3", "255, 161, 0", "255, 255, 255"]

    let contador = [0, 0, 0, 0, 0, 0]

    let numAleatorio = random(index);

    contador[numAleatorio]++

    console.log(stack)

  return color(`rgb(${cores[numAleatorio]})`);
}