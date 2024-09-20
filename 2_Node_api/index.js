const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");

const data = JSON.parse(jsonData);

const server = http.createServer((request, response) => {
  console.log("🥳🥳 API'a istek geldi 🎉🎉");

  const { query, pathname } = url.parse(request.url, true);

  switch (pathname) {
    case "/overview":
 
      const cards = data.map((el) => replaceTemplate(tempCard, el));

    
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);

      return response.end(tempOverview);

    case "/product":
      const item = data.find((item) => item.id == query.id);

      const output = replaceTemplate(tempProduct, item);

      return response.end(output);

    default:
      return response.end("<h1>Tanimlanmayan Yol</h1>");
  }
});

server.listen(3535, "127.0.0.1", () => {
  console.log("🎾 IP adresinin 3535 portuna gelen istekler dinlemeye alındı");
});
