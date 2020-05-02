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
    console.log('addscore is running')
}

const minusScore = () => {
    $('#score').empty();
    score -= 4;
    $('#score').text(score);
    console.log('minusscore is running')

}

const resetScore = () => {
    $('#score').empty();
    score = 0
    $('#score').text(score);
    console.log('resetscore is running')

}

   // Generate ingredients 
   const findImageUrl = (receipe, receipeID) => {
    for (let a = 0; a < receipe.length; a++) {
        for (let i = 0; i < imageObjects.length; i++) {
            if (imageObjects[i].ingredient === receipe[a]) {
                let ingredientImage = $('<img>').attr('src', imageObjects[i].url).addClass('ingredientimage')
                receipeID.append(ingredientImage);
            }
        }
    }
    console.log('find imageurl is running')

};



    //destroy dishes on plate after 15 seconds 

    const destroyPlate = (receipeID, receipeVar, plateId, plateVar) => {
        clearArray(plateVar)
        clearArray(receipeVar)
        plateId.empty();
        receipeID.empty();
        receipeID.removeClass('blink');
        minusScore();
        //generate a new reeceipe
        generateReceipe(receipeID, receipeVar, plateId, plateVar);
        console.log('destroyPlate is running')

    }

    //warns user that the receipe is going to expire 

    const warnuser = (receipeID) => {
        receipeID.addClass('blink');
    }
    let timeOut1;
    let timeOut2;
    let timeOut3;

    let warnUserTimer1;
    let warnUserTimer2;
    let warnUserTimer3;


// timedEvent1 

    function timedEvent1(receipeID, receipeVar, plateId, plateVar,) {
        timeOut1 = setTimeout(function () { destroyPlate(receipeID, receipeVar, plateId, plateVar) }, 15000)
        warnUserTimer1 = setTimeout(function () { warnuser(receipeID) }, 10000)
        console.log(timedEvent1)
    }

    function myStopFunction1() {
        clearTimeout(timeOut1);
        clearTimeout(warnUserTimer1);
    }
//timedEvent2 
    function timedEvent2(receipeID, receipeVar, plateId, plateVar,) {
        timeOut2 = setTimeout(function () { destroyPlate(receipeID, receipeVar, plateId, plateVar) }, 15000)
        warnUserTimer2 = setTimeout(function () { warnuser(receipeID) }, 10000)

    }

    function myStopFunction2() {
        clearTimeout(timeOut2);
        clearTimeout(warnUserTimer2);
    }
//timedEvent3 
    function timedEvent3(receipeID, receipeVar, plateId, plateVar,) {
        timeOut3 = setTimeout(function () { destroyPlate(receipeID, receipeVar, plateId, plateVar) }, 15000)
        warnUserTimer3 = setTimeout(function () { warnuser(receipeID) }, 10000)

    }

    function myStopFunction3() {
        clearTimeout(timeOut3);
        clearTimeout(warnUserTimer2);
    }

    // controlIndex is used to stop generateReceipe function when the game has ended. 
    let controlIndex = 1

    const generateReceipe = (receipeID, receipeVar, plateId, plateVar) => {
        if (controlIndex == 1) {
            let randomIndex = Math.floor(Math.random() * 3);
            let receipeInplay = burgerRecipe[randomIndex].ingredients
            receipeVar.push.apply(receipeVar, receipeInplay);

            console.log(`receipe is ${receipeVar}`)

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

            // timeOut(receipeID, receipeVar, plateId, plateVar, timeoutVar, warnUserTimerVar)
            // console.log(timeOut1)
            // console.log(warnUserTimer1)
            // console.log('generatereceip is running')

        }
        else if (controlIndex == 2) {
            return
        }

    }
    //match ingredients 

    function clearArray(array) {
        while (array.length) {
            array.pop();
        }
    }

    const matchingredients = (plateVar, receipeVar, plateId, receipeID,) => {
        console.log(`on plate: ${plateVar}`);
        console.log(`in receipe: ${receipeVar}`);
        if (plateVar.sort().join(',') === receipeVar.sort().join(',')) {
            clearArray(plateVar);
            console.log(`on plate afterclearing: ${plateVar}`);
            clearArray(receipeVar);
            console.log(plateVar);
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
            console.log('matchingredient is running')

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
        console.log('appendimage is running')

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
                //     classes: {
                //         "ui-droppable": "highlight"
                //       },
                drop: function (event, ui) {
                    const droppedItem = $(ui.draggable).clone();
                    droppedItem.addClass('dropped');
                    plateId.append(droppedItem);
                    const droppedItemId = $(ui.draggable).get(0).id;
                    plateVar.push(droppedItemId);
                    console.log(`dropped on plate: ${plateVar} `)
                    console.log(`before going to match functions ${receipeVar}`);
                    console.log(droppedItemId);
                    // redoButton(plateVar, plateId);
                    matchingredients(plateVar, receipeVar, plateId, receipeID, timeoutVar, warnUserTimerVar);
                }
            })
        console.log('drop is running')

    }

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


    // timer 
    let counter = 20;

    const countdown = () => {
        counter--;
        if (counter >= 0) {
            $('#timer').text(counter)
        }

    }
    let timer;
    const startCountdown = () => {
        timer = setInterval(() => {
            countdown();
        }, 1000);
    }

    // const countDownEnd = () => {
    //     if (counter == 0) {
    //         endgame();
    //     }
    // }


    const resetCounter = () => {
        $('#timer').empty()
        counter = 20
        $('#timer').html(counter)
    }


    //try
    const tryAgain = () => {
        controlIndex = 1

        $('#gameover-modal').css('display', 'none');
        $('#instructions').on('click', openInstructionsmodal);
        $('#close').on('click', closeInstructionsmodal);
        resetScore();
        resetCounter();
        start();

    }

    // highscore.push(score);
    // localStorage.setItem(key, score);
    // let key = 'game_highscore';

    // const maxHighScore = 5 ;


    let highScores = [];
    // localStorage.setItem('highScores', JSON.stringify(highScores))

    // const saveScore = (score) => {
    //     highScores.push(score)
    //     // highScores.sort((a,b) => {
    //     //     return b.score - a.score
    //     // })
    //     // highScores.splice(5)
    // }
    // localStorage.setItem('highScores', JSON.stringify(highScores));
    //endgame 

    const saveScoreToLocalStorage = () => {
        let existing = JSON.parse(localStorage.getItem('highScores'));

        existing.push(score);
        localStorage.setItem('highScores', JSON.stringify(existing));
    }

    const endgameModal = (score) => {
        $('#gameover-modal').css('display', 'block');
        $('#gameovertext').text(`Game Over! Your score is ${score}`)
    }
    const endgame = () => {

        saveScoreToLocalStorage();
        endgameModal(score);
        clearInterval(timer);
        controlIndex = 2
        receipeOne.length = 0;
        receipeTwo.length = 0;
        receipeThree.length = 0;
        plateOne.length = 0;
        plateTwo.length = 0;
        plateThree.length = 0;
        $('.plate').empty();
        $('.receipes').empty();
        $('.receipes').removeClass('blink');
        $('.ingredients').empty()
        // saveScore(score);
        myStopFunction();
        disableDraggable();
        disableDroppable();

    }

    //redo button 

    const redoButton = (plateVar, plateId) => {
        clearArray(plateVar)
        plateId.empty()
    }

    // change modal display to block 
    const openInstructionsmodal = () => {
        $('#instructions-modal').css('display', 'block');
    }

    const closeInstructionsmodal = () => {
        $('#instructions-modal').css('display', 'none');
    }

    const start = () => {

        generateReceipe($('#receipe1'), receipeOne, $('#plates1'), plateOne);
        setTimeout(endgame, 100000);
        setTimeout(function () { generateReceipe($('#receipe2'), receipeTwo, $('#plates2'), plateTwo) }, 3000);
        setTimeout(function () { generateReceipe($('#receipe3'), receipeThree, $('#plates3'), plateThree) }, 5000);
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

        // generatePlate();

    });


    // $('#startGame').on('click', (event) => {
    //     event.preventDefault();
        // apiKey = '48349142edab4b1a83c365e0b5221855'
    //     ingredients = 'chicken,+cheese,+lettuce,+bread'
    //     numberOfReceipeReturn = '30'
    //     ranking = '2'

    //     $.ajax({
            // url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=${numberOfReceipeReturn}&ranking=${ranking}`
    //     }).then(
    //         (data) => {
    //             const title = $('<p>').html(data[0].title);
    //             $('#title').append(title);
    //             $('#title').text(data.title);
    //             $('#image').text(data[0].image);
    //             $('#ingredients').text(data[0].usedIngredients.name);
    //         },
            // () => {
            //     console.log('bad');
            // }
    // });