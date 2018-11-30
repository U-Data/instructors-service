/* eslint-disable prefer-arrow-callback */
require('newrelic');
const express = require('express');
const path = require('path');
const sql = require('../database/sqlizeIndex.js');

const app = express();

app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/courses', express.static(path.join(__dirname, '/../client/dist')));

app.get('/courses/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/:id/instructors', (req, res) => {
  sql.sequelize.authenticate()
    .then(function getInstructorIds() {
      return sql.Join.findAll({
        attributes: ['inst_id'],
        where: { course_id: req.params.id },
      });
    })

    .then(function getAllInstructors(data) {
      const info = [];
      const promises = [];

      data.forEach(function getSingleInstructor(inst) {
        const instructor = ({
          id: inst.dataValues.inst_id,
          instInfo: null,
          courseInfo: null,
        });
        const newPromise = sql.Instructors.findOne({ where: { id: inst.dataValues.inst_id } })

          .then(function getInstructorInfo(instData) {
            instructor.instInfo = instData;
            return sql.Join.findAll({
              attributes: ['course_id'],
              where: { inst_id: inst.dataValues.inst_id },
            });
          })

          .then(function getCourseInfo(courses) {
            return sql.Courses.findAll({
              where: {
                id: courses
                  .map(course => course.course_id)
                  .filter(c => c !== req.params.id),
              },
            });
          })

          .then(function pushInfo(courseData) {
            instructor.courseInfo = courseData;
            info.push(instructor);
          });

        promises.push(newPromise);
      });
      return Promise.all(promises)
        .then(() => res.send(info));
    });
});

///////////// New additions by KTS /////////////
app.delete('/courses', (req, res) => {
  sql.sequelize.authenticate()
    .then(() => sql.Courses.max('id'))
    .then((maxId) => sql.Courses.destroy({
      where: {
        id: maxId,
      },
    }))
    .then(() => res.end());
});

app.patch('/courses', (req, res) => {
  sql.sequelize.authenticate()
    .then(() => sql.Courses.max('id'))
    .then((maxId) => sql.Courses.update({
      full_price: 999,
    }, {
      where: {id: maxId},
    }))
    .then(() => res.end());
});

app.post('/courses', (req, res) => {
  sql.sequelize.authenticate()
    .then(() => sql.Courses.create({
      course_name: 'New Course',
    }))
    .then(() => res.end()); 
});
////////////////////////////////////////////////////

app.listen(8081, () => {
  console.log("listening on port 8081");
});
