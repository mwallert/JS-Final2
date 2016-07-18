//Set list of words for the game
var songNames = ['fuel','gallows pole','bring it on home', 'let it be','after midnight', 'raise hell','whole lotta love', 'stairway to heaven'];
//Set list for the steps on Hangman
var hangMan = ["img/step1.png","img/step2.png","img/step3.png","img/step4.png","img/step5.png","img/step6.png"];
//Stores a value to use for the song, generated at random
var randomSong = songNames[Math.floor(Math.random()*songNames.length)];
//function that will alert the game help options when the button is clicked
function helpMe (){
  alert('Hello user! Welcome to my vanilla javascript hangman game! Currently all the words you will be attempting to guess are song names. The game will begin once you click an alphabetical letter or begin typing on your keyboard. Once you have chosen a letter, it will turn red on the alphabet list. If you guessed one of the letters in the game word it will appear in the proper spot. If you guessed incorrectly than the hangman avatar will appear piece by piece. Once the game is over simply refresh the page of click the text near the game word to play again!')
}
//Help variable that stores how many free letters the user has available.
var hintsRemaining;
if(randomSong.length > 5){
  hintsRemaining = 2;
}
else {
  hintsRemaining = 1;
};
//Hint box for the user
function hint (){
  var myHint = document.getElementById('Hint');
  switch(randomSong){
    case('fuel'):
    myHint.innerHTML = 'Band Name: Metallica';
    break;
    case('gallows pole'):
    myHint.innerHTML = 'Band Name: Led Zeppelin';
    break;
    case('bring it on home'):
    myHint.innerHTML = 'Band Name: Led Zeppelin';
    break;
    case('let it be'):
    myHint.innerHTML = 'Band Name: The Beatles';
    break;
    case('after midnight'):
    myHint.innerHTML = 'Band Name: Dorothy';
    break;
    case('raise hell'):
    myHint.innerHTML = 'Band Name: Dorothy';
    break;
    case('whole lotta love'):
    myHint.innerHTML = 'Band Name: Led Zeppelin';
    break;
    case('stairway to heaven'):
    myHint.innerHTML = 'Band Name: Led Zeppelin';
    break;
  }
}
hint();
//Function to give the user a free letter upon request.
var myLetter;
function moreHelp (){
  if(hintsRemaining === 0){
    alert('You have already used all of your free letters.');
  }
  else{
    var index = Math.floor(Math.random()*randomSong.length);
    var randomLetter = randomSong[index];
    myLetter = letterSearch(randomLetter.toUpperCase());
    for(var i = 0; i < randomSong.length; i++){
      if(document.getElementsByClassName('letter')[i].style.color === '#fff'){
        var index = Math.floor(Math.random()*randomSong.length);
        var randomLetter = randomSong[index];
      }
      else if(randomLetter == randomSong[i]){
        document.getElementsByClassName('letter')[i].style.color = '#fff';
        document.getElementsByClassName('letter')[i].style.visibility = 'visible';
        document.getElementsByClassName('cells')[myLetter].style.color = 'red';
        correctLetter++;
      }
    }
    hintsRemaining--;
  }
}
//Create table boxes for the game word
function createTableElement(numCols) {
  var table = document.createElement('table');
  var row = document.createElement('tr');
  for(var c = 0; c<numCols; c++){
      var cell = document.createElement('td');
      cell.className += 'cell';
      var letter = document.createElement('div');
      letter.className += 'letter';
      row.appendChild(cell);
      cell.appendChild(letter);
  }
  table.appendChild(row);
  return table;
}
//Creates table for the alphabet
function createTableElements(numCols) {
  var table = document.createElement('table');
  var row = document.createElement('tr');
  for(var c = 0; c<numCols; c++){
      var cell = document.createElement('td');
      cell.className += 'cells';
      row.appendChild(cell);
  }
  table.appendChild(row);
  return table;
}

//Function to insert the letter of the song name in each box, one letter at a time
function insertLetter () {
  for(var l = 0; l<(randomSong.length); l++){
      var letter = randomSong.split('');
      //Checks to see if the index in the array is a blank space, converts to uppercase if the index is not a blank space
      if(letter[l]!==" "){
        letter[l] = letter[l].toUpperCase();
      }
      document.getElementsByClassName('letter')[l].innerHTML = letter[l];
      //If the letter is a blank space, changes the background color to represent the blank space
      if(letter[l]===" "){
        document.getElementsByClassName('cell')[l].style.backgroundColor = "blue";
      }
  }
}
//Inserts alphabet into the grid array
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N",'O','P',"Q",'R','S','T','U','V','W','X','Y','Z'];
function insertAlphabet (numCols) {
  for(var l = 0; l<numCols; l++){
      document.getElementsByClassName('cells')[l].innerHTML = alphabet[l];
      document.getElementsByClassName('cells')[l].style.color = '#fff';
  }
}
//Target element for the table
var wordGrid = document.getElementById('Word');

//Creates the table for the word
var setWord = createTableElement(randomSong.length);

//Appends the table to the target element, sending the table to the dom
wordGrid.appendChild(setWord);

//Table element for the available letters grid
var letterGrid = document.getElementById('Letters');
var setLetters = createTableElements(26);
letterGrid.appendChild(setLetters);

//Inserts the letter into each element of the table
insertLetter();
insertAlphabet(26);
//Function that hides the game word
function wordHide () {
  for(var i = 0; i < randomSong.length; i++){
    document.getElementsByClassName('letter')[i].style.visibility = 'hidden';
  }
}
wordHide();
//Funtion that changes the alphabet array for when a letter is inputed by the user
function changeAlphabet (letter) {
  document.getElementsByClassName('cells')[letter].style.color = 'red';
}
//Loop to add an Eventlistener to each element in order to change the box to red when clicked, informing the user this letter has been used.
var thisClickedLetter;
for(var i = 0; i < alphabet.length; i++){
  document.getElementsByClassName('cells')[i].addEventListener('click', function(){
    thisClickedLetter = String(this.innerHTML.toLowerCase());
    thisLetter = thisClickedLetter;
    gameOn();
  });
}
//Function that searches for the letter inputed by the user in the alphabet array
function letterSearch (letter){
  for(var i = 0; i < alphabet.length; i++){
    if(letter == alphabet[i]){
      return i;
    }
  }
}
//Variable to save the letter pressed by the user
var thisLetter;
//Function to determine which letter was chosen by the user
function getChar (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.onClick;
    var charStr = String.fromCharCode(charCode);
    thisLetter = charStr;
    gameOn();
  }
//Function to check if the inputed letter is part of the game word
function checkLetter (letter) {
  for(var w = 0; w < randomSong.length; w++){
    if(letter === randomSong[w]){
      return 'true';
    }
    else if(w == randomSong.length - 1){
      return 'false';
    }
  }
}
//Function that creates a button to refresh the page when the game is finished
function refreshThis(){
  var myBut = document.createElement('button');
  myBut.className = 'helpButton';
  var myRefresh = document.createElement('a');
  myRefresh.href = 'https://mwallert.github.io/JS-Hangman';
  myRefresh.innerHTML = 'Click here to play again!';
  myBut.appendChild(myRefresh);
  document.getElementById('Help').appendChild(myBut);
}
//Variable for total attemps used
var attempts = 6;
//Variable for the new hangman state
var imageState = 0;
//Variable for total times user guessed a correct letter
var correctLetter = 0;
//Function that plays the Hang Man Game when a key on the keyboard is pressed or a letter is clicked
function gameOn(){
  myLetter = letterSearch(thisLetter.toUpperCase());
  if(document.getElementsByClassName('cells')[myLetter].style.color === 'red'){
    alert('This letter has already been used. Please pick a different letter.');
  }
  else {
    changeAlphabet(myLetter);
    var totalLetters = (randomSong.replace(/[^a-zA-Z0-9]/g, "")).length;
    while(attempts > 0){
      for(var i = 0; i < randomSong.length; i++){
        if(thisLetter == randomSong[i]){
          document.getElementsByClassName('letter')[i].style.visibility = 'visible';
          document.getElementsByClassName('letter')[i].style.color = '#fff';
          correctLetter += 1;
        }
        else if(checkLetter(thisLetter) == 'false'){
          document.getElementById('Gallow').style.visibility = 'visible';
          document.getElementById('Gallow').src = hangMan[imageState];
          imageState += 1;
          attempts -= 1;
          break;
        }
      }
      if(attempts === 0){
        alert('You Lose!! Refresh page to try again!');
        refreshThis();
      }
      else if(correctLetter == totalLetters){
        alert('You win! Congradulations!Please refresh the page to try again!');
        refreshThis();
      }
      break;
    }
  }
}
//Eventlistener for the page
document.addEventListener('keypress', getChar);
