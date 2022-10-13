//input is the user input variable

// fetch("http://localhost:3000").then((response) =>
//   response.json().then((data) => console.log(data))
// );

fetch("https://www.reddit.com/r/wendys.json").then(function(response) {
  if(response.ok) {
    response.json().then(function(data) {
      console.log(data);
    });
  }
});