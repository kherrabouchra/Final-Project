


const connection = require('../db.js');

/* const postJob = async (req, res) => {
const { recruiter, challenge, title, skills, company, country, city, address, description, onSite, additional_info, terms, duration, experience, salary } = req.body;
console.log(req.body);
if (!recruiter || !challenge || !title || !skills || !company || !country || !city || !address || !description || !onSite || !additional_info || !terms || !duration || !experience || !salary) {

    return res.status(400).json({ "message": "Empty fields" });
  } 
  if(err) return res.status(500).json({ "message": err })
 const values = [recruiter, challenge, title, skills, company, country, city, address, description, onSite, additional_info, terms, duration, experience, salary];
console.log(values),
// insert new job offer into the database
connection.execute ('INSERT INTO job_offer (recruiter, challenge, title, skills, company, country, city, address, description,onSite, additional_info, terms, duration, experience, salary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values);

console.log('Job is added to database:', values);
res.sendStatus(201);
    
if (err) {
        console.error("Error adding job offer to database: ", err);
        res.status(500).send("Error adding job offer to database");
        return;
    }
}  */
/* // 222222222222222222222222222222
 const postJob = (req, res) => {
     const stmt = 'INSERT INTO job_offer (recruiter, challenge, title, skills, company, country, city, address, description, onSite, additional_info, terms, duration, experience, salary) VALUES ?'

     const jobData = req.body;

     connection.query(stmt, jobData, (err, data) => {
         if(err) return res.status(500).json({ status: err });

         res.status(201).json({ "message": "Job created successfully" });
         console.log(jobData)
     })
 } */

 const postJob = (req, res) => {
    const stmt =
      'INSERT INTO job_offer set ? ';
  console.log(req.body);
    const jobData = req.body;
    console.log(jobData);
  
    connection.query(stmt,[jobData], (err, data) => {
      if (err) 
       return res.json({ status: err });
  
      res.json({ status:'success', message: 'Job created successfully' });
    });
  };

  const postJobChallenge = (req, res) => {
    const stmt =
      'INSERT INTO challenge_submission set ? ';
 
    const jobData = req.body;
  
  
    connection.query(stmt,[jobData], (err, data) => {
      if (err) 
       return res.json({ status: err });
  
      res.json({ status:'success', message: 'Job challenge submitted successfully' });
    });
  };

  const getJobById= (req, res) => {
    const stmt =
      'select * from job_offer where jobOfferID= ? ';
  
    const jobData = req.params.id;
 
  
    connection.query(stmt,[jobData], (err, data) => {
      if (err) 
       return res.json({ status: err });
  
      res.json({ status:'success', message: 'Job created successfully' , data:data[0]});
    });
  };


  const getJobChallenges= (req, res) => {
    const stmt =
      'select * from challenge_content where challenge=(select challenge from job_offer where jobOfferID=?) ';
  
    const jobData = req.params.id;
 
  
    connection.query(stmt,[jobData], (err, data) => {
      if (err) 
       return res.json({ status: err });
  
      res.json({ status:'success', message: 'Job fetched successfully' , data:data});
    });
  };

const getParticipants = (req, res) => {
  const stmt =
    'select  * from challenge_submissions where challenge= ? ';
 
  const jobData = req.body;
 

  connection.query(stmt,[jobData], (err, data) => {
    if (err) 
     return res.json({ status: err });

    res.json({ status:'success', message: '  successfully', data:data });
  });
};

const getAllJobs= (req, res) => {
  const stmt =
    'select * from job_offer ';
 
  const jobData = req.params.id;
 

  connection.query(stmt,[jobData], (err, data) => {
    if (err) 
     return res.json({ status: err });

    res.json({ status:'success', message: 'Job  successfully' , data:data});
  });
};

const getAllJobsbyid= (req, res) => {
  const stmt =
    'select * from job_offer where recruiter= ? ';
 
  const jobData = req.params.id;
 

  connection.query(stmt,[jobData], (err, data) => {
    if (err) 
     return res.json({ status: err });

    res.json({ status:'success', message: 'Job  successfully' , data:data});
  });
};


module.exports = { postJob ,postJobChallenge, getAllJobs, getAllJobsbyid,getJobById,getJobChallenges};