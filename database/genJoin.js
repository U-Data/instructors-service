// run: node --max-old-space-size=8192 database/genJoin.js
// memory not enough for 4096

const { performance } = require('perf_hooks');
const fs = require('fs');

const startTime = performance.now();

const tsvLine = array => `${array.join('\t')}\n`;

const colNames = [
  'course_id',
  'inst_id',
];

const wstream = fs.createWriteStream('/Users/tan/sdc_data/joins.txt');
wstream.write(tsvLine(colNames));

const numCoursesMax = 10000000;
const numInstMax = 500000;

let count = 0;
for (let i = 1; i <= numCoursesMax; i += 1) {
  const numInstructors = Math.ceil(Math.random() * 3);
  const assignedIds = [];
  for (let j = 0; j < numInstructors; j += 1) {
    let newId = Math.ceil(Math.random() * numInstMax);
    while (assignedIds.includes(newId)) {
      newId = Math.ceil(Math.random() * numInstMax);
    }
    assignedIds.push(newId);
    wstream.write(tsvLine([i, newId]));
    count += 1;
  }
}

console.log('n: ', count, ', time elapsed (ms): ', performance.now() - startTime);

wstream.end();
