const fs = require('fs');
const path = require('path');
const readdir = require('fs/promises');
const cmpSearch = ['{{header}}', '{{articles}}', '{{footer}}'];

const projectDistAssets = path.join(`${__dirname}/project-dist/assets`);
const projectDist = path.join(`${__dirname}/project-dist/`);
const assets = path.join(`${__dirname}/assets`);
const components = path.join(`${__dirname}/components`);
const template = path.join(`${__dirname}/template.html`);
console.log(template)

let read_file_tmp = new fs.createReadStream(`${template}`, {encoding: 'utf-8'});
// read_cmp = new fs.createReadStream(`${components}`, {encoding: 'utf-8'});

readdir.readdir(components, {withFileTypes: true}).then(files => {
  for(let file of files) {
    const component = path.join(`${__dirname}/components/${file.name}`);
    let read_cmp = new fs.createReadStream(`${component}`, {encoding: 'utf-8'});
    read_cmp.on('data', (datacmp) => {
      const file_ext = path.extname(file.name);
      const baseName = path.basename(file.name, file_ext);
      //console.log(datacmp)
      read_file_tmp.on('data', (data) => {
        console.log(data.replace(`{{${baseName}}`, datacmp));
        //console.log(`{{${baseName}}`)
      });
    });
  }
});
// read_cmp.on('data', (data) => {
//   console.log(data)
// })

fs.promises.mkdir(projectDistAssets, { recursive: true }).then(() => {
  readdir.readdir(`${assets}`, {withFileTypes: true}).then((folders) => {
    for (let folder of folders) {
      if(folder.isDirectory()) {
        fs.promises.mkdir(`${projectDistAssets}/${folder.name}`, { recursive: true }).then(() => {
          readdir.readdir(`${assets}/${folder.name}`, {withFileTypes: true}).then((files) => {
            for(let file of files) {
              fs.copyFile(`${assets}/${folder.name}/${file.name}`, `${projectDistAssets}/${folder.name}/${file.name}`, (err)=> {
                if(err) throw err;
                //console.log('done');
              });
            }
          });
        });
      }
    }
  });
});

// eslint-disable-next-line no-undef

