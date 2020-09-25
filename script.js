// get quote from api
let tries = 0;
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function finishLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

async function getQuote() {
  loading();
  const proxyUrl = "https://secret-basin-94602.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  try {
    tries += 1;
    let res = await axios.post(proxyUrl + apiUrl);
    let quote = await res.data;
    if (quote.quoteText && quote.quoteAuthor) {
      tries = 0;
      if (quote.quoteAuthor === "") {
        authorText.innerText = "Anonymous";
      } else {
        authorText.innerText = quote.quoteAuthor;
      }
      //   reduce font size for long quotes
      quoteText.innerText = quote.quoteText;
      if (quote.quoteText.length > 120) {
        quoteText.classList.add("long-quote");
      } else {
        quoteText.classList.remove("long-quote");
      }
    } else {
      throw new Error("Problem in fetching quote");
    }
    finishLoading();
  } catch (err) {
    if (!tries > 3) {
      getQuote();
    }
    console.log("this is the error im fetching the quotes", err);
    finishLoading();
  }
}

// tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  let twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
  window.open(twitterUrl, "_blank");
}

// add eventListner
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load

getQuote();
