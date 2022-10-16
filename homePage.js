// Homepage search autocomplete options
var historyArray = [];

$(function() {
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
  $("#default-search").autocomplete({
    source: topics
  });
});

// Homepage search button click listener with store data to local storage function
$("#searchBtn").on("click", (event) => {
  var storageItem=$("#default-search").val();
  if (!historyArray.includes(storageItem)) {
    historyArray.push(storageItem)
  }
  localStorage.setItem("historyList", JSON.stringify(historyArray));
  document.location.href = "contentPage.html?input=" + $("#default-search").val();
});
