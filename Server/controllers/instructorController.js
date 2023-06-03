 
 const connection = require('../db') 


 

 exports.getInstructor =  (req, res) => {
    if (!req.params.id) {
      return ( res.json({Error:"Not found"}));
    }
    connection.query(
      'SELECT * FROM user WHERE userID = ? and role = "instructor" ',
      [req.params.id],
      function (err, data, fields) {
        if (err)  return ( res.json({Error:"Not found"}));
        res.json({
          status: "success",
          data: data,
        });
      }
    );
   }
 exports.getAllInstructors = (req, res) => {
   
      const stmt = "SELECT * FROM user WHERE role = 'instructor' ";
  
      connection.query(stmt, (err, data) => {
          if (err) return res.json({ status: err });
  
          res.json({
            status: "success", 
            data: data});
          console.log(data);
      })
  }

 exports.getCoursesCount = (req, res) => {
  if (!req.params.id) {
    return ( res.json({Error:"Not found"}));
  }
    const stmt = "SELECT count(*) FROM gamified_course WHERE instructorID=? ";

    connection.query(stmt,   [req.params.id], (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.json({data: data[0]['count(*)']});
        console.log(data[0]['count(*)']);
    })
}

exports.getHackCount = (req, res) => {
  if (!req.params.id) {
    return ( res.json({Error:"Not found"}));
  }
    const stmt = "SELECT count(*) FROM challenge WHERE creator=? ";

    connection.query(stmt,   [req.params.id], (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.json({data: data[0]['count(*)']});
        console.log(data[0]['count(*)']);
    })
}
exports.getScheduleByInstructor=(req, res)=>{
  if (!req.params.id) {
    return ( res.json({Error:"Not found"}));
  }
    const st= 'SELECT * FROM schedule, challenge WHERE challenge=challengeID and creator=?';

    connection.query(st, [req.params.id],(err, result) => {
        if (err) return res.json({ Error: err });
        console.log( );
        res.json({ status: "success" , data:result});
      
    })
}