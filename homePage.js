async function test() {
  let res = await fetch("https://www.reddit.com/r/memes.json");
  let data = await res.json();
  
  var redditData = condenseRedditData(data);
  console.log(dayjs.unix(redditData[0].date).format("D, MMM YYYY"));
}

// test();

//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=zkidiktBcpfsGjeON9HaDv0qxuDvKevq

// error handler
var handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// homepage search function
var search = (response) => {
  let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=zkidiktBcpfsGjeON9HaDv0qxuDvKevq"
  fetch(queryURL)
    .then(handleErrors)
    .then((response) => {
      console.table(response)
      return response.json();
    })
}

//homepage search autocomplete
$( function() {
  var topics = [
    "web development",
    "berkeley",
    "cold brew",
    "olive garden",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
  $("#default-search" ).autocomplete({
    source: topics
  });
} );




// homepage search button click function
$("#searchBtn").on("click", (event) => {
  search();
});
