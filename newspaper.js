require('dotenv').config();
const fs = require('fs'); 
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.APIKEY);

const fileName = 'articles.json'; //hook up helper
fs.unlink(fileName, function (err) {
  if (err) throw err;
})
fs.writeFile(fileName, '', function (err) {
  if (err) throw err;
  console.log(`Cleared ${fileName}!`);
});

newsapi.v2.everything({
q: 'juggalo',
language: 'en',
}).then(response => {
  fs.appendFile(fileName, JSON.stringify(response, null, 4), (err) => console.log('test'))
  
  const url = [];

  response.articles.map((article) => (url.push(article.url)));
  console.log(url);
})
