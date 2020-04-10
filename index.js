const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 

const fileName = 'lyrics.txt' // hook up helper
fs.unlink(fileName, function (err) {
  if (err) throw err;
})
fs.writeFile(fileName, '', function (err) {
  if (err) throw err;
  console.log(`Cleared ${fileName}!`);
});

const getLyrics = async (url) => url !== undefined ? await axios.get(`https://www.lyrics.com/${url}`)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const lyrics = $('#lyric-body-text').text();
      fs.appendFile(fileName, lyrics,
        (err) => console.log(`${fileName} done!`)
      )
    }
  }, (error) => console.log(error)) : undefined;

axios.get('https://www.lyrics.com/artist/Insane-Clown-Posse/165873')
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
        const $ = cheerio.load(html);
        let albumSong = [
          {
            title: '',
            song: '',
            url: '',
          }
        ];
        $('.clearfix').each(function(i, elem) {
          const title = $(this).find('h3').text().trim();
          const song = $(this).find('td').text().trim();
          const url = $(this).find('strong').children().attr(); 
          if (song.length > 0 && i > 0) {
            albumSong[i] = {
              title,
              song,
              url,
            }
              getLyrics(url.href);
          }
        });
      const albumSongTrim = albumSong.filter((n) => (n !== undefined || n.song.length > 0 || n.title.length > 0))
      fs.writeFile('albumSongs.json', 
        JSON.stringify(albumSongTrim, null, 4),
        (err) => console.log('Files written!')            
      )
    }
  }, (error) => console.log(error));

