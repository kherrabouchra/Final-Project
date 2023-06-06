const connection = require("../db");

const createCourse = (req, res) => {
  const stmt = "INSERT INTO gamified_course SET ?";

  const newCourse = req.body;

  connection.query(stmt, newCourse, (err, data) => {
    if (err) return res.status(500).json({ status: err });

    /* res.status(201).json({ "message": "Course created successfully" }); */

    const courseID = data.insertId; // Get the course ID from the database after insertion
    res.status(201).json({ status : 'success',  message: "Course created successfully", courseID  });

    console.log(newCourse);
  });
};

// const getAllCourses = (req, res) => {
//   const stmt =
//     "SELECT gamified_course.*, COUNT(quiz.id) AS quizCount FROM gamified_course LEFT JOIN quiz ON gamified_course.courseID= quiz.id WHERE instructorID = ? GROUP BY gamified_course.courseID;";

//   const id = req.params.id;

//   connection.query(stmt, id, (err, data) => {
//     if (err) return res.status(500).json({ status: err });

//     res.status(200).json(data);
//     console.log(data);
//   });
// };

 
const getAllCoursesByInst = (req, res) => {
    const stmt =
      "SELECT *  from gamified_course WHERE instructorID = ? ";
  
    const id = req.params.id;
  
    connection.query(stmt, id, (err, data) => {
      if (err) return res.json({ status: err });
  
      res.json({status:"success",data:data});
      console.log(data);
    });
  };
const updateCourse = (req, res) => {
  const stmt = "UPDATE gamified_course SET ? WHERE courseID = ?";

  const id = req.params.id;
  const updatedCourse = req.body;

  if (!id)
    return res.status(400).json({ message: `Error: Course ${id} not found` });

  connection.query(stmt, [updatedCourse, id], (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json({ message: `Course ${id} updated successfully` });
  });
};

const deleteCourse = (req, res) => {
  const stmt = "DELETE FROM gamified_course WHERE courseID = ?";

  const id = req.params.id;

  if (!id)
    return res.status(400).json({ message: `Error: Course ${id} not found` });

  connection.query(stmt, [id], (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json({ message: `Course ${id} deleted successfully` });
  });
};

const createChapter = (req, res) => {
  const stmt = "INSERT INTO chapters (courseID, chapterName) VALUES ?";
console.log(req.body);
  const courseID= req.body.courseID;
   const chapterNames = req.body.chapterNames;
  const chaptersData = chapterNames.map((chapterName) => [
    courseID,
    chapterName,
  ]);

  connection.query(stmt, [chaptersData], (err, data) => {
    if (err) return res.json({ Error: err });

    res.json({status:'success',  message: "Chapters created successfully" });
  });
};

const getAllChapters = (req, res) => {
  const stmt =
    "SELECT * FROM botscompetedb.chapters WHERE chapters.courseID = ?";

  const courseID = req.params.id;

  connection.query(stmt, courseID, (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json(data);
    console.log(data);
  });
};

const getChapter = (req, res) => {
  const stmt = "SELECT * FROM botscompetedb.chapters WHERE chapters.id = ?";

  const chapterID = req.params.id;

  connection.query(stmt, chapterID, (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json(data);
    console.log(data);
  });
};

const createLesson = (req, res) => {
  const stmt =
    "INSERT INTO lessons (lessonName, points, videoUrl, notebookURL, csvUrl, chapterID) VALUES ?";

  const lessonsData = req.body.map((lesson) => [
    lesson.lessonName,
    lesson.points,
    lesson.videoUrl,
    lesson.notebookURL,
    lesson.csvUrl,
    lesson.chapterID,
  ]);

  connection.query(stmt, [lessonsData], (err, data) => {
    if (err) return res.status(500).json({ status: err });
    const lessonIDs = []; // Store the generated lessonIDs

    for (let i = 0; i < data.affectedRows; i++) {
      lessonIDs.push(data.insertId + i); // Generate lessonIDs based on the insertId
    }

    res.status(201).json({ lessonIDs });
  });
};

const updateLesson = (req, res) => {
    const lessonsData = req.body; // Array of lessons to update
  
    lessonsData.forEach((lesson) => {
      const stmt = "UPDATE lessons SET lessonName = ?, points = ?, videoUrl = ?, notebookURL = ? WHERE id = ?";
  
      const values = [lesson.lessonName, lesson.points, lesson.videoUrl, lesson.notebookURL, lesson.id];
  
      connection.query(stmt, values, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
  
        console.log(`Lesson with ID ${lesson.id} updated successfully`);
      });
    });
  
    res.status(200).json({ message: "Lessons updated successfully" });
  };

const getAllLessons = (req, res) => {
  const stmt =
    "SELECT * FROM lessons LEFT JOIN quiz ON lessons.id = quiz.lessonID WHERE chapterID = ?";

  const courseID = req.params.id;

  connection.query(stmt, courseID, (err, data) => {
    if (err) return res.status(500).json({ status: err });

    /* if (data.length === 0) return res.status(400).json({ "message": `Course ${id} not found`}); */

    res.json(data[0]);
    console.log(data[0]);
  });
};



const getAllCoursesQuiz = (req, res) => {
  const stmt =
    "SELECT gamified_course.*, COUNT(quiz.id) AS quizCount FROM gamified_course LEFT JOIN quiz ON gamified_course.id = quiz.id ";

  connection.query(stmt, (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json(data);
    console.log(data);
  });
};

const getAllCourses = (req, res) => {
    const stmt = 'SELECT * FROM gamified_course ';

    connection.query(stmt, (err, data) => {
        if (err) return res.json({ status: err });

        res.json({data: data ,status:'success'});
        console.log(data);
    })
}



const getCourse = (req, res) => {
  const stmt = 'SELECT * FROM gamified_course where courseID =? ';

  const id = req.params.id;

  connection.query(stmt, id, (err, data) => {
      if (err) return res.json({ status: err });

      if (data.length === 0) return res.json({ "message": `Course ${id} not found`});

      res.json({status: "success", data: data[0]});
      console.log(data[0]);
  })
}
const getLesson = (req, res) => {
  const stmt =
  "SELECT chapters.chapterName, lessons.*, quiz.id AS quizID, quiz.exercise, quiz.option_a, quiz.option_b, quiz.option_c, quiz.option_d, quiz.correct_answer, quiz.lessonID FROM chapters LEFT JOIN lessons ON lessons.chapterID = chapters.id LEFT JOIN quiz ON lessons.id = quiz.lessonID WHERE lessons.id = ?";
  const lessonID = req.params.id;

  connection.query(stmt, lessonID, (err, data) => {
    if (err) return res.json({ status: err });

    /* if (data.length === 0) return res.status(400).json({ "message": `Course ${id} not found`}); */

    res.json({status:"success", data:data[0]});
    console.log(data[0]);
  });
};


const getCourseLesson = (req, res) => {
  const stmt =
    "SELECT chapters.chapterName, lessons.*, quiz.id AS quizID, quiz.exercise, quiz.option_a, quiz.option_b, quiz.option_c, quiz.option_d, quiz.correct_answer, quiz.lessonID FROM chapters LEFT JOIN lessons ON lessons.chapterID = chapters.id LEFT JOIN quiz ON lessons.id = quiz.lessonID WHERE chapters.courseID = ?";

  const courseID  = req.params.id;

  connection.query(stmt, courseID , (err, data) => {
    if (err) return res.status(500).json({ status: err });

    /* if (data.length === 0) return res.status(400).json({ "message": `Course ${id} not found`}); */

    res.json(data[0]);
    console.log(data[0]);
  });
};

const createQuiz = (req, res) => {
  const stmt =
    "INSERT INTO quiz (exercise, option_a, option_b, option_c, option_d, correct_answer, lessonID) VALUES ?";

  const newQuiz = req.body.map((lesson) => [
    lesson.exercise,
    lesson.option_a,
    lesson.option_b,
    lesson.option_c,
    lesson.option_d,
    lesson.correct_answer,
    lesson.lessonID, // Use the lessonID from the lessons array
  ]);

  connection.query(stmt, [newQuiz], (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(201).json({ message: "Quiz created successfully" });
    console.log(newQuiz);
  });
};

const updateQuiz = (req, res) => {
  const stmt = "UPDATE quiz SET ? WHERE id = ?";

  const newQuiz = req.body.map((lesson) => [
    lesson.exercise,
    lesson.option_a,
    lesson.option_b,
    lesson.option_c,
    lesson.option_d,
    lesson.correct_answer,
  ]);

  connection.query(stmt, [newQuiz], (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json({ message: "Quiz updated successfully" });
  });
};

module.exports = {
  createCourse, 
  getAllCoursesByInst,
  getAllCourses, getCourseLesson,
  getCourse,
  updateCourse,
  deleteCourse,
  getAllChapters,
  getChapter,
  getAllLessons,
  getLesson,
  createChapter,
  createLesson,
  createQuiz,
  updateLesson,
  updateQuiz,
};
// const connection = require('../db.js');

// exports.createCourse = (req, res) => {
//     const stmt = 'INSERT INTO gamified_course SET ?';

//     const newCourse = req.body; 
    
//     connection.query(stmt, newCourse, (err, data) => {
//         if (err) return res.json({ status: err });
//         const courseID = data.insertId;
//         res.json({ status: "success",
//             message: "Course created successfully" , courseID});
    
//     })
// }

// exports.getAllCourses = (req, res) => {
//     const stmt = 'SELECT * FROM gamified_course ';

//     connection.query(stmt, (err, data) => {
//         if (err) return res.json({ status: err });

//         res.json({data: data ,status:'success'});
//         console.log(data);
//     })
// }
// exports.getAllCoursesByInst = (req, res) => {
//     const stmt =
//       "SELECT gamified_course.*, COUNT(quiz.id) AS quizCount FROM gamified_course LEFT JOIN quiz ON gamified_course.id = quiz.id WHERE instructorID = ? GROUP BY gamified_course.id;";
  
//     const id = req.params.id;
  
//     connection.query(stmt, id, (err, data) => {
//       if (err) return res.status(500).json({ status: err });
  
//       res.status(200).json(data);
//       console.log(data);
//     });
//   };


// exports.getQuizCount = (req, res) => {
//     const stmt = 'SELECT COUNT(quizID) AS quizCount FROM quiz WHERE course = ?';

//     const id = req.params.id;

//     connection.query(stmt, id, (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         if (data.length === 0) return res.status(400).json({ "message": `Course ${id} not found`});

//         res.json(data[0]);
//         console.log(data[0]);
//     })
// }

// exports.updateCourse = (req, res) => {
//     const stmt = 'UPDATE gamified_course SET ? WHERE id = ?';

//     const id = req.params.id;
//     const updatedCourse = req.body;

//     if (!id) return res.json({ "message": `Error: Course ${id} not found`});

//     connection.query(stmt, [updatedCourse, id], (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         res.json({ "message": `Course ${id} updated successfully`});
//     })
// }

// exports.deleteCourse = (req, res) => {
//     const stmt = 'DELETE FROM gamified_course WHERE courseID = ?';

//     const id = req.params.id;

//     if (!id) return res.json({ "message": `Error: Course ${id} not found`});
    
//     connection.query(stmt, [id], (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         res.json({ "message": `Course ${id} deleted successfully`});
//     })
// }
// exports.createEnrolledCourse = (req, res) => {
//     const stmt = 'INSERT INTO enrolled_course SET ?';

//     const enrolledCourse = req.body;
//     const developerID = req.body.developer;
//     const JSONsyllabus = JSON.stringify(enrolledCourse.currentMaterial);
//     enrolledCourse.currentMaterial = JSONsyllabus;
    
//     connection.query(stmt, enrolledCourse, (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         res.status(201).json({ "message": `Enrolled developer ${developerID} in course successfully` });
//         console.log(enrolledCourse);
//     })
// }
 
// exports.createChapter = (req, res) => {
//     const stmt = 'INSERT INTO chapters (courseID, chapterName) VALUES ?';

//     const { courseID, chapterNames } = req.body;

//     const chaptersData = chapterNames.map((chapterName) => [courseID, chapterName]);
    
//     connection.query(stmt, [chaptersData], (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         res.status(201).json({ "message": "Chapter created successfully" });
//         console.log(data);
//     })
// }

// exports.getAllChapters = (req, res) => {
//     const stmt = 'SELECT * FROM botscompetedb.chapters WHERE chapters.courseID = ?';

//     const courseID = req.params.id;

//     connection.query(stmt, courseID, (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         res.status(200).json(data);
//         console.log(data);
//     })
// }

// exports.getChapter = (req, res) => {
//     const stmt = 'SELECT * FROM botscompetedb.chapters WHERE chapters.id = ?';

//     const chapterID = req.params.id;

//     connection.query(stmt, chapterID, (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         res.status(200).json(data);
//         console.log(data);
//     })
// }

// exports.createLesson = (req, res) => {
//     const stmt = 'INSERT INTO lessons (lessonName, points, video, chapterID) VALUES ?';

//     /* const { lessonName, points, chapterID } = req.body; */
//     const lessonsData = req.body.lessons.map((lesson) => [lesson.lessonName, lesson.points,  lesson.video, lesson.chapterID]);

//     connection.query(stmt, [lessonsData], (err, data) => {
//         if (err) return res.json({ status: err });

//         const lessonID = data.insertId; // Get the course ID from the database after insertion
        
//         res.json({ lessonID });
        
//         console.log(lessonsData);
//     })
// }

// exports.getAllLessons = (req, res) => {
//     const stmt = 'SELECT * FROM lessons LEFT JOIN quiz ON lessons.id = quiz.lessonID WHERE chapterID = ?';

//     const courseID = req.params.id;

//     connection.query(stmt, courseID, (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         /* if (data.length === 0) return res.status(400).json({ "message": `Course ${id} not found`}); */

//         res.json(data[0]);
//         console.log(data[0]);
//     })
// }
// exports.getLesson = (req, res) => {
//     const stmt = 'SELECT chapters.chapterName, lessons.*, quiz.id AS quizID, quiz.exercise, quiz.instructions, quiz.option_a, quiz.option_b, quiz.option_c, quiz.option_d, quiz.correct_answer, quiz.lessonID FROM chapters LEFT JOIN lessons ON lessons.chapterID = chapters.id LEFT JOIN quiz ON lessons.id = quiz.lessonID WHERE lessons.id = ?';

//     const lessonID = req.params.id;

//     connection.query(stmt, lessonID, (err, data) => {
//         if (err) return res.status(500).json({ status: err });

//         /* if (data.length === 0) return res.status(400).json({ "message": `Course ${id} not found`}); */

//         res.json(data[0]);
//         console.log(data[0]);
//     })
// }

// exports.updateLesson = (req, res) => {
//     const lessonsData = req.body; // Array of lessons to update
  
//     lessonsData.forEach((lesson) => {
//       const stmt = "UPDATE lessons SET lessonName = ?, points = ?, videoUrl = ?, notebookURL = ? WHERE id = ?";
  
//       const values = [lesson.lessonName, lesson.points, lesson.videoUrl, lesson.notebookURL, lesson.id];
  
//       connection.query(stmt, values, (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
  
//         console.log(`Lesson with ID ${lesson.id} updated successfully`);
//       });
//     });
  
//     res.status(200).json({ message: "Lessons updated successfully" });
//   };


// exports.createQuiz = (req, res) => {
//     const stmt = 'INSERT INTO Quiz SET ?';

//     const newQuiz = req.body;
    
//     connection.query(stmt, newQuiz, (err, data) => {
//         if (err) return res.json({ Error: err });

//         res.json({ "message": "Quiz created successfully" });
//         console.log(newQuiz);
//     })
// }
 