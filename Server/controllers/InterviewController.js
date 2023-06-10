const connection = require('../db.js');

const postInterview = async (req, res) => {
  const { title, jobOffer, date, hour, duration, additionalInfo, developerID , link} = req.body;
  // Check that all required fields are present
  if (!title || !jobOffer || !date || !hour || !duration || !developerID || !link) {
    return res.json({ error: req.body });
  }

  const values = [title, jobOffer, date, hour, duration, additionalInfo,  link,developerID];


    // const result = connection.execute('INSERT INTO interviews ( title, jobOffer, date, hour, duration, additionalInfo, developerID) VALUES ( ?, ?, ?, ?, ?, ?, ?)', values);
    connection.execute('INSERT INTO interviews ( title, jobOffer, date, hour, duration, additionalInfo, link,developerID) VALUES ( ?, ?, ?, ?, ?, ?,?, ?)', values, (error, result) => {
      
      
      if (error) {
        console.error('Error creating interview:', error);
        res.json({ error: error });

      }
      console.log('Interview added to database:', req.body);
      res.json({status:"success" })
    });



 
};
const getInterviews= (req, res) => {
stmt= 'SELECT  * FROM interviews WHERE jobOffer in(select jobOfferID from job_offer where recruiter=?)';
    
 
    connection.query(stmt,[req.params.id], (err, data) => {
      if (err) 
       return res.json({ status: err });
  
      res.json({ status:'success',  data:data});
    })
  
}
    

const getInterviewLink =(req, res) => {
  stmt= 'SELECT  * FROM interviews WHERE id =?';
      
   
      connection.query(stmt,[req.params.id], (err, data) => {
        if (err) 
         return res.json({ status: err });
    
        res.json({ status:'success',  data:data[0]});
      })
    
  }

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

module.exports = { postInterview,getInterviews, getDev , getInterviewLink};
