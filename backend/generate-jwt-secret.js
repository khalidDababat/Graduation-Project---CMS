const crypto = require('crypto');
const fs = require('fs');

const secret = crypto.randomBytes(32).toString('base64');

console.log('Generated JWT Secret:\n');
console.log(secret);


const envLine = `JWT_SECRET=${secret}\n`;

fs.appendFile('.env', envLine, (err) => {
  if (err) {
    console.error(' Failed to write to .env:', err);
  } else {
    console.log('\n JWT_SECRET saved to .env file.');
  }
});
