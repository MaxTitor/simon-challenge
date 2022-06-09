// Level
var level = 0;
function levelTracker(won){
	if(won === true){
		level++;
		$("#level-title").text("Level " + level);
	} else if (won === false){
		level = 0;
	};
};

// Sounds
var greenSound = new Audio("sounds/green.mp3");
var redSound = new Audio("sounds/red.mp3");
var blueSound = new Audio("sounds/blue.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");
var colorSounds = [greenSound, redSound, yellowSound, blueSound];

// Game starter
var gameStarted = false;
$("body").keydown(function(e){
	if (e.key === "a" && gameStarted === false){
			startGame();
			levelTracker(true);
		} else {
		console.log("Game already started");
	};
});

// Pattern
var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
function gamePatternGenerator(){
	var patternGenerator = Math.floor(Math.random() * 3);
	gamePattern.push(colors[patternGenerator]);
	
	// Color flash
	$(".btn").eq(patternGenerator).addClass("pressed");
		setTimeout(function(){
			$(".btn").eq(patternGenerator).removeClass("pressed");
		}, 100);

	// Color sound
	colorSounds[patternGenerator].play();
	
	console.log("Game pattern: " + gamePattern);
	
	// User pattern clear
	userPattern = [];
	
	// Enable buttons
	$(".btn").on("click", userInputs);
};

// User inputs and input effects
function userInputs(){
	var clickedColor = "";
	clickedColor = this;
		
	// Color flash
	$(clickedColor).addClass("pressed");
	setTimeout(function(){
		$(clickedColor).removeClass("pressed");
	}, 100);
	
	// Color sound
	switch (clickedColor.id){
		case "green":
		greenSound.play();
		break;
		
		case "red":
		redSound.play();
		break;
		
		case "blue":
		blueSound.play();
		break;
		
		case "yellow":
		yellowSound.play();
		break;
		
		default:
		console.log("Clicked sound error");
	};
	
	userPatternPusher(clickedColor);
};

// User pattern
var userPattern = [];
function userPatternPusher(input){
	userPattern.push(input.id);
	userPatternChecker();
	console.log("User pattern: " + userPattern);
};

// User pattern checker
function userPatternChecker() {
    if (userPattern[userPattern.length-1] !== gamePattern[userPattern.length-1]){
		gameOver();
	} else if(userPattern[userPattern.length-1] === gamePattern[userPattern.length-1] &&
	userPattern.length === gamePattern.length){
		$("#level-title").text("Correct!");
		$(".btn").off("click", userInputs);
		setTimeout(function(){
			gamePatternGenerator();
			levelTracker(true);
		}, 1500);
	};
};


// Start game
function startGame(){
	gameStarted = true;
	gamePatternGenerator();
};

// Game over
function gameOver(){
	$("#level-title").text("Game Over");
	$("body").addClass("game-over");
	setTimeout(function(){
		$("body").removeClass("game-over");
	},100);
	wrongSound.play();
	$(".btn").off("click", userInputs);
	startOver();
}

// Start over
function startOver(){
	setTimeout(function(){
		levelTracker(false);
		gameStarted = false;
		gamePattern = [];
		userPattern = [];
		$("#level-title").text("Press A Key to Start");
	},2000);
};
