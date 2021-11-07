const fs = require('fs');
const path = require('path');
const path1 = path.join(__dirname);
const readdir = require('fs/promises');
try {
  readdir.readdir(path1, {withFileTypes: true}).then(files => {
    for(let file of files) {
      if(file.isFile()) {
        isFile(file);
      } else if(file.isDirectory()) {
        isDirectory(file);
      }
    }
  });

} catch (err) {
  console.error(err);
}
function isFile(file) {
  fs.stat(`${__dirname}/${file.name}`, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    const file_ext = path.extname(file.name);
    const file_name = path.basename(file.name, file_ext);
    const file_size = `${stats.size / 1000}kb`;
    console.log(file_name, file_ext, file_size);
  });
}
function isDirectory(folder) {
  readdir.readdir(`${__dirname}/${folder.name}`,{withFileTypes: true}).then(files => {
    for (let file of files) {
      if(file.isFile()) {
        const fl = {
          name: folder.name + '/' + file.name
        };
        isFile(fl);
      } else {
        console.log(__dirname, file.name,folder.name);
        let coreFl = file;//fs.stat(`${__dirname}/${folder.name}/${file.name}`, isFile);
        readdir.readdir(`${__dirname}/${folder.name}/${file.name}`, {withFileTypes: true}).then(files => {
          for (let file of files) {
            const fl = {
              name: `${folder.name}/${coreFl.name}/${file.name}`
            };
            isFile(fl);
          }
        });
      }
    }
  });
}
