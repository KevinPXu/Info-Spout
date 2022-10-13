async function test() {
  let res = await fetch("www.reddit.com/r/memes.json");
  let data = await res.json();
  console.log(data);
}

test();

//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=zkidiktBcpfsGjeON9HaDv0qxuDvKevq
