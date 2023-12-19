/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    
    for (let i = 0; i < games.length; i++) {
        
        let gameCard = document.createElement('div');
        gameCard.classList.add('game-card'); /*adds a class to the given element*/
        let currentGame = games[i];

        // Assuming each game object has 'name' and 'description' properties, you can use them to populate the card
        gameCard.innerHTML = `
            <img src="${currentGame.img}" class="game-img" />
            <h2>${currentGame.name}</h2>
            <p>${currentGame.description}</p>
            <p> Backers: ${currentGame.backers} </p>
            <!-- Other game information -->
        `;

        gamesContainer.appendChild(gameCard);
    }
    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc,currentGame) => {
    return acc+currentGame.backers },0);
contributionsCard.textContent = totalContributions.toLocaleString(); // Update contributionsCard with the total number of contributions
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalraised = GAMES_JSON.reduce((acc,currentGame) => {
    return acc+currentGame.pledged },0);
raisedCard.textContent = '$' + totalraised.toLocaleString();
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numofgame = GAMES_JSON.reduce((count) => {return count+= 1},0)
gamesCard.textContent = numofgame
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    let unfounded = GAMES_JSON.filter((curr)=> 
    { return curr.goal > curr.pledged})
    console.log(unfounded);
    addGamesToPage(unfounded)
    // use filter() to get a list of games that have not yet met their goal
    

    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let founded = GAMES_JSON.filter((curr)=> 
    { return curr.goal < curr.pledged})
    console.log(founded);
    addGamesToPage(founded)

    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// Event listener for fundedBtn
fundedBtn.addEventListener("click", filterFundedOnly);

// Event listener for allBtn
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const totalUnfundedGames = unfundedGames.length;

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${totalraised.toLocaleString()} has been raised for ${numofgame} games. Currently, ${totalUnfundedGames}
games remains unfounded. We need your help to fund these amazing games!`
// create a new DOM element containing the template string and append it to the description container
const paragraphElement = document.createElement('p');
paragraphElement.textContent = displayStr;

descriptionContainer.appendChild(paragraphElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstMostFundedGame, secondMostFundedGame, ...remainingGames] = sortedGames;
const firstWordFirstGame = firstMostFundedGame.name.split(' ')[0];
const firstWordSecondGame = secondMostFundedGame.name.split(' ')[0];
// create a new element to hold the name of the top pledge game, then append it to the correct element

const firstGameTitle = document.createElement('p');
firstGameTitle.textContent = firstMostFundedGame.name;
firstGameContainer.appendChild(firstGameTitle);

const secondGameTitle = document.createElement('p');
secondGameTitle.textContent = secondMostFundedGame.name;
secondGameContainer.appendChild(secondGameTitle);


// do the same for the runner up item