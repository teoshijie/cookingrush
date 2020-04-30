console.log('app connected!')

let imageObjects = [
    {
        ingredient: "chicken",
        url: "https://spoonacular.com/cdn/ingredients_100x100/whole-chicken.jpg"
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
        url: "https://spoonacular.com/cdn/ingredients_100x100/iceberg-lettuce.jpg"
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
        dishImage: "https://farm5.staticflickr.com/4900/46565460901_a2cd047abc.jpg",
        ingredients: ["cheese", "lettuce", "tomato"]
    },
    {
        dish: 'Cheese Burger',
        dishImage: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
        ingredients: ["cheese", "tomato", "chicken"]
    },
];

//Scoring function. If player gets a match, he will get 10 points 
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

let receipeOne = [];
let receipeTwo = [];
let receipeThree = [];

let plateOne = [];
let plateTwo = [];
let plateThree = [];

//destroy dishes on plate after 10 seconds 

const destroyPlate = (receipeID, receipeVar, plateId, plateVar) => {
    clearArray(plateVar)
    clearArray(receipeVar)
    plateId.empty();
    receipeID.empty();
    receipeID.removeClass('blink');
    minusScore();
    generateDishes(receipeID, receipeVar, plateId, plateVar);


}

//warns user that time plate is going to expire 

const warnuser = (receipeID) => {
    receipeID.addClass('blink');
}



// Generate the types of dishes 
const findImageUrl = (receipe, receipeID) => {
    for (let a = 0; a < receipe.length; a++) {
        for (let i = 0; i < imageObjects.length; i++) {
            if (imageObjects[i].ingredient === receipe[a]) {
                let ingredientImage = $('<img>').attr('src', imageObjects[i].url).addClass('ingredientimage')
                receipeID.append(ingredientImage);
            }
        }
    }
};

let timeOut = " ";
let warnUserTimer = " ";



// setTimeout(function() {destroyPlate(receipeID, receipeVar,plateId,plateVar)},15000)
// setTimeout(function() {warnuser(receipeID)},5000)
function timedCount(receipeID, receipeVar, plateId, plateVar) {
    timeout = setTimeout(function () { destroyPlate(receipeID, receipeVar, plateId, plateVar) }, 15000)
    warnUserTimer = setTimeout(function () { warnuser(receipeID) }, 5000)
}

const generateDishes = (receipeID, receipeVar, plateId, plateVar) => {
    let randomIndex = Math.floor(Math.random() * 3);
    let receipeInplay = burgerRecipe[randomIndex].ingredients
    receipeVar.push.apply(receipeVar, receipeInplay);
    console.log(receipeOne);
    console.log(receipeTwo);
    console.log(`receipe is ${receipeVar}`)

    const $mainImg = $('<img>')
    $mainImg.attr({
        "id": "mainImg",
        "src": burgerRecipe[randomIndex].dishImage,
    })
    receipeID.append($mainImg);
    findImageUrl(receipeVar, receipeID);

    timedCount(receipeID, receipeVar, plateId, plateVar)

}


function myStopFunction() {
    clearTimeout(timeOut);
    clearTimeout(warnUserTimer);
}


//match ingredients 

function clearArray(array) {
    while (array.length) {
        array.pop();
    }
}

const matchingredients = (plateVar, receipeVar, plateId, receipeID) => {
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
        myStopFunction();
        receipeID.removeClass('blink');
        generateDishes(receipeID, receipeVar, plateId, receipeID);
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

const dropObject = (plateId, plateVar, receipeVar, receipeID) => {
    plateId.droppable(
        {
            accept: '.draggable',
            //     classes: {
            //         "ui-droppable": "highlight"
            //       },
            drop: function (event, ui) {
                const droppedItem = $(ui.draggable).clone()
                $(this).addClass("dropped")
                plateId.append(droppedItem);
                const droppedItemId = $(ui.draggable).get(0).id
                plateVar.push(droppedItemId);
                console.log(`dropped on plate: ${plateVar} `)
                console.log(`before going to match functions ${receipeVar}`);
                console.log(droppedItemId);
                matchingredients(plateVar, receipeVar, plateId, receipeID);
            },
            over: function (event, ui) {

            }
        })
}

const disableDraggable = () => {
    $(".draggable").draggable({
        disabled: true
    });
}

const disableDraggableevent = (number) => {
    setTimeout(disableDraggable, number)
}


// timer 
let counter = 100;

const countdown = () => {
    counter--;
    if (counter >= 0) {
        $('#timer').html(counter)
    }
}

const startCountdown = () => {
    setInterval(() => {
        countdown();
    }, 1000);
}

//remove ingredients on plate [not working]

const removeIngredients = () => {
    $(event.currentTarget).children().remove();
    console.log($event.currentTarget);
}

const endgame = () => {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

// change modal display to block 
const openInstructionsmodal = () => {
    $('#instructions-modal').css('display', 'block');
}

const closeInstructionsmodal = () => {
    $('#instructions-modal').css('display', 'none');
}

const start = () => {
    generateDishes($('#receipe1'), receipeOne, $('#plates1'), plateOne);
    setTimeout(function(){generateDishes($('#receipe2'), receipeTwo, $('#plates2'), plateTwo)}, 3000);
    setTimeout(function(){generateDishes($('#receipe3'), receipeThree, $('#plates3'), plateThree)},5000);
    appendImage();
    dragObject();
    dropObject($('#plates1'), plateOne, receipeOne, $('#receipe1'));
    dropObject($('#plates2'), plateTwo, receipeTwo, $('#receipe2'));
    dropObject($('#plates3'), plateThree, receipeThree, $('#receipe3'));
    startCountdown();
    disableDraggableevent(100000);
}

$(() => {
    $('#startGame').one('click', start)
    $('.plate').on('click', removeIngredients);
    $('.popuptext').on('click', endgame);
    $('#instructions').on('click', openInstructionsmodal);
    $('#close').on('click', closeInstructionsmodal);
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