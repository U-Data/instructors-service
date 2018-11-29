// inverse CDF for random unif(0, 1) for Kumaraswamy distribution
const invCDF = (a, b) => (1 - ((1 - Math.random()) ** (1/b))) ** (1/a);

const fs = require('fs');

const n = 100000;
const N = 10000000;

const wstream = fs.createWriteStream('/Users/tan/sdc_data/stressCourses.csv');
wstream.write('course_id\n');

for (let i = 1; i <= n; i += 1) {
  wstream.write(`${Math.ceil(invCDF(8, 2) * N)}\n`);
}

wstream.end();
