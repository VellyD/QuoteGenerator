const quoteContainer = document.getElementById("container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function completed() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function generateQuote() {
  loading();

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  authorText.textContent = quote.author || "Unknown";
  quoteText.textContent = quote.text;
  completed();
}

async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    generateQuote();
  } catch (error) {
    // Handle error
    alert(error);
  }
}

function tweetQuote() {
  let tweeterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweeterURL, "_blank");
}

newQuoteBtn.addEventListener("click", generateQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
