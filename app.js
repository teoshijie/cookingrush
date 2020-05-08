console.log('app connected!')

let imageObjects = [
    {
        ingredient: "chicken",
        url: "https://i.ibb.co/r6x4hC1/whole-chicken.png"
    },
    {
        ingredient: "cheese",
        url: "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
    },
    {
        ingredient: "tomato",
        url: "https://spoonacular.com/cdn/ingredients_100x100/tomato.png"
    },
    {
        ingredient: "lettuce",
        url: "https://i.ibb.co/xgLq9gv/iceberg-lettuce.png"
    }
]

let burgerRecipe = [
    {
        dish: 'Burger',
        dishImage: 'https://farm5.staticflickr.com/4900/46565460901_a2cd047abc.jpg',
        ingredients: ["chicken", "cheese", "lettuce"]
    },
    {
        dish: 'Chicken Burger',
        dishImage: "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
        ingredients: ["chicken", "cheese", "lettuce", "tomato"]
    },
    {
        dish: 'Vegetarian Burger',
        dishImage: "https://i.ibb.co/KGJCTv0/vegesub.png",
        ingredients: ["cheese", "lettuce", "tomato"]
    },
    {
        dish: 'Cheese Burger',
        dishImage: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
        ingredients: ["cheese", "tomato", "chicken"]
    },
    {
        dish: 'Chicken Tomato Burger',
        dishImage: "https://www.ambitiouskitchen.com/wp-content/uploads/2016/07/chickenburgers-2.jpg",
        ingredients: ["tomato", "chicken"]
    },
];


//Array to store the current receipe that the player needs to cook 
let receipeOne = [];
let receipeTwo = [];
let receipeThree = [];

// Array to store the ingredients that is on the plate 
let plateOne = [];
let plateTwo = [];
let plateThree = [];

//Scoring function. If player gets a match, he will get 10 points. 
// If he fails to complete the receipe in 15 seconds, he will be lose 4 points 
let score = 0;

const addScore = () => {
    $('#score').empty()
    score += 10
    $('#score').text(score)
}

const minusScore = () => {
    $('#score').empty();
    score -= 4;
    $('#score').text(score);
}

const resetScore = () => {
    $('#score').empty();
    score = 0
    $('#score').text(score);
}

//sound effects

const playEffect = (ID) => {
    ID[0].play()
}



/**
 * retrive access the ingredients for each receipe and retrive the images from imageObjects. 
 * @param {receipeOne,receipeTwo,receipeThree} receipeVar 
 * @param {Jquery receipe ID} receipeID 
 */
const findImageUrl = (receipeVar, receipeID) => {
    for (let a = 0; a < receipeVar.length; a++) {
        for (let i = 0; i < imageObjects.length; i++) {
            if (imageObjects[i].ingredient === receipeVar[a]) {
                let ingredientImage = $('<img>').attr('src', imageObjects[i].url).addClass('ingredientimage')
                receipeID.append(ingredientImage);
            }
        }
    }
};

let timeOut1;
let timeOut2;
let timeOut3;

let warnUserTimer1;
let warnUserTimer2;
let warnUserTimer3;
//Create a timed event whereby users have 10 seconds to make the receipe. If user fail, 4 points will be deducted.
// When 4 seconds is left, there will be beep sound and the receipe will flash red.  

/**
 * If user failed to make the receipe after 10 seconds clearplate, deduct score and trigger sound effect
 * @param {Jquery receipe ID} receipeID 
 * @param {receipeOne,receipeTwo,receipeThree} receipeVar 
 * @param {Jquery plate ID} plateId 
 * @param {plateOne,plateTwo, plateThree} plateVar 
 */
const destroyPlate = (receipeID, receipeVar, plateId, plateVar) => {
    playEffect($('audio#destroyed'))
    clearArray(plateVar)
    clearArray(receipeVar)
    plateId.empty();
    receipeID.empty();
    receipeID.removeClass('blink');
    minusScore();
    //generate a new reeceipe
    generateReceipe(receipeID, receipeVar, plateId, plateVar);

}

//warns user that the receipe is going to expire 

const warnuser = (receipeID) => {
    receipeID.addClass('blink');
    playEffect($('audio#alert'))
}

//  Create a timedEvent and a corresponding cleartimeout for each columns. 

//timedEvent 1
function timedEvent1(receipeID, receipeVar, plateId, plateVar, ) {
    timeOut1 = setTimeout(function () { destroyPlate(receipeID, receipeVar, plateId, plateVar) }, 10000)
    warnUserTimer1 = setTimeout(function () { warnuser(receipeID) }, 6000)
}

function myStopFunction1() {
    clearTimeout(timeOut1);
    clearTimeout(warnUserTimer1);
}

//timedEvent2 
function timedEvent2(receipeID, receipeVar, plateId, plateVar, ) {
    timeOut2 = setTimeout(function () { destroyPlate(receipeID, receipeVar, plateId, plateVar) }, 10000)
    warnUserTimer2 = setTimeout(function () { warnuser(receipeID) }, 6000)

}

function myStopFunction2() {
    clearTimeout(timeOut2);
    clearTimeout(warnUserTimer2);
}

//timedEvent3 
function timedEvent3(receipeID, receipeVar, plateId, plateVar, ) {
    timeOut3 = setTimeout(function () { destroyPlate(receipeID, receipeVar, plateId, plateVar) }, 10000)
    warnUserTimer3 = setTimeout(function () { warnuser(receipeID) }, 6000)

}

function myStopFunction3() {
    clearTimeout(timeOut3);
    clearTimeout(warnUserTimer3);
}



// controlIndex is used to stop generateReceipe function from running when the game has ended. 
let controlIndex = 1
/**
 * Generate receipe and append images to each receipeID 
 * push ingredients into each a receipeVar 
 * Call timedevent to start countdown 
 * @param {Jquery receipe ID} receipeID 
 * @param {receipeOne,receipeTwo,receipeThree} receipeVar 
 * @param {Jquery plate ID} plateId 
 * @param {plateOne,plateTwo, plateThree} plateVar 
 */

const generateReceipe = (receipeID, receipeVar, plateId, plateVar) => {
    if (controlIndex == 1) {
        let randomIndex = Math.floor(Math.random() * 4);
        let receipeInplay = burgerRecipe[randomIndex].ingredients
        receipeVar.push.apply(receipeVar, receipeInplay);

        const $mainImg = $('<img>')
        $mainImg.attr({
            "id": "mainImg",
            "src": burgerRecipe[randomIndex].dishImage,
        })
        receipeID.append($mainImg);
        findImageUrl(receipeVar, receipeID);

        if (receipeID.is($('#receipe1'))) {
            timedEvent1(receipeID, receipeVar, plateId, plateVar);
        }
        else if (receipeID.is($('#receipe2'))) {
            timedEvent2(receipeID, receipeVar, plateId, plateVar);
        }
        else if (receipeID.is($('#receipe3'))) {
            timedEvent3(receipeID, receipeVar, plateId, plateVar);
        }
    }
    else if (controlIndex == 2) {
        return
    }

}
//clear array 

function clearArray(array) {
    while (array.length) {
        array.pop();
    }
}
/**
 * matches existing receipe stored in ReceipeID with plateVar. 
 * If ingredients in receipeVar == plateVar, 10 points is awarded to player.
 * ReceipeVar and plateVar will be cleared and a new set of receipe will be generated
 * @param {Jquery receipe ID} receipeID 
 * @param {receipeOne,receipeTwo,receipeThree} receipeVar 
 * @param {Jquery plate ID} plateId 
 * @param {plateOne,plateTwo, plateThree} plateVar 
 */

const matchingredients = (plateVar, receipeVar, plateId, receipeID, ) => {
    if (plateVar.sort().join(',') === receipeVar.sort().join(',')) {
        playEffect($('audio#matched'))
        clearArray(plateVar);
        clearArray(receipeVar);
        plateId.empty();
        receipeID.empty();
        addScore();
        if (receipeID.is($('#receipe1'))) {
            myStopFunction1();
        }
        else if (receipeID.is($('#receipe2'))) {
            myStopFunction2();
        }
        else if (receipeID.is($('#receipe3'))) {
            myStopFunction3();
        }
        receipeID.removeClass('blink');
        generateReceipe(receipeID, receipeVar, plateId, receipeID);

    }
}

//Generate draggable ingredients 

const appendImage = () => {
    for (let i = 0; i < imageObjects.length; i++) {
        const draggableDiv = $('<div>').addClass('draggable').attr('id', imageObjects[i].ingredient);
        const imageIng = $('<img>').attr('src', imageObjects[i].url).addClass('eachIngredient');
        draggableDiv.append(imageIng);
        $('.ingredients').append(draggableDiv);
    }

}

const dragObject = () => {
    $('.draggable').draggable({
        helper: 'clone',
        disabled: false,
    });
}

const dropObject = (plateId, plateVar, receipeVar, receipeID, timeoutVar, warnUserTimerVar) => {
    plateId.droppable(
        {
            accept: '.draggable',
            disabled: false,
            drop: function (event, ui) {
                const droppedItem = $(ui.draggable).clone();
                droppedItem.addClass('dropped');
                plateId.append(droppedItem);
                const droppedItemId = $(ui.draggable).get(0).id;
                plateVar.push(droppedItemId);
                matchingredients(plateVar, receipeVar, plateId, receipeID, timeoutVar, warnUserTimerVar);
            }
        })

}

// disable Draggable and Droppable when game has ended
const disableDraggable = () => {
    $(".draggable").draggable({
        disabled: true
    });
}

const disableDroppable = () => {
    $("#plates1, #plates2, #plates3").droppable({
        disabled: true
    });
}

const disableDraggableevent = (number) => {
    setTimeout(disableDraggable, number)
}





//Generate Random Trivia 

const FOODAPI = 'https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}';

const generateTrivia = () => {
    $('#trivia').empty()

    let apiKey = '48349142edab4b1a83c365e0b5221855'
    $.ajax({
        url: `https://api.spoonacular.com/food/trivia/random?apiKey=${apiKey}`
    }).then(
        (data)=>{
            $('#trivia').html(data.text);
        },
        ()=>{
            console.log('bad');
        }
    );
    }

// Allow player to try playing the game again
const tryAgain = () => {
    controlIndex = 1
    $('#gameover-modal').css('display', 'none');
    $('#instructions').on('click', openInstructionsmodal);
    $('#close').on('click', closeInstructionsmodal);
    $('.highScore').on('click', openHighScoreModal);
    $('#closeHighScore').on('click', closeHighScoreModal);;
    resetScore();
    resetCounter();
    start();

}
// Create high Score board 
let highScores = [];

const updateHighScoreArray = () => {
    clearArray(highScores);
    let currentHighScores = JSON.parse(localStorage.getItem('highScores'));
    let allscores = Object.values(currentHighScores);
    let sortScores = allscores.sort((a, b) => b - a); 
    highScores = sortScores.slice(0,5)
    updateHighScoreBoard();
}

const updateHighScoreBoard = () => {
    $('li').remove();
    for (let i = 0; i < highScores.length; i++) {
        const newlist = $('<li>').text(highScores[i]).addClass('list');
        $('#scores').append(newlist);
    }
}


const saveScoreToLocalStorage = () => {
    let existing = JSON.parse(localStorage.getItem('highScores')) || [];

    existing.push(score);
    localStorage.setItem('highScores', JSON.stringify(existing));
}

// When game ends, a modal will popup asking if player wants to try again or view high score 
const endgameModal = (score) => {
    $('#gameover-modal').css('display', 'block');
    $('#gameovertext').text(`Game Over! Your score is ${score}`)
}

const collectionOfVar = [receipeOne, receipeTwo, receipeThree, plateOne, plateTwo, plateThree]

const clearArrays = (array) => {
    for (let i =0; i < array.length; i++) {
        clearArray(array[i])
    }
}
// Endgame function which turns off all game functions
// A modal will be displayed with the score and the score will be saved to local storage
const endgame = () => {
    generateTrivia();
    saveScoreToLocalStorage();
    endgameModal(score);
    updateHighScoreArray();
    updateHighScoreBoard();
    clearInterval(timer);
    controlIndex = 2
    clearArrays(collectionOfVar)
    $('.plate').empty();
    $('.receipes').empty();
    $('.receipes').removeClass('blink');
    $('.ingredients').empty()
    myStopFunction1();
    myStopFunction2();
    myStopFunction3();

    disableDraggable();
    disableDroppable();

}


// Timer function 
let counter = 30;

const countdown = () => {
    counter --
    if (counter >= 0) {
        $('#timer').text(counter)
    }
    else if (counter < 0) {
        endgame();
    }

}

let timer;
const startCountdown = () => {
    timer = setInterval(() => {
        countdown();
    }, 1000);
}

const resetCounter = () => {
    $('#timer').empty()
    counter = 30
    $('#timer').html(counter)
}


//If player put the wrong ingredient on the plate, he is able to clear the plate

const redoButton = (plateVar, plateId) => {
    clearArray(plateVar)
    plateId.empty()
}

// change instructions modal display to block 
const openInstructionsmodal = () => {
    $('#instructions-modal').css('display', 'block');
}

const closeInstructionsmodal = () => {
    $('#instructions-modal').css('display', 'none');
}
//change highscore modal display to block 

const openHighScoreModal = () => {
    $('#highScore-modal').css('display', 'block');
    updateHighScoreArray()

}

const closeHighScoreModal = () => {
    $('#highScore-modal').css('display', 'none');
}


const start = () => {

    generateReceipe($('#receipe1'), receipeOne, $('#plates1'), plateOne);
    setTimeout(function () { generateReceipe($('#receipe2'), receipeTwo, $('#plates2'), plateTwo) }, 3000);
    setTimeout(function () { generateReceipe($('#receipe3'), receipeThree, $('#plates3'), plateThree) }, 6000);
    appendImage();
    dragObject();
    dropObject($('#plates1'), plateOne, receipeOne, $('#receipe1'));
    dropObject($('#plates2'), plateTwo, receipeTwo, $('#receipe2'));
    dropObject($('#plates3'), plateThree, receipeThree, $('#receipe3'));
    startCountdown();
    $('#startGame').off('click')
}


$(() => {
    $('#startGame').on('click', start)

    $('#instructions').on('click', openInstructionsmodal);
    $('#close').on('click', closeInstructionsmodal);

    $('.highScore').on('click', openHighScoreModal);
    $('#closeHighScore').on('click', closeHighScoreModal);

    $('#tryagain').on('click', tryAgain);

    $('#redo1').on('click', function () {
        clearArray(plateOne);
        $('#plates1').empty();
    })
    $('#redo2').on('click', function () {
        clearArray(plateTwo);
        $('#plates2').empty();
    })
    $('#redo3').on('click', function () {
        clearArray(plateThree);
        $('#plates3').empty();
    })


   

});

