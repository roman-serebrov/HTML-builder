const fs = require('fs');
const path = require('path/posix');
const file = path.join('01-read-file', '', '', 'text.txt');
const stream = new fs.ReadStream(file, {encoding: 'utf-8'});
let data = '';
stream.on('data', (res) => {
  data = res;
});

stream.on('end', () => {
  console.log(data);
});

stream.on('error', (err) => {
  if(err.code === 'ENOENT') {
    console.log('File not exist');
  } else {
    console.log(err)
  }
});