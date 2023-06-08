const connection = require('../connectDB.js');

const postInterview = async (req, res) => {
  const { title, jobRole, date, hour, duration, additionalInfo, developerID } = req.body;
  // Check that all required fields are present
  if (!title || !jobRole || !date || !hour || !duration || !developerID) {
    return res.status(400).json({ error: req.body });
  }

  const values = [title, jobRole, date, hour, duration, additionalInfo, developerID];


    // const result = connection.execute('INSERT INTO interviews ( title, jobRole, date, hour, duration, additionalInfo, developerID) VALUES ( ?, ?, ?, ?, ?, ?, ?)', values);
    connection.execute('INSERT INTO interviews ( title, jobRole, date, hour, duration, additionalInfo, developerID) VALUES ( ?, ?, ?, ?, ?, ?, ?)', values, (error, result) => {
      const interview = { id: result.insertId, title, jobRole, date, hour, duration, additionalInfo, developerID };
      console.log('Interview added to database:', interview);
      res.sendStatus(201);
      
      if (error) {
        console.error('Error creating interview:', error);
        res.status(500).json({ error: 'Internal server error' });

      }
    });

    // connection.release();




 
};


const getDev = (req, res) => {
  connection.query(
    'SELECT userID , username  FROM user WHERE userType= "developer"',
    function (err, data, fields) {
      if (err)
        return (res.json({ Error: "Not found" }));
      res.status(200).json({
        status: "success",
        users: data,
      });
    }
  );
}

module.exports = { postInterview, getDev };
