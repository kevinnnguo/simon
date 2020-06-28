var buttonColor = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0;
var gameStarted = false;

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4 )
  var randomChosenColor = buttonColor[randomNumber]

  gamePattern.push(randomChosenColor)

  playSound(randomChosenColor + ".mp3");
  $("#" + randomChosenColor).animate({opacity:0.25}).animate({opacity:1.0})

  level++;
  $("h1").html("Level " + level);
  userClickedPattern = [];
}

function checkAnswer(level){
  console.log(gamePattern);
  console.log(userClickedPattern);
  console.log(level);
  for(var i=0; i< userClickedPattern.length; i++){
    if(gamePattern[i] !== userClickedPattern[i]){
      return false;
    }
  }
  return true;
}

function playSound(name){
  var audioFilePath = "./sounds/" + name;
  var audio = new Audio(audioFilePath);
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function(e){
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour + ".mp3");

  if(!checkAnswer(level)){
    $("body").addClass("game-over");
    playSound("wrong.mp3");
    setTimeout(function(){$("body").removeClass("game-over");}, 1000);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver()；   
    return;
  }

  if(level === userClickedPattern.length){
      setTimeout(function(){nextSequence()}, 1000);
  }
})

function startOver(){
  gamePattern = [];
  gameStarted = false;
  level = 0;
}

$(document).on("keypress",function(){
  if(!gameStarted){
    $("h1").html("Level 0");
    nextSequence();
    gameStarted = true;
  }
})
