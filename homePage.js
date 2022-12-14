// Homepage search autocomplete options
var historyArray = [];

$(function() {
  var topics = [
    "cryptocurrency",
    "zoom",
    "paypal",
    "roblox",
    "amazon",
    "weather",
    "Real Estate",
    "Netflix",
    "Star Wars",
    "AMC",
    "NBA",
    "Television",
    "Movies",
    "Drink",
    "Fitness",
    "Health",
    "Weddings",
    "Sports",
    "Gaming",
    "restaurants",
    "minecraft",
    "Apple",
    "Tesla",
    "Target",
    "NFL",
    "Mcdonalds",
    "walmart"
  ];
  $("#default-search").autocomplete({
    source: topics
  });
});



// Homepage search button click listener with store data to local storage function
      $("#searchBtn").on("click", (event) => {
  var storageItem = $("#default-search").val();
  if(storageItem.length > 0) {
    if (!historyArray.includes(storageItem)) {
      historyArray.push(storageItem);
    }
    localStorage.setItem("historyList", JSON.stringify(historyArray));
    document.location.href = "contentPage.html?input=" + storageItem;
  }
});

var hPageSearch = document.getElementById("default-search");
hPageSearch.addEventListener("keypress",function(event) {
  if (event.key === "Enter") {
  event.preventDefault();
  document.getElementById("searchBtn").click();
}
});