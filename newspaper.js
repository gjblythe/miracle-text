require('dotenv').config();
const fs = require('fs'); 
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.APIKEY);

const fileName = 'articles.txt'; //hook up helper
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
  response.articles.map((article) => (fs.appendFile(fileName, article.content, (err) => console.log('test'))))
})
