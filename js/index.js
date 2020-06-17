//Challenge 1: Your age in days

function ageInDays() {
    var birthYear = prompt('What year were you born?'); 
    var ageToDays = (2020-birthYear) * 365;  
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageToDays + 'days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

//Challenge 2: Dog Generator
function generateDog() {
    var image = document.createElement('img');
    image.src = "https://loremflickr.com/250/250/dog";
    var div = document.getElementById('flex-dog-gen');
    div.appendChild(image);
}

//Challanege 2: Rock, Paper, Scissors
function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;    
    botChoice = numberToChoice(randomNumberInt());
    results = decideWinner(humanChoice, botChoice);
    console.log(results); 
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message)
    
}

function randomNumberInt() {
    return Math.floor(Math.random()*3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, botChoice) {
    var dataBase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0}, 
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    }
    var yourScore = dataBase[yourChoice][botChoice];
    var botScore = dataBase[botChoice][yourChoice];

    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
    if(yourScore===0) {
        return {'message': 'You lost!', 'color': 'red'};
    }   else if(yourScore=== 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    }   else {
        return {'message': 'You won!', 'color': 'green'};
    }

}

function rpsFrontEnd (humanImageChoice, botImageChoice, finalMessage) {
    var imagesDataBase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    //now lets remove old images and replace them with images chosen by human and bot and add final message too
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    //create a few divs
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDataBase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 0.7)'>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size : 60px; padding 30px;'>" + finalMessage['message'] + "</h1>"
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    botDiv.innerHTML = "<img src='" + imagesDataBase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>"
    document.getElementById('flex-box-rps-div').appendChild(botDiv);


}

//Challenge 4: Change the Color of All Buttons
var allButtons = document.getElementsByTagName('button'); //gets all buttons with <button> tag and puts them in an array
console.log(allButtons)
//copy all buttons by iterating and copying from allButtons array. 
var copyAllButtonsclassList = [];
for(let i=0; i<allButtons.length;i++) {
    copyAllButtonsclassList.push(allButtons[i].classList[1]);
}
console.log(copyAllButtonsclassList);
function buttonColorChange (selection) {
    if (selection.value == 'red') {
        buttonsRed();
    } else if (selection.value == 'green') {
        buttonsGreen();
    } else if (selection.value == 'random') {
        buttonsRandom();
    } else if(selection.value == 'reset') {
        buttonsReset();
    }
}

function buttonsRed() {
    for(let i=0; i<allButtons.length; i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for(let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success");
    }
}

function buttonsReset() {
    for(let i=0; i<allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(copyAllButtonsclassList[i]);
    }
}

function buttonsRandom() {
    let choices = ['btn-primary', 'btn-warning', 'btn-danger', 'btn-success'];
    for(let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}