var dateFormat = "D, MMM YYYY";

async function fetchNYTApi(userInput) {
  let res = await fetch(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      userInput +
      "&api-key=zkidiktBcpfsGjeON9HaDv0qxuDvKevq"
  );
  let timesData = res.json();
  renderNYTData(timesData);
}

async function fetchRedditApi(userInput) {
  let res = await fetch("https://www.reddit.com/r/" + userInput + ".json");
  let redditData = res.json();
  renderRedditData(redditData);
}

// These two functions take in response JSON data from reddit and NYT and returns a list of objects with relevant data
function condenseRedditData(data) {
  var articles = [];
  for (const a of data.data.children) {
    articles.push({
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
            date: a.pub_date,
            url: a.web_url,
        });
    }
    return articles;
}
//-------------------------------------------------------------------------------------------------------------------

function renderNYTData(timesData) {}

function renderRedditData(redditData) {}

  
function renderButtons() {
  var history = []; 
  $("#searchbar-history").empty();
  for (var i=0;i < history.length; i++) {
    var newButton =$("<button>");
    newButton.addClass("search-btn");
    newButton.attr("data-search", history[i]);
    newButton.text(history[i]);
    $("#searchbar-history").append(newButton)
  }
}

$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  var searched = $("#default-search").val().trim();
  history.push(searched);
  renderButtons();
});

$(document).on("click", ".search-btn", renderNYTData, renderRedditData);
renderButtons();