//input is the user input variable

// fetch("http://localhost:3000").then((response) =>
//   response.json().then((data) => console.log(data))
// );

connect("172.2.177.112", "6969");

function consoleLog(data) {
  console.log(data);
}

sendGETRequest(
  "consoleLog",
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.893372%2C-82.711852&radius=2500&type=restaurant&key=$google"
);
