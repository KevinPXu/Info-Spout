async function test() {
  let res = await fetch("www.reddit.com/r/memes.json");
  let data = await res.json();
  condenseRedditData(data);
}

// test();

//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=zkidiktBcpfsGjeON9HaDv0qxuDvKevq

var input = $("#tags");

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
  event.preventDefault();
  document.location.href = "contentPage.html?input=" + input.val();
  console.log("hello");
});
