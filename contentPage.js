var dateFormat = "D, MMM YYYY";
var historyArray = JSON.parse(localStorage.getItem("historyList"));

// Get the query tag from the URL
var searchInput = document.location.search.split("=")[1];

// Grab the search field element and set the text to the user input from the homepage
var searchField = $("#default-search");
searchField.val(searchInput);

//----- These functions use fetch requests to grab API data from NYTimes and Redit -----
function initSearch(input) {
  console.log(input);
  // Use the search input here to determine what to feed into the two functions under
}

async function fetchNYTApi(userInput) {
  let res = await fetch(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      userInput +
      "&api-key=zkidiktBcpfsGjeON9HaDv0qxuDvKevq"
  );
  let timesData = await res.json();
  renderNYTData(condenseNYTimesData(timesData));
}

async function fetchRedditApi(userInput) {
  let res = await fetch("https://www.reddit.com/r/" + userInput + ".json");
  let redditData = await res.json();
  renderRedditData(condenseRedditData(redditData));
}
//--------------------------------------------------------------------------------------

//----- These two functions take in response JSON data from reddit and NYT and returns a list of objects with relevant data -----
function condenseRedditData(data) {
  var articles = [];
  for (const a of data.data.children) {
    if (!a.data.stickied) {
      articles.push({
        title: a.data.title,
        author: a.data.author,
        content: a.data.selftext,
        media: a.data.url,
        upvotes: a.data.ups,
        date: a.data.created,
        url: "https://reddit.com" + a.data.permalink,
      });
    }
  }
  return articles;
}

function condenseNYTimesData(data) {
  var articles = [];
  for (const a of data.response.docs) {
    articles.push({
      lead_text: a.abstract,
      image: a.multimedia,
      title: a.headline.main,
      authors: a.byline.person,
      word_count: a.word_count,
      date: dayjs(a.pub_date).unix(),
      url: a.web_url,
    });
  }
  return articles;
}
//-------------------------------------------------------------------------------------------------------------------------------

//----- These functions take the condensed JSON data and creates elements for each post for NYTimes and Reddit -----
function renderNYTData(timesData) {
  let timesContainerEl = $("#times-content");
  // Empties the Div container of the times data so the page can update with fresh information
  timesContainerEl.empty();
  console.log(timesData);
  // Checks to see if the number of results is less than ten then chooses the smaller number to display
  let length = Math.min(timesData.length, 10);

  // Loops through the array of condensed objects of data and creates and displays elements to the page for each data point
  for (let i = 0; i < length; i++) {
    let timesCardContEl = $("<a>");
    let timesImgEl = $("<img>");
    let timesTextContEl = $("<div>");
    let timesTitleEl = $("<h4>");
    let timesBodyEl = $("<p>");
    let authorEl = $("<h5>");
    let authors = "";
    let dateEl = $("<h5>");

    // Adds the tailwind classes to create the base of the card
    timesCardContEl.addClass(
      "flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-100% md:max-h-80 md:min-h-[320px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-3"
    );
    // Makes the card a clickable link that takes you to the given article
    timesCardContEl.attr("href", timesData[i].url);

    // Adds tailwind classes to the image element setting a standard size for it.
    timesImgEl.addClass(
      "object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    );
    // Adds the front page image to the card.
    timesImgEl.attr({
      src: "https://nytimes.com/" + timesData[i].image[0].url,
      alt: "New York Times Cover Image",
    });
    // Adds tailwind classes to the container inside the card that will contain the text
    timesTextContEl.addClass(
      "flex flex-col justify-between p-4 leading-normal"
    );
    // Adds tailwind classes to the title of the card with the headline
    timesTitleEl.addClass(
      "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    );
    // Adds title text
    timesTitleEl.text(timesData[i].title);
    // Adds tailwind classes to the main body of the card
    timesBodyEl.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");
    // Adds the abstract for the article to the card(note* full article not available in API)
    timesBodyEl.text(timesData[i].lead_text);

    // Adds the tailwind classes to the author text of the card
    authorEl.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");

    // If there is more than one author, appends each to a string and displays the string
    for (let author of timesData[i].authors) {
      authors += author.firstname + " " + author.lastname + ", ";
    }
    authors = authors.slice(0, authors.length - 2);
    authorEl.text(authors);

    // Adds tailwind classes to the date section
    dateEl.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");
    // Adds the date of publish to the card
    dateEl.text(dayjs.unix(timesData[i].date).format(dateFormat));

    // Appends all element to the proper container to display on the screen
    authorEl.append(dateEl);
    timesTextContEl.append(timesTitleEl, timesBodyEl, authorEl);
    timesCardContEl.append(timesImgEl, timesTextContEl);
    timesContainerEl.append(timesCardContEl);
  }
}

function renderRedditData(redditData) {
  // Get and empty the reddit content field
  let container = $("#reddit-content");
  container.empty();

  // Loop through each result (max of 10) and create preview cards for each post
  for (var i = 0; i < Math.min(redditData.length, 10); i++) {
    // Create the main card container
    let card = $("<a>");
    card.attr("href", redditData[i].url);
    card.addClass(
      "flex flex-col my-3 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-100% md:max-h-80 md:min-h-[320px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    );

    // Create the container for text content
    let textContainer = $("<div>");
    textContainer.addClass("flex flex-col justify-between p-4 leading-normal");

    // Create the image container
    // If there is no valid image associated with the post, a default reddit icon will be displayed instead
    let cardImage = $("<img>");
    if (checkURLForImage(redditData[i].media)) {
      cardImage.addClass(
        "object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      );
      cardImage.attr("src", redditData[i].media);
    } else {
      cardImage.addClass(
        "object-cover sm:mt-4 md:mt-0 md:ml-4 w-16 h-16 rounded-t-lg md:h-16 md:w-16 md:rounded-none md:rounded-l-lg"
      );
      cardImage.attr("src", "https://www.reddit.com/favicon.ico");
    }
    card.append(cardImage);

    // Create the card header
    let cardHeader = $("<h5>");
    cardHeader.addClass(
      "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    );
    cardHeader.text(redditData[i].title);
    textContainer.append(cardHeader);

    // Create the text body for each card
    let cardText = $("<p>");
    cardText.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");
    cardText.text(redditData[i].content);
    textContainer.append(cardText);

    // Create the header to display upvotes
    let cardUps = $("<h6>");
    cardUps.addClass("mb-2 font-normal text-gray-700 dark:text-gray-400");
    cardUps.text("Upvotes: " + redditData[i].upvotes);
    textContainer.append(cardUps);

    // Create the header to display the post creator
    let cardAuthor = $("<h6>");
    cardAuthor.addClass("mb-2 font-normal text-gray-700 dark:text-gray-400");
    cardAuthor.text(redditData[i].author);
    textContainer.append(cardAuthor);

    // Create the header to display the creation date
    let cardDate = $("<h6>");
    cardDate.addClass("mb-2 font-normal text-gray-700 dark:text-gray-400");
    cardDate.text(dayjs.unix(redditData[i].date).format(dateFormat));
    textContainer.append(cardDate);

    card.append(textContainer);
    container.append(card);
  }
}
//-----------------------------------------------------------------------------------------------------------------

// Checks if a string has one of the specified endings
function checkURLForImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png|jfif)$/) != null;
}

//add storeUserData function
function storeUserData(userInput) {
  const storageItem = userInput;
  if(historyArray.includes(storageItem)) {
    return;
  }
  historyArray.push(storageItem);
  localStorage.setItem("historylist", JSON.stringify(historyArray));
}

//add renderButtons with get local storage data function
function renderButtons() {
  let list = $("#history-list");
  list.empty();
  const historyList = localStorage.getItem('historyList') 
  const historyListFormatted = JSON.parse(historyList) 
  console.log(historyListFormatted) 
  for (var i = 0; i < historyListFormatted.length; i++) { 
    var newButton = $("<button>");
    newButton.text(historyListFormatted[i]);
    newButton.addClass("text-white block bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 m-2 dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-blue-800"); //add m-2 by rui
    newButton.on("click", function(e) {
      e.preventDefault();  
      initSearch($(this).text());
    });
    list.append(newButton);
  }
}

$("#searchBtn").on("click", function (event) {
  var searched = $("#default-search").val().trim();
  storeUserData(searched);   
  console.log(searched);
    renderButtons();
});

renderButtons();
fetchRedditApi("mcdonalds");
fetchNYTApi("mcdonald's");

// localStorage.clear();