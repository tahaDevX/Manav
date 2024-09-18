/*
 * API: Gelen istekleri izler ve isteklere cevap gönderir.
 *
 * createServer(), verdiğimiz dinleyici fonksiyonunu API'a her istek geldiğinde tetikler.
 * Bu fonksiyon 2 parametre alır:
 * 1) request > istek ile alakalı verileri içeren nesne
 * 2) response > cevap göndermemizi sağlayacak nesne
 *
 * Bu fonksiyon içerisinde gelen isteğe göre cevap gönderilir.
 */

/*
 * Routing
 * API'a gelen isteğin hangi endpoint'e (uç nokta/yol) geldiğini tespit edip ona göre farklı cevaplar gönderme işlemine routing denir.
 * Routing için, client'ın hangi yola ve hangi HTTP methodu ile istek attığını bilmemiz gerekiyor.
 */

// Gerekli modülleri çağırdık
const http = require("http");
const fs = require("fs");
const url = require("url");

// Kendi oluşturduğumuz fonksiyonu import ettik
const replaceTemplate = require("./modules/replaceTemplate");

// HTML şablonlarına eriştik
let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

// JSON dosyasındaki verilere eriştik
let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");

// JSON verisini JS formatına çevirdik
const data = JSON.parse(jsonData);

const server = http.createServer((request, response) => {
  console.log("🥳🥳 API'a istek geldi 🎉🎉");

  // İstek URL'ini parçalara ayırdık
  const { query, pathname } = url.parse(request.url, true);

  // Gelen isteğin URL'ine göre farklı cevap gönder
  switch (pathname) {
    case "/overview":
      // Verilerden kartları oluşturduk
      const cards = data.map((el) => replaceTemplate(tempCard, el));

      // Ana sayfa HTML'indeki kartlar alanına kart HTML kodlarını ekledik
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);

      return response.end(tempOverview);

    case "/product":
      // 1) Dizideki doğru elemanı bulduk
      const item = data.find((item) => item.id == query.id);

      // 2) Detay sayfasının HTML'ini bulunan elemanın verilerine göre güncelledik
      const output = replaceTemplate(tempProduct, item);

      // 3) Güncel HTML'i client'a gönderdik
      return response.end(output);

    default:
      return response.end("<h1>Tanimlanmayan Yol</h1>");
  }
});

// Bir dinleyici oluşturup hangi porta gelen isteklerin dinleneceğini söyledik
server.listen(3535, "127.0.0.1", () => {
  console.log("🎾 IP adresinin 3535 portuna gelen istekler dinlemeye alındı");
});
