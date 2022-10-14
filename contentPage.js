var dateFormat = "D, MMM YYYY";
let timesContainerEl = $("#times-content");
fetchNYTApi("mcdonalds");
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

// These two functions take in response JSON data from reddit and NYT and returns a list of objects with relevant data
function condenseRedditData(data) {
  var articles = [];
  for (const a of data.data.children) {
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
//-------------------------------------------------------------------------------------------------------------------

function renderNYTData(timesData) {
  console.log(timesData);

  let length = Math.min(timesData.length, 10);

  for (let i = 0; i < length; i++) {
    let timesCardContEl = $("<a>");
    let timesImgEl = $("<img>");
    let timesTextContEl = $("<div>");
    let timesTitleEl = $("<h4>");
    let timesBodyEl = $("<p>");
    let authorEl = $("<h5>");
    let authors = "";
    let dateEl = $("<h5>");

    timesCardContEl.addClass(
      "flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-3"
    );
    timesCardContEl.attr("href", timesData[i].url);

    timesImgEl.addClass(
      "object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    );
    timesImgEl.attr({
      src: "https://nytimes.com/" + timesData[i].image[0].url,
      alt: "New York Times Cover Image",
    });

    timesTextContEl.addClass(
      "flex flex-col justify-between p-4 leading-normal"
    );

    timesTitleEl.addClass(
      "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    );

    timesTitleEl.text(timesData[i].title);

    timesBodyEl.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");
    timesBodyEl.text(timesData[i].lead_text);

    authorEl.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");
    for (let author of timesData[i].authors) {
      authors += author.firstname + " " + author.lastname + ", ";
    }
    authors = authors.slice(0, authors.length - 2);
    authorEl.text(authors);

    dateEl.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");
    dateEl.text(dayjs.unix(timesData[i].date).format(dateFormat));

    authorEl.append(dateEl);
    timesTextContEl.append(timesTitleEl, timesBodyEl, authorEl);
    timesCardContEl.append(timesImgEl, timesTextContEl);
    timesContainerEl.append(timesCardContEl);
  }
}

function renderRedditData(redditData) {
  let container = $("#reddit-content");
  
  for(var i = 0; i < Math.min(redditData.length, 10); i++) {
    let card = $("<a>");
    card.attr("href", redditData[i].url);
    card.addClass("flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-100% hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700");

    let textContainer = $("<div>");
    textContainer.addClass("flex flex-col justify-between p-4 leading-normal");

    let cardImage = $("<img>");
    if(checkURLForImage(redditData[i].media)) {
      cardImage.addClass("object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg");
      cardImage.attr("src", redditData[i].media);
    } else {
      cardImage.addClass("object-cover sm:mt-4 md:mt-0 md:ml-4 w-16 h-16 rounded-t-lg md:h-16 md:w-16 md:rounded-none md:rounded-l-lg");
      cardImage.attr("src", "https://www.reddit.com/favicon.ico");
    }
    card.append(cardImage);

    let cardHeader = $("<h5>");
    cardHeader.addClass("mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white");
    cardHeader.text(redditData[i].title);
    textContainer.append(cardHeader);

    let cardText = $("<p>");
    cardText.addClass("mb-3 font-normal text-gray-700 dark:text-gray-400");
    cardText.text(redditData[i].content);
    textContainer.append(cardText);

    card.append(textContainer);
    container.append(card);
  }
}

function checkURLForImage(url) {
  return(url.match(/\.(jpeg|jpg|gif|png|jfif)$/) != null);
}

fetchRedditApi("wendys");