const connection = require('../db.js');

const dayjs = require('dayjs');
const createPath = (req, res) => {
    const courses = req.body.course;
    const b = req.body.badge;
    const stmt1 = 'SELECT badgeID FROM badge WHERE type="learning path" AND color=?';
  
    connection.query(stmt1, b, (err, data) => {
      if (err) {
        res.json({ Error: err });
        return;
      }
   
      const badgeID = data[0].badgeID;
      let completedQueries = 0;
  
      courses.forEach((course) => {
        const id = dayjs().format('DDHHmmss');
        const stmt2 = 'INSERT INTO learning_path (learningPathID, name, description, course, badge) VALUES (?, ?, ?, ?, ?)';
        const values = [id, req.body.name, req.body.description, course, badgeID];
  
        connection.query(stmt2, values, (err, data) => {
          completedQueries++;
  
          if (err) {
            console.log(err);
          }
  
          if (completedQueries === courses.length) {
            if (err) {
              res.json({ status: 'error', message: 'Failed to create path' , err});
            } else {
              res.json({ status: 'success', message: 'Path created successfully' });
            }
          }
        });
      });
    });
  };
  
  


const getAllPaths = (req, res) => {
    const stmt = "SELECT learningPathID, name, description  FROM learning_path GROUP BY learningPathID, name, description";

    connection.query(stmt, (err, data) => {
        if (err) return res.json({ status: err });

        res.json({status: "success", data: data});
        console.log(data);
    })
}

const getBadge = (req, res) => {
    const s = "SELECT DISTINCT badge FROM learning_path WHERE learningPathID = ?";
    connection.query(s, [req.params.id], (err, data) => {
      if (err) {
        return res.json({ status: err });
      }
  
      const badge = data[0].badge; // Assuming there is only one distinct badge value returned
  
      const stmt = "SELECT color FROM badge WHERE badgeID = ? AND type = 'learning path'";
      connection.query(stmt, [badge], (err, color) => {
        if (err) {
          return res.json({ status: err });
        }
  
        res.json({ status: "success", data: color });
        console.log(data);
      });
    });
  };
  
const getPath = (req, res) => {
    const stmt = 'SELECT * FROM learning_path WHERE learningPathID = ?';

    const pathID = req.params.id;

    connection.query(stmt, pathID, (err, data) => {
        if (err) return res.json({ status: err });

        if (data.length === 0) return res.json({ "message": "Path not found"});

        res.json({status: "success", data :data[0]});
        console.log(data[0]);
    })
}

const updatePath = (req, res) => {
    const stmt = 'UPDATE learning_path SET ? WHERE id = ?';

    const pathID = req.params.id;
    const updatedPath = req.body;

    if (!pathID) return res.status(400).json({ "message": `Error: Path ${pathID} not found`});

    connection.query(stmt, [updatedPath, pathID], (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.status(200).json({ "message": `Path ${pathID} updated successfully`});
    })
}

const deletePath = (req, res) => {
    const stmt = 'DELETE FROM learning_path WHERE id = ?';

    const pathID = req.body.id;

    if (!pathID) return res.status(400).json({ "message": `Error: Path ${pathID} not found`});

    connection.query(stmt, [pathID], (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.status(200).json({ "message": `Path ${pathID} deleted successfully`});
    })
}

const createCoursePath = (req, res) => {
    const stmt = 'INSERT INTO gamified_course SET ?';

    const newCourse = req.body;
    connection.query(stmt, newCourse, (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.status(201).json({ "message": "Course created successfully" });
        console.log(newCourse);
    })
}

const getAllCoursesPath = (req, res) => {
    const stmt = 'SELECT learning_path.course, gamified_course.*  FROM learning_path ,gamified_course WHERE learningPathID = ? and course=courseID';

    connection.query(stmt, [req.params.id] ,(err, data) => {
        if (err) return res.json({ status: err });

        res.json({status:"success", data:data});
        console.log(data);
    })
}

const getCoursePath = (req, res) => {
    const stmt = 'SELECT gamified_course.courseID, gamified_course.Name, gamified_course.description, gamified_course.syllabus, gamified_course.content, gamified_course.duration, gamified_course.points, gamified_course.instructorID, gamified_course.quiz, learning_path.id FROM gamified_course, learning_path WHERE id = learning_path AND courseID = ?';

    const courseID = req.params.id;
    connection.query(stmt, courseID, (err, data) => {
        if (err) return res.status(500).json({ status: err });

        if (data.length === 0) return res.status(400).json({ "message": `Course ${courseID} not found`});

        res.json(data[0]);
        console.log(data[0]);
    })
}

const getQuizCount = (req, res) => {
    const stmt = 'SELECT COUNT(quiz.id)  from quiz where lessonID in (select id from lesson where chapterID in (select id from chapter where courseID=?)) '
    const pathID = req.params.id;

    connection.query(stmt, pathID, (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.json(data[0]);
        console.log(data[0]);
    })
}

/* const updateCoursePath = (req, res) => {
    const stmt = 'UPDATE gamified_course SET ? WHERE courseID = ?';

    const courseID = req.params.id;
    const updatedCourse = req.body;

    if (!courseID) return res.status(400).json({ "message": `Error: Course ${courseID} not found`});

    connection.query(stmt, [updatedCourse, courseID], (err, data) => {
        if (err) return res.status(500).json({ status: err });
        
        res.status(200).json({ "message": `Course ${courseID} updated successfully`});
    })
} */

/* const deleteCoursePath = (req, res) => {
    const stmt = 'DELETE FROM gamified_course WHERE courseID = ?';

    const courseID = req.params.id;
    connection.query(stmt, [courseID], (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.status(200).json({ "message": `Path ${courseID} deleted successfully`});
    })
} */

module.exports = { getBadge,createPath,getQuizCount, getAllPaths, getPath, updatePath, deletePath, createCoursePath, getAllCoursesPath, getCoursePath };