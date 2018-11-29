const { performance } = require('perf_hooks');
const faker = require('faker');
const fs = require('fs');

const capitalize = (str) => {
  const code = str.charCodeAt(0);
  if (code >= 97) return String.fromCharCode(code - 32) + str.slice(1);
  return str;
};

const startTime = performance.now();

const wstream = fs.createWriteStream('myOutput.txt');

for (let i = 0; i < 100000; i++) {
  const { ingverb } = faker.hacker;
  const { bsAdjective, bsNoun } = faker.company;

  const course = `${capitalize(ingverb())} ${bsAdjective()} ${bsNoun()}`;
  

  const line = `${capitalize(ingverb())} ${bsAdjective()} ${bsNoun()}\n`;
  wstream.write(line);
}

console.log(performance.now() - startTime);

wstream.end();
