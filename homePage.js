// async function test() {
//   let res = await fetch("www.reddit.com/r/memes.json");
//   let data = await res.json();
//   console.log(data);
// }

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
  var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
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
  $("#tags" ).autocomplete({
    source: availableTags
  });
} );






// homepage search button click function
$("#searchBtn").on("click", (event) => {
  search();
});