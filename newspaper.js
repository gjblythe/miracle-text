// const env = require('dotenv');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.APIKEY);

newsapi.v2.everything({
q: 'icp'
}).then(response => {
  console.log(response)
})
