//Set list of words for the game
var songNames = ['fuel','gallows pole','bring it on home', 'let it be','after midnight', 'raise hell'];
//Set list for the steps on Hangman
var hangMan = ["img/step1.png"];
//Stores a value to use for the song, generated at random
var randomSong = songNames[Math.floor(Math.random()*6)];

//Create table boxes for the game
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

//Function to insert the letter of the song name in each box, one letter at a time
function insertLetter () {
  for(var l = 0; l<(randomSong.length); l++){
      var letter = randomSong.split('');
      //Checks to see if the index in the array is a blank space, converts to uppercase if the index is not a blank space
      if(letter[l]!==" "){
        letter[l] = letter[l].toUpperCase();
      }
      document.getElementsByTagName('td')[l].innerHTML = letter[l];
      //If the letter is a blank space, changes the background color to represent the blank space
      if(letter[l]===" "){
        document.getElementsByTagName('td')[l].style.backgroundColor = "blue";
      }
  }
}

//Target element for the table
var wordGrid = document.getElementById('Word');

//Creates the table for the word
var setWord = createTableElement(randomSong.length);

//Appends the table to the target element, sending the table to the dom
wordGrid.appendChild(setWord);

//Inserts the letter into each element of the table
insertLetter();

var thisLetter;
//Function to determine which letter was chosen by the user
function getChar (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    thisLetter = charStr;}
//Function to check if the inputed letter is part of the game word
function checkLetter(){
  getChar();
  var letter = randomSong.split('');
  var i = 0;
  while(i<randomSong.length){
    if(thisLetter==letter[i]){
      //Stuff happens
      break;
    }
    else //Stuff Happens
    i++;
  }
}
//Eventlistener for the page
document.addEventListener('keypress', checkLetter);
