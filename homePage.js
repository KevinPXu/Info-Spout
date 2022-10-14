// Homepage search autocomplete options
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
});

// Homepage search button click listener
$("#searchBtn").on("click", (event) => {
  document.location.href = "contentPage.html?input=" + $("#default-search").val();
});
