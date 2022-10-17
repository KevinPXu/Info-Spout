# <Info Spout>

# Info Spout
### Information for the people by the people
<br>

## Features
---
Info Spout allows users to enter a topic or keyword into the search bar and in return they will get information from the intellectuals that run NY Times and from the people that  converse on Reddit.


## Description
---
Society has more nuances that we can count; one of them being the difference between knowing about a topic and being “in the know” about a topic. The difference between understanding a topic and being able to have a conversation about it. Info Spout is here to bridge that gap. We created this page to allow users to get an indepth understanding of a topic from to opposite sources. This will allow users to gain a breadth of knowledge equating to a broad understanding of a topic. We were able to do this by pulling information from both Reddit and the NY Times. Then having subreddits and articles populate the webpage that provide a preview for the reader but make it easier to compare. 

By using Info Spout that lost feeling in a converation will be resolved. Use Info Spout before going to any function. That way you can be preapred for upcoming conversations from sports to fashion week,from raising gas prices to Netflix documentaries. Info Spout is also a great way to read up on anytopic you are curioous about. Just because someone isn't a journalist for NY Times doesn't mean that they dont have a point of view worth reading about. Search engines like google give you so many options to read about you can get lost Info Spout narrows down your search providing the user with onoy sources that they need.

## Table of Contents

* [Demonstration](#demonstration)
* [Technologies](#Technologies)
* [Code](#Code)
* [License](#license)




## Demonstration
---
![example gif](./Info-Spout.gif)



## Technologies Used
---
* HTML
* CSS
* Javascript
* Jquery
* Tailwind
* Reddit API
* NYT API
* Date.js


## Code Snippet
---
```JavaScript
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

```

## Project Status
Project is: _completed_ 

## Contact
Created by:

- Jack McWilliams
- Kevin Xu
- Ruihan Gao
- William Crain

feel free to contact us!

Project Link: [https://github.com/KevinPXu/Info-Spout](https://github.com/KevinPXu/Info-Spout)
