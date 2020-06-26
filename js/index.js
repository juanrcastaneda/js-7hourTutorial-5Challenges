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

//Challenge 5
let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2 , '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']

const hitSound = new Audio('../sound/swish.m4a');
const winSound = new Audio('../sound/cash.mp3');
const lossSound = new Audio('../sound/aww.mp3');



document.querySelector('#hit').addEventListener('click', blackjackHit); //better to use than onclick="fucntion(this)" in your html or onchange
document.querySelector('#deal').addEventListener('click', blackjackDeal);
document.querySelector('#stand').addEventListener('click', dealerLogic);

function blackjackHit() {
    if(blackJackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    }

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex]
}

function showCard(card, activePlayer) {
    if(activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `../img/${card}.png`;
        cardImage.style.width = '80px';
        cardImage.style.height = '120px';
        cardImage.style.margin = '10px';
        document.querySelector(activePlayer['div']).appendChild(cardImage); 
        hitSound.play();
    }
}

function blackjackDeal() {
    if(blackJackGame['turnsOver'] === true) {
        blackJackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for(let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        document.querySelector('#blackjack-result').textContent = 'Lets Play';
        document.querySelector('#blackjack-result').style.color = 'black';
        blackJackGame['turnsOver'] = true;
    }
}
function updateScore(card, activePlayer) {
    //if adding 11 keeps me below 21, add 11. Otherwise, add 1.
    if(card === 'A') {
        if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}



function showScore(activePlayer) {
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function dealerLogic() {
    blackJackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackJackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

        blackJackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
}

function computeWinner() {
    let winner;

    if(YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackJackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackJackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackJackGame['draws']++;
        }      
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
            blackJackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
            blackJackGame['draws']++;
        }
    console.log("Winner is ", winner);
    return winner;
    }

    function showResult(winner) {
        if(blackJackGame['turnsOver'] === true) {

        
        let message, messageColor;

        if(winner === YOU) {
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if(winner === DEALER) {
            document.querySelector('#losses').textContent = blackJackGame['losses'];
            message = "You lost!";
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackJackGame['draws'];
            message = "You drew!";
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        }
    }
//7:08:00