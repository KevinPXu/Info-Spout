var dateFormat = "D, MMM YYYY";

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