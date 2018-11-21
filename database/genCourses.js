// run: node --max-old-space-size=4096 database/genCourses.js

// const courses = require('./courseList.js');
const faker = require('faker');
const { performance } = require('perf_hooks');
const fs = require('fs');

const n = 10000000;

const capitalize = (str) => {
  const ascii = str.charCodeAt(0);
  if (ascii >= 97) return String.fromCharCode(ascii - 32) + str.slice(1);
  return str;
};

const tsvLine = array => `${array.join('\t')}\n`;

const startTime = performance.now();

const colNames = [
  'id',
  'course_name',
  'rating',
  'reviews',
  'lectures',
  'num_hours',
  'full_price',
  'disc_price',
  'photo_url',
];

const wstream = fs.createWriteStream('/Users/tan/sdc_data/courses.txt');
wstream.write(tsvLine(colNames));

const { ingverb } = faker.hacker;
const { bsAdjective, bsNoun } = faker.company;

for (let i = 1; i <= n; i++) {
  const c = {
    id: i,
    course_name: `${capitalize(ingverb())} ${bsAdjective()} ${bsNoun()}`,
    rating: Math.ceil(Math.random() * 50) / 10,
    reviews: Math.ceil(Math.random() * 1000),
    lectures: Math.ceil(Math.random() * 100),
    full_price: Math.floor(Math.random() * 100000) / 100,
    photo_url: `https://picsum.photos/200/300?image=${Math.ceil(Math.random() * 50)}`,
  };
  c.num_hours = Math.floor(c.lectures * (Math.random() * 10));
  c.disc_price = Math.floor(c.full_price * 10) / 100;

  wstream.write(tsvLine(colNames.map(name => c[name])));
}

console.log('n: ', n, ', time elapsed (ms): ', performance.now() - startTime);

wstream.end();
