console.log('app connected!')


let plateOne = [];
let plateTwo = [];
let plateThree = [];


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

let receipeOne = [];
let receipeTwo = [];
let receipeThree = [];

// Generate the types of dishes 
const findImageUrl = (receipe, receipeID) => {
    const flattenReceipe = receipe.flat();
    for (let a = 0; a < flattenReceipe.length; a++){
        for (let i =0; i< imageObjects.length; i++){
            if (imageObjects[i].ingredient === flattenReceipe[a]) {
                let ingredientImage = $('<img>').attr('src',imageObjects[i].url).addClass('ingredientimage')
                receipeID.append(ingredientImage);
            }
        }
    }
};


const generateDishes = (receipeID, receipe) => {
    let randomIndex = Math.floor(Math.random() * 3);
    let receipeInplay = burgerRecipe[randomIndex].ingredients
    console.log(`receipe is ${receipeInplay}`)
    receipe.push(receipeInplay);
    const $mainImg = $('<img>')
        $mainImg.attr({
        "id": "mainImg",
        "src": burgerRecipe[randomIndex].dishImage,
    })
    receipeID.append($mainImg);
    findImageUrl(receipe, receipeID);
}

//match ingredients 

const matchingredients = (plate, receipe, plateId,receipeID) => {
    if (plate.sort().join(',') === receipe.sort().join(',')) {
        plate = [];
        console.log(plate)
        plateId.empty();
        receipeID.empty();
        addScore();
        generateDishes(receipeID);
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
    $('.draggable').draggable({ helper: 'clone' });
}


const dropObject = (plateId, platevariable, receipe, receipeID) => {
    plateId.droppable(
        {
            accept: '.draggable',
            drop: function (ev, ui) {
                const droppedItem = $(ui.draggable).clone()
                plateId.append(droppedItem);
                console.log(droppedItem)
                const droppedItemId = $(ui.draggable).get(0).id
                platevariable.push(droppedItemId);
                let flattenReceipe = receipe.flat();
                console.log(platevariable);
                console.log(droppedItemId);
                matchingredients(platevariable, flattenReceipe, plateId, receipeID);
            }
        })
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



// const dishMade = () => {
//     if 
// }

const start = () => {
    appendImage();
    dragObject();
    dropObject($('#plates1'), plateOne, receipeOne, $('#receipe1'));
    dropObject($('#plates2'), plateTwo, receipeTwo, $('#receipe2'));
    dropObject($('#plates3'), plateThree, receipeThree, $('#receipe3'));
    startCountdown();
    generateDishes($('#receipe1'), receipeOne);
    generateDishes($('#receipe2'), receipeTwo);
    generateDishes($('#receipe3'), receipeThree);
}

$(() => {
    $('#startGame').on('click',start)

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