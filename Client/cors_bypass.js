var conn;

var buffer = [];

function connect(address, port) {
  conn = new WebSocket("ws://" + address + ":" + port);
  console.log("Connected to CORS bypass proxy");

  conn.onmessage = function (event) {
    var response = JSON.parse(event.data);
    runFunction(response.callback, response.response);
  };

  conn.onopen = function (event) {
    for (const request of buffer) {
      sendGETRequest(request.callback, request.url);
    }
  };
}

function sendGETRequest(callback, url) {
  if (conn.readyState === WebSocket.OPEN) {
    conn.send(callback + " " + url);
  } else {
    buffer.push({
      callback: callback,
      url: url,
    });
  }
}

function runFunction(name, data) {
  var fn = window[name];
  if (typeof fn !== "function") {
    console.log("Response returned with invalid callback name: " + name);
    return;
  }
  fn.apply(window, [data]);
}

function error(data) {
  console.log(data);
}
