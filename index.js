const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 

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
          const url = $(this).find('a').attr(); // fix this, after url is grabbed put it into getLyrics and done
          if (song.length > 0 && i > 0) {
            albumSong[i] = {
              title,
              song,
              url,
            }
          }
        });
      const albumSongTrim = albumSong.filter((n) => (n !== undefined || n.song.length > 0 || n.title.length > 0))
      fs.writeFile('albumSongs.json', 
        JSON.stringify(albumSongTrim, null, 4),
        (err) => console.log('Files written!')            
      )
    }
  }, (error) => console.log(error));

const getLyrics = axios.get('https://www.lyrics.com/lyric/32062014/Insane+Clown+Posse/Intro')
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const lyrics = $('#lyric-body-text').text();
      fs.writeFile('lyrics.txt', lyrics,
        (err) => console.log('lyrics done!')
      )
    }
  }, (error) => console.log(error))