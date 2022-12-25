import http from "http";

const server = http.createServer();

server.on("request", (request, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World! Here I am",
    })
  );
});

server.listen(8000);
