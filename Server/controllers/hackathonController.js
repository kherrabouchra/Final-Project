const connection = require('../db.js');
const moment = require('moment');
const dayjs = require ('dayjs');
const { nanoid } = require('nanoid');
  
exports.createHackathon = (req, res) => {
    const stmt = 'INSERT INTO  challenge SET ?';
   
    const newHack = {     
        type: "hackathon",
        name:req.body.name,
        description: req.body.description,
        background: req.body.background,
        level: req.body.level,
        rules: req.body.rules,
        evaluationCriteria: req.body.evaluationCriteria,
        creationDate: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    } 
    console.log(newHack);
    connection.query(stmt, [newHack], (err, data) => {
        if (err) return res.json({ Error: err });
        res.json({ status: "success", message: "Hackathon created successfully", id: data.insertId});
    })
}

// function htmlToJson(html) {
//     if (typeof html !== 'string') {
//         throw new Error('Input must be a string');
//     }
//     // Escape quotation marks used around HTML attributes
//     html = html.replace(/"/g, '\\"');
  
//     // Escape the forward slash in HTML end tags
//     html = html.replace(/<\/([^>]+)>/g, '<\\/$1>');
  
//     // Include a space between the tag name and the slash on self-closing tags
//     html = html.replace(/<(\w+)(\/>)/g, '<$1 $2');
//     const json = JSON.stringify({ html });
//     return json;
// }


exports.createHackathonQuestion = (req, res) => {
    const stmt = 'INSERT INTO challenge_content    set ?';
     
      const q={  challenge:  req.body.id,
        question:  req.body.questions[0].question,
        solution: req.body.questions[0].solution,
        points: req.body.questions[0].points
       };
    console.log(q);
    connection.query(stmt, [q], (err, data) => {
        if (err) return res.json({ Error: err });
        res.json({ 
            status: "success",
            Message: "Hackathon question created successfully" });
    }) 
}



exports.getAllHackathons = (req, res) => {
    const stmt = 'SELECT * FROM challenge, schedule where challenge.type="hackathon"  and challengeID=challenge ';

    connection.query(stmt, (err, data) => {
        if (err) return res.status(500).json({ status: err });
        res.status(200).json({Status: "success",data: data});
        console.log(data);
    })
}

exports.getHackathonsByInst = (req, res) => {
    const stmt = 'SELECT * FROM challenge where challenge.type="hackathon"   and creator=?';
    const id = req.params.id;
    connection.query(stmt,id, (err, data) => {
        if (err) return res.json({ status: err });
        res.json({Status: "success",data: data});
        console.log(data);
    })
}

exports.getHackathon = (req, res) => {
    const stmt = 'SELECT * FROM challenge as h, schedule as s, challenge_content as c where h.challengeID=? and h.type="hackathon" and s.challenge= h.challengeID and c.challenge= h.challengeID ';

    const id = req.params.id;

    connection.query(stmt, id, (err, data) => {
        if (err) return res.json({ status: err });
        if (data.length === 0) return res.json({ "message": `Hackathon ${id} not found`});

        res.json(data[0]);
        console.log(data[0]);
    })
}
 

exports.updateHackathon = (req, res) => {
    const stmt = 'UPDATE challenge SET ? WHERE id = ? and type="hackathon" ';

    const id = req.params.id;
    const updatedCourse = req.body;

    if (!id) return res.status(400).json({ "message": `Error: Course ${id} not found`});

    connection.query(stmt, [updatedCourse, id], (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.status(200).json({ "message": `Course ${id} updated successfully`});
    })
}

exports.deleteHackathon = (req, res) => {
    const stmt = 'DELETE FROM challenge WHERE id = ?';

    const id = req.params.id;

    if (!id) return res.status(400).json({ "message": `Error: Course ${id} not found`});
    
    connection.query(stmt, [id], (err, data) => {
        if (err) return res.status(500).json({ status: err });

        res.status(200).json({ "message": `Course ${id} deleted successfully`});
    })
} 

exports.createSchedule = (req, res) => {
    const s = ' select challengeID from challenge where name = ? '
    connection.query(s, [req.body.name],(err, result)=>{
        if (err) return result.json({ status: err });
        if (result.length === 0) {

            return res.json({ Error: "not found" });
          } 
            const id = result[0].challengeID;
            console.log(id);
      
    
    const stmt = 'INSERT INTO  schedule (startDate, endDate, start, end, challenge , evaluators) values (?)';
    const values = [
        req.body.date,
        req.body.endDate, 
         req.body.start,
        req.body.end,
         id,
        req.body.evaluator] 
    console.log(values);
    connection.query(stmt, [values], (err, data) => {
        if (err) return res.json({ Error: err });
        res.json({ status: "success" , data});
      
    })
    })    
}

exports.getSchedules=(req, res)=>{
    const st= ' select  * from schedule , challenge where startDate = ?  and challenge= challengeID' 
    connection.query(st, [req.query.date],(err, result) => {
        if (err) return res.json({ Error: err });
        console.log( );
        res.json({ status: "success" , data:result});
      
    })
}


exports.updateSchedule = (req, res) => {
    console.log(req.body);
    if (!req.body.s ||!req.body.s.scheduleID) {
      return res.json({ Error: "ID not found" });
    }
     const id =req.body.s.scheduleID;
    const values = [];
    let query = "UPDATE schedule SET";
  
    if (req.body.date) {
        const startDate = new Date(req.body.date);
        const formattedStartDate = startDate.toISOString().slice(0, 10);
        query += " startDate=?,";
        values.push(formattedStartDate);
    }
        if (req.body.enddate) {
          const endDate = new Date(req.body.enddate);
          const formattedEndDate = endDate.toISOString().slice(0, 10);
          query += " endDate=?,";
          values.push(formattedEndDate);
        }
  
    if (req.body.startTime) {
      query += " start=?,";
      values.push(req.body.startTime);
    }
  
    if (req.body.endTime) {
      query += " end=?,";
      values.push(req.body.endTime);
    }
  
    // Remove trailing comma and add WHERE clause
    query = query.slice(0, -1) + " WHERE scheduleID=?";
    values.push(id);
  
    connection.query(query, values, (err, result) => {
      if (err) {
        return res.json({ Error: err });
      } 
      res.json({ status: "success" , "message": "successfuly updated !"});
    });
  };
  