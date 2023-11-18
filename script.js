// Get Quotes From API
const quoteContainer = document.querySelector("#qoute-container")
const quoteText = document.querySelector("#qoute")
const authorText = document.querySelector("#author")
const twitterBtn = document.querySelector("#twitter")
const newQuoteBtn = document.querySelector("#new-qoute")
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading

console.log(loader);
function loading(){
  loader.hidden=true;
  quoteContainer.hidden=false;
} 
function complete(){
  loader.hidden=true;
  quoteContainer.hidden=false;
}

newQuote = ()=>{
  loading(); 
  //pick a rondom qoute from api array
  const quote =apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
  // console.log(quote);
  //check if author field is blank and replace it with'unknown'
  if(!quote.author){
    authorText.textContent="Unknown";
  }
  else{
    authorText.textContent = quote.author;
  }
  //check qoute lenght to determine stylong
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } 
  else{
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text
  complete();
}

async function getQuotes(){
    loading();
    const apiUrl= 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        // console.log(response);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
        //Catch Error Here
    }
}

//tweet quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank')
}

//event listners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote) 

getQuotes();


