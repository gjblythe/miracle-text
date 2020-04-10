const fs = require('fs');

const deleteFile = (file) => fs.unlink(file, function (err) {
  if (err) throw err;
})

const writeFile = (file) => fs.writeFile(file, '', function (err) {
  if (err) throw err;
  console.log(`${file} cleared!`);
});

const resetFile = (file) => {
  deleteFile(file);
  writeFile(file);
};

export default resetFile;
