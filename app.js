console.log('app connected!')
apiKey = '48349142edab4b1a83c365e0b5221855'
numberOfReceipeReturn = '1'


let plateOne = [];

const images = ["https://spoonacular.com/cdn/ingredients_100x100/whole-chicken.jpg",
    "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png",
    "https://spoonacular.com/cdn/ingredients_100x100/tomato.png",
    "https://spoonacular.com/cdn/ingredients_100x100/iceberg-lettuce.jpg"]


const ingredientName = ['chicken', 'cheese', 'tomato', 'lettuce'];

let recipes = ['chicken', 'cheese', 'tomato',]

// let recipes = [
//     {
//         dish: 'Burger',
//         ingredients: ["chicken", "cheese", "lettuce"]
//     },
//     {
//         dish: 'Chicken Burger',
//         ingredients: ["chicken", "cheese", "lettuce", "tomato"]
//     },
//     {
//         dish: 'Vegetarian Burger',
//         ingredients: ["cheese", "lettuce", "tomato"]
//     },
//     {
//         dish: 'Burger',
//         ingredients: ["cheese", "tomato", "chicken"]
//     },
// ];

let imageObjects = [
    {

        chicken: "https://spoonacular.com/cdn/ingredients_100x100/whole-chicken.jpg"
    },
    {

        cheese: "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
    },
    {

        tomato: "https://spoonacular.com/cdn/ingredients_100x100/tomato.png"
    },
    {
        lettuce: "https://spoonacular.com/cdn/ingredients_100x100/iceberg-lettuce.jpg"
    },
];

let score = ""

const addScore = () => {
    score += 10
    $('#score').text(score)
}

const generateDishes = () => {
    const ingredientImage = recipes[Math.floor(Math.random() * 3)].ingredients;
    console.log(ingredientImage);

    for (let i = 0; i < ingredientImage.length; i++) {
        const ingredients = ingredientImage[i];
        console.log(ingredients)
        $.ajax({
            url: `https://api.spoonacular.com/food/products/search?${apiKey}&query=${ingredients}&number=2`
        }).then(
            (data) => {
                $('#dishRect1').text(data[0].image);
            },
            () => {
                console.log('bad');
            }
        );
    }
}

    const matchingredients = (plateOne, recipes) => {
        if (plateOne.sort().join(',') === recipes.sort().join(',')) {
            plateOne = [];
            console.log(plateOne)
            $('.plates1').empty();
            addScore();
        }
    }

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

    const appendImage = () => {
        for (let i = 0; i < images.length; i++) {
            const draggableDiv = $('<div>').addClass('draggable').attr('id', ingredientName[i]);
            const newImage = $('<img>').attr('src', images[i]).addClass('eachIngredient');
            draggableDiv.append(newImage);
            $('.ingredients').append(draggableDiv);
        }

    }
    // console.log($('plates1').get(0));

    const dragObject = () => {
        $('.draggable').draggable({ helper: 'clone' });
    }

    const dropObject = () => {
        $('.plates1').droppable(
            {
                accept: '.draggable',
                drop: function (ev, ui) {
                    const droppedItem = $(ui.draggable).clone();
                    $(this).append(droppedItem);
                    console.log(droppedItem)
                    const droppedItemId = $(ui.draggable).get(0).id
                    plateOne.push(droppedItemId);
                    console.log(plateOne);
                    console.log(droppedItemId);
                    matchingredients(plateOne, recipes);
                }
            })
    }

    // const dishMade = () => {
    //     if 
    // }

    $(() => {
        appendImage();
        dragObject();
        dropObject();
        startCountdown();
        generateDishes();


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