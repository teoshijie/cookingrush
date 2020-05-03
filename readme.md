# COOKING RUSH!

Cooking rush is a timed game whereby users have to prepare dishes based on the receipes provided within a set time. If player failed to do so, points will be deducted. 

# Game Mechanic

Receipes will be displayed on the top row. When the start button is pressed, only the one receipe will be generated for user to get comfortable with the game. The second receipe will be generated 3 seconds later and the 3rd receipe another 3 seconds later. 

Players will drag the corresponding ingredients at the bottom row to the plates on the middle row. Once the ingredients on the plate matches the receipe, player gets 10 points. 
<br/><br/>
![Alt Text](https://media.giphy.com/media/JSeKMhr03G7kvA80Bt/giphy.gif)


If the player fails to complete the receipe within 10 seconds, he will be deducted 4 points. 
When the palyer is left with 4 seconds, he will be warned with a blinking red background animation. 

[![N|Solid](https://media.giphy.com/media/j1sHL7VdGWwYhB6gAT/giphy.gif)

# Project Scope and Approach
![Alt Text](https://i.ibb.co/z8VZ4XY/main.jpg)

The game is narrowed to a single level game to focus more on game functionality and features. 
The first row of is labelled Receipe and each box has a receipeID and receipeVar.
The second row is labelled Plates and each plate has a plateID and plateVar.

A function known as generateReceipe is used to generate a receipe from an array of Objects known as Burger receipe. 
The ingredients is pushed to the receipeVar. 
When user drags ingredients to plate, the ingredients will be pushed into plateVar. 
A match ingredient function will check if receipeVar === plateVar and will award 10 points to player.

# Technology
This project is designed to incorporate various concepts taught in class and attempt new ones that appeared in Hungry for More sections in various assignments.  

* CSS Flexbox is used extensively to organise the UI
![Alt Text](https://i.ibb.co/RgGVYTf/rushmain.png)

* JQUERY UI library to make the ingredients draggable.
![Alt Text](https://media.giphy.com/media/fWqGVdSr1ThqIoakwN/giphy.gif)

* Local storaage for storing highscores
* setTimeout/clearTimeout is used to create timed events like displaying warnings and deducting points after the time limit. 
* Ajax call is used to display a random food trivia at the end of the a round of Cooking Rush. 
* Modal is used to display High Score, Instructions and Display Score during the end of the game 
* JQuery to manipulate DOM and append images. 
* CSS and HTML 

# Wireframe and user stories 

![Alt Text](https://i.ibb.co/5TTnT4m/083b43780f57464f863b689dbb28aec2.png)
**User Story 1**

As a user I would like to know how do I play this game. 

**Requirement**

The side bar ui allows you to immediately identify how to play the game and how to start the game. 

When you press instructions, a modal pops up with the instruction and a gif that demostrates to you how to play it. 

**User Story 2** 

As a user I want to know when I am running out of time to complete my receipe 

**Requirement**

When user had 4 seconds left, the receipe will start to flash red and there will be a beeping sound. 




# Difficulties 

I attempted several technologies for the first time like local storage, setTimeout events and making elements draggable. It took many hours of googleFu, youtube and advise from the instruction team to get it right. 

Initially, I planned to use Food api to randomly generate receipes to make the game more dynamic. However, this was abandoned because the results generated are too random. For example, the api could generate a receipe for chicken chop alongside pasta. The receipes have too little in common which means that the game would have to populate too many ingredients. As a result, I abandoned the idea and went with a fixed data set. 

I was unable to remove the spacing between the score and the graphics. 

# Limitations and possible improvments

The draggable JQUERY UI does not work on touch interface. A fix known as Touch Punch is available and will be implemented when time permits. [TouchPunch](https://github.com/furf/jquery-ui-touch-punch)

The game only has a single round. I would like to add more rounds in the future that becomes progressively more difficult. 

User is not notified if his score made it into the highscore board. Furthermore, user does not get to input his name along with his highscore. This can be avenue for future exploration. 

Current game does not render well on mobile because of the amount of elements on display. More work can be done to further optimise the mobile experience. 

Animation can be added to further enhance game experience. 

The CCS for the modals could be better. 

Lastly, the code organisation can be improved. Code can be refactored using higher order functions to make the code shorter and more "DRY". On hindset, I should commited more often. 

The beeping sound dont synchronise very well with setTimeout and sometimes there is no sound. 

