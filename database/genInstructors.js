// run: node --max-old-space-size=4096 database/genInstructors.js

const faker = require('faker');
const { performance } = require('perf_hooks');
const fs = require('fs');

const tsvLine = array => `${array.join(',')}\n`;
// const tsvLine = array => `${array.join('\t')}\n`;

const startTime = performance.now();

const colNames = [
  'id',
  'inst_name',
  'students',
  'title',
  'photo_url',
  'blurb',
];

const wstream = fs.createWriteStream('/Users/tan/sdc_data/instructors.csv');
// const wstream = fs.createWriteStream('/Users/tan/sdc_data/instructors.txt');
wstream.write(tsvLine(colNames));

const n = 500000;

for (let i = 1; i <= n; i += 1) {
  const instructor = {
    id: i,
    inst_name: faker.name.findName(),
    students: Math.floor(Math.random() * 100000),
    title: faker.lorem.words(),
    blurb: `"${faker.lorem.paragraphs()}"`,
  };
  instructor.photo_url = Math.random() > 0.5
    ? `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 90)}.jpg`
    : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`;

  wstream.write(tsvLine(colNames.map(name => instructor[name])));
  // skipping: rating, reviews, courses
}

console.log('n: ', n, ', time elapsed (ms): ', performance.now() - startTime);

wstream.end();
