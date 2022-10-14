<<<<<<< HEAD
fetchNYTApi("Mcdonalds");
=======
var dateFormat = "D, MMM YYYY";

>>>>>>> 26638c05221d76e414ad454bb4ff5c2169879e32
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
<<<<<<< HEAD
function renderNYTData(timesData) {
  console.log(timesData);
}
=======

function renderNYTData(timesData) {}
>>>>>>> 26638c05221d76e414ad454bb4ff5c2169879e32

function renderRedditData(redditData) {}
