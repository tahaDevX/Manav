/*
 * Card HTML'ini ve ürün bilgilerini parametre olarak alacak,
 * Card HTML'inin içerisindeki değişken olarak tanımlanan değerlerin yerine ürün bilgilerini ekleyecek bir fonksiyon yazalım.
 */

const replaceTemplate = (html, data) => {
  // HTML şablonundaki değişkenlerin yerine data nesnesindeki verileri ekliyoruz
  let output = html.replace(/{%PRODUCTNAME%}/g, data.productName);
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%ID%}/g, data.id);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%FROM%}/g, data.from);

  // Eğer ürün organik değilse {NOT_ORGANIC} değişkeni yerine "not-organic" class'ını ekle
  if (data.organic === false) {
    output = output.replace("{%NOT_ORGANIC%}", "not-organic");
  }

  // Oluşturduğumuz yeni - güncellenmiş card HTML'ini döndür
  return output;
};

// replaceTemplate fonksiyonunu farklı dosyalarda kullanabilmek için export ediyoruz
module.exports = replaceTemplate;
