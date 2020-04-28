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


const ingredientName = ['chicken', 'cheese', 'tomato', 'lettuce'];

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

let images = burgerRecipe.map((ingredient) =>
  imageObjects.find((image) => image.name === ingredient).image
);

console.log(images)