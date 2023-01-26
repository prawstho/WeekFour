const fs = require('fs');

fs.readFile('./files/user.json', 'utf8', (err, jsondata) => {
  if (err) console.log(err);
  else {
    try {
      console.log(jsondata);
      console.log('first')
      console.log(jsondata.firstname);
      // console.log(user.firstname);
      console.log('second')
      const user = JSON.parse(jsondata);
      console.log('third')
      console.log(user.firstname);
      console.log(user.lastname);
      user.lastname = 'Bob';
      // save the file as plain text (JSON.stingify)

    } catch (err) {
      console.error('Error parsing json file', err)
    }
  }
  console.log('Read json data from disk...')
})

// Super simple introduction to reading and writing json
// Take the 10 minutes to watch this video;
// https://youtu.be/HrjC6RwEpt0