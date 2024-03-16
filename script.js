//https://github.com/lukePeavey/quotable

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const api_url = "https://api.quotable.io/random";

//Vector storying the quotes
let quoteHistory = [];
let currentQuoteIndex = -1;

//Fetches the quotes from the given API
async function getquote(url) {
    const response = await fetch(url);
    const data = await response.json();

    //Checks if the quote is greater or equal to X words
    if (data.content.split(" ").length <= 25) {
        //Push if so
        quoteHistory.push(data);
        currentQuoteIndex = quoteHistory.length - 1;
        //Display quote
        displayQuoteWithFade(data);
    } else {
        //Greater than 25, then refresh
        getquote(url);
    }
}

//Display quote
function displayQuote(data) {
    quoteElement.innerHTML = data.content;
    authorElement.innerHTML = data.author;
}

function displayQuoteWithFade(data) {
    quoteElement.classList.remove("active");
    authorElement.classList.remove("active"); // Remove active class from author too
    setTimeout(function() {
        displayQuote(data);
        quoteElement.classList.add("active");
        authorElement.classList.add("active");
    }, 300); // Delay transition duration
}

//Go backward to previous index
function backQuote() {
    if (currentQuoteIndex > 0) {
        currentQuoteIndex--;
        displayQuoteWithFade(quoteHistory[currentQuoteIndex]);
    }
}

//Go foward to next index or fetch new quote
function nextQuote() {
    if (currentQuoteIndex < quoteHistory.length - 1) {
        currentQuoteIndex++;
        displayQuoteWithFade(quoteHistory[currentQuoteIndex]);
    } else {
        getquote(api_url);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");
    const nextButton = document.getElementById("nextButton");

    backButton.addEventListener("click", backQuote);
    nextButton.addEventListener("click", nextQuote);

    getquote(api_url);
});

getquote(api_url);
