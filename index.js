const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 

axios.get('https://www.lyrics.com/artist/Insane-Clown-Posse/165873')
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
        const $ = cheerio.load(html);
        console.log($('.clearfix').find('td').text().trim())
        let albumSong = [
          {
            title: '',
            song: '',
          }
        ];
        $('.clearfix').each(function(i, elem) {
          const title = $(this).find('h3').text().trim();
          const song = $(this).find('td').text().trim();
          if (song.length > 0 && i > 0) {
            albumSong[i] = {
              title,
              song,
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