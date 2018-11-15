/* eslint-disable prefer-arrow-callback */
const express = require('express');
const path = require('path');
const mysql = require('../database/sqlizeIndex.js');

const app = express();

app.use('/courses', express.static(path.join(__dirname, '/../client/dist')));

app.get('/courses/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/:id/instructors', (req, res) => {
  mysql.sequelize.authenticate()
    .then(function getInstructorIds() {
      return mysql.Join.findAll({ where: { course_id: req.params.id } });
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
        const newPromise = mysql.Instructors.findOne({ where: { id: inst.dataValues.inst_id } })

          .then(function getInstructorInfo(instData) {
            instructor.instInfo = instData;
            return mysql.Join.findAll({ where: { inst_id: inst.dataValues.inst_id } });
          })

          .then(function getCourseInfo(courses) {
            return mysql.Courses.findAll({
              where: {
                id: [courses
                  .map(course => course.course_id)
                  .filter(c => c != req.params.id)],
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
  mysql.sequelize.authenticate()
    .then(() => mysql.Courses.max('id'))
    .then((maxId) => mysql.Courses.destroy({
      where: {
        id: maxId,
      },
    }))
    .then(() => res.end());
});

app.patch('/courses', (req, res) => {
  mysql.sequelize.authenticate()
    .then(() => mysql.Courses.max('id'))
    .then((maxId) => mysql.Courses.update({
      full_price: 999,
    }, {
      where: {id: maxId},
    }))
    .then(() => res.end());
});

app.post('/courses', (req, res) => {
  mysql.sequelize.authenticate()
    .then(() => mysql.Courses.create({
      course_name: 'New Course',
    }))
    .then(() => res.end()); 
});
////////////////////////////////////////////////////

app.listen(8081, () => {
  console.log("listening on port 8081");
});
