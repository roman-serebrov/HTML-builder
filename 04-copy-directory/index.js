const fs = require('fs');
const path = require('path');
const readdir = require('fs/promises');
const dirPath = path.join(`${__dirname}/files-copy`);

fs.access(dirPath, fs.F_OK, (err) => {
  if (err) {
    copyFolder();
  } else {
    fs.promises.rmdir(dirPath, { recursive: true })
      .then(() => {
        console.log('directory removed!');
        copyFolder();
      });
  }
});




function copyFolder() {
  fs.promises.mkdir(dirPath, { recursive: true }).then(() => {
    readdir.readdir(`${__dirname}/files`).then(files => {
      for(let file of files) {
        fs.copyFile(`${__dirname}/files/${file}`,`${__dirname}/files-copy/${file}`, err => {
          if(err) throw err;
          console.log(`Файл ${file} перенесен`);
        });
      }
    });
  });
}
