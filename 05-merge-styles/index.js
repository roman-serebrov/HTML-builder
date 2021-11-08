const fs = require('fs');
const path = require('path');
const readdir = require('fs/promises');
const project_dist = path.join(`${__dirname}/project-dist`);
const folder_styles = path.join(`${__dirname}/styles`);


readdir.readdir(folder_styles, {withFileTypes: true}).then(files => {
  for (let file of files) {
    let ext_name = path.extname(file.name);
    if (ext_name === '.css') {
      let read_file = new fs.createReadStream(`${__dirname}/styles/${file.name}`, {encoding: 'utf-8'});
      read_file.on('data', (data) => fs.appendFile(
        `${project_dist}/bundle.css`,
        `\n${data}`,
        'utf8',
        (err) => {
          if (err) throw err;
          console.log('Done');
        }
      ));
    }
  }
});

