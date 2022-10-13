async function test() {
  let res = await fetch("https://www.reddit.com/r/memes.json");
  let data = await res.json();
  
  var redditData = condenseRedditData(data);
  console.log(dayjs.unix(redditData[0].date).format("D, MMM YYYY"));
}

test();

//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=zkidiktBcpfsGjeON9HaDv0qxuDvKevq

