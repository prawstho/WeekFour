const fs = require('fs');

fs.readFile('./files/peter.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Read data from disk...')
  console.log(data); 
})

// Demonstrate the async qualities of node
console.log('Good Day!')

process.on('uncaughtException', err => {
  console.error(`There was an uncaught error ${err}`);
  process.exit(1);
});

// Watch the Dave Gray video. https://youtu.be/yQBw8skBdZU
// he does a great job of explaining asynchronous nature of node
// watch the video to the end. He also talks about checking if
// files or folder (directories) exist and how to create them.