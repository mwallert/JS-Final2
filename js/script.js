//Set list of words for the game
var songNames = ['fuel','gallows pole','bring it on home', 'let it be','after midnight', 'raise hell'];
//Set list for the steps on Hangman
var hangMan = ["img/step1.png","img/step2.png","img/step3.png","img/step4.png","img/step5.png","img/step6.png"];
//Stores a value to use for the song, generated at random
var randomSong = songNames[Math.floor(Math.random()*6)];

//Create table boxes for the game word
function createTableElement(numCols) {
  var table = document.createElement('table');
  var row = document.createElement('tr');
  for(var c = 0; c<numCols; c++){
      var cell = document.createElement('td');
      cell.className += 'cell';
      row.appendChild(cell);
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
      document.getElementsByClassName('cell')[l].innerHTML = letter[l];
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
    document.getElementsByClassName('cell')[i].style.color = "transparent";
  }
}
wordHide();
//Function that adds a class name
function addClass(element, classname) {
  element.className = 'cells ' + classname;
}
//Funtion that changes the alphabet array for when a letter is inputed by the user
function changeAlphabet (letter) {
  document.getElementsByClassName('cells')[letter].style.color = 'red';
}
//Loop to add an Eventlistener to each element in order to change the box to red when clicked, informing the user this letter has been used.
var thisClickedLetter;
for(var i = 0; i < alphabet.length; i++){
  document.getElementsByClassName('cells')[i].addEventListener('click', function(){
    this.style.color = 'red';
    thisClickedLetter = String(this.innerHTML.toLowerCase());
  });
}
//Function that searches for the letter inputed by the user in the alphabet array
var myLetter;
function letterSearch (letter){
  for(var i = 0; i < alphabet.length; i++){
    if(letter == alphabet[i]){
      myLetter = i;
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
//Variable for total attemps used
var attempts = 6;
//Variable for the new hangman state
var imageState = 0;
//Variable for total times user guessed a correct letter
var correctLetter = 0;
//Function that plays the Hang Man Game when a key on the keyboard is pressed
function gameOn(){
  getChar();
  letterSearch(thisLetter.toUpperCase());
  changeAlphabet(myLetter);
  var totalLetters = (randomSong.replace(/[^a-zA-Z0-9]/g, "")).length;
  while(attempts > 0){
    for(var i = 0; i < randomSong.length; i++){
      if(thisLetter == randomSong[i]){
        document.getElementsByClassName('cell')[i].style.color = '#fff';
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
    }
    else if(correctLetter == totalLetters){
      alert('You win! Congradulations!Please refresh the page to try again!');
    }
    break;
  }
}
//Function to start the game when a letter is clicked by the user
function gameOnClick (){
  thisLetter = thisClickedLetter;
  letterSearch(thisLetter.toUpperCase());
  changeAlphabet(myLetter);
  var totalLetters = (randomSong.replace(/[^a-zA-Z0-9]/g, "")).length;
  while(attempts > 0){
    for(var i = 0; i < randomSong.length; i++){
      if(thisLetter == randomSong[i]){
        document.getElementsByClassName('cell')[i].style.color = '#000';
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
    }
    else if(correctLetter == totalLetters){
      alert('You win! Congradulations!Please refresh the page to try again!');
    }
    break;
  }
}
//Eventlistener for the page
document.addEventListener('keypress', gameOn);
document.addEventListener('click', gameOnClick);
