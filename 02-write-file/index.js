const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');
const path = require('path/posix');
const file_save = path.join(__dirname, '', 'text.txt') ;
const ws = new fs.WriteStream(file_save);


const rl = readline.createInterface({ input, output });
console.log('Введите текст');
rl.on('line', (input) => {
  if(input === 'exit') {
    process.exit();
  }else {
    console.log(`Вы ввели: ${input}, продолжайте`);
    ws.write(input);
  }
});