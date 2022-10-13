
// These two functions take in response JSON data from reddit and NYT and returns a list of objects with relevant data
function condenseRedditData(data) {
    var articles = [];
    for(const a of data.data.children) {
        articles.push({
            "author": a.data.author,
            "content": a.data.selftext,
            "media": a.data.url,
            "upvotes": a.data.ups,
            "url": "https://reddit.com" + a.data.permalink
        });
    }
    return articles;
}

function condenseNYTimesData(data) {
    var articles = [];
    for(const a of data.response.docs) {
        articles.push({
            "title": a.headline.print_headline,
            "image": "https://nytimes.com/" + a.multimedia[0].url,
            "lead_text": a.lead_paragraph,
            "authors": a.byline.person,
            "word_count": a.word_count,
            "url": a.web_url
        });
    }
    return articles;
}
//-------------------------------------------------------------------------------------------------------------------