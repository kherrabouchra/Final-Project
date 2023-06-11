const connection = require("../db.js");

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
  const stmt = "INSERT INTO job_offer set ? ";

  const jobData = req.body;

  console.log(jobData);

  connection.query(stmt, [jobData], (err, data) => {
    if (err) return res.json({ status: err });

    res.json({ status: "success", message: "Job created successfully" });
  });
};

const postJobChallenge = (req, res) => {
  const stmt = "INSERT INTO challenge_submission set ? ";

  const jobData = req.body;

  connection.query(stmt, [jobData], (err, data) => {
    if (err) return res.json({ status: err });

    res.json({
      status: "success",
      message: "Job challenge submitted successfully",
    });
  });
};

const getJobById = (req, res) => {
  const stmt = "select * from job_offer where jobOfferID= ? ";

  const jobData = req.params.id;

  connection.query(stmt, [jobData], (err, data) => {
    if (err) return res.json({ status: err });

    res.json({
      status: "success",
      message: "Job created successfully",
      data: data[0],
    });
  });
};

const getJobChallenges = (req, res) => {
  const stmt =
    "select * from challenge_content where challenge=(select challenge from job_offer where jobOfferID=?) ";

  const jobData = req.params.id;

  connection.query(stmt, [jobData], (err, data) => {
    if (err) return res.json({ status: err });

    res.json({
      status: "success",
      message: "Job fetched successfully",
      data: data,
    });
  });
};

const getParticipants = (req, res) => {
  const stmt = "select  * from challenge_submissions where challenge= ? ";

  const jobData = req.body;

  connection.query(stmt, [jobData], (err, data) => {
    if (err) return res.json({ status: err });

    res.json({ status: "success", message: "  successfully", data: data });
  });
};

const getAllJobs = (req, res) => {
  const stmt = "select * from job_offer ";

  const jobData = req.params.id;

  connection.query(stmt, [jobData], (err, data) => {
    if (err) return res.json({ status: err });

    res.json({ status: "success", message: "Job  successfully", data: data });
  });
};

const getAllJobsbyid = (req, res) => {
  const stmt = "select * from job_offer where recruiter= ? ";

  const jobData = req.params.id;

  connection.query(stmt, [jobData], (err, data) => {
    if (err) return res.json({ status: err });

    res.json({ status: "success", message: "Job  successfully", data: data });
  });
};

const fetchJobOfferData = (req, res) => {
  const query =
    "SELECT MONTH(creationDate) AS month, COUNT(*) AS count FROM job_offer GROUP BY MONTH(creationDate)";

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const formattedData = results.map((result) => ({
        month: result.month,
        count: result.count,
      }));

      res.json(formattedData);
    }
  });
};

const getClaimData = (req, res) => {
  const query =
    "SELECT MONTH(creationDate) AS month, COUNT(*) AS count FROM claim GROUP BY MONTH(creationDate)";

  connection.query(query, (error, data) => {
    if (error) return res.status(500).json({ error: error });

    res.status(200).json(data);
  });
};
const getChallengeData = (req, res) => {
  const query =
    "SELECT MONTH(creationDate) AS month, COUNT(*) AS count FROM challenge GROUP BY MONTH(creationDate)";

  connection.query(query, (err, result) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json({ status: "success", data: result });
    console.log(result);
  });
};
const getUserBanner = (req, res) => {
  const query =
    "SELECT MONTH(banDate) AS month, COUNT(*) AS count FROM banned_user GROUP BY MONTH(banDate)";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Failed to retrieve user data" });
    } else {
      res.json(results);
    }
  });
};

const fetchCourseMounth = (req, res) => {
  const query = `
  SELECT MONTH(creationDate) AS month, COUNT(*) AS count
  FROM lessons
  GROUP BY MONTH(creationDate)
`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json(results);
  });
};

const getDev = (req, res) => {
  connection.query(
    "SELECT userID , username  FROM user ",
    function (err, data, fields) {
      if (err) return res.json({ Error: "Not found" });
      res.status(200).json({
        status: "success",
        users: data,
      });
    }
  );
};

const postAnalytics = async (req, res) => {
  const { userID, analyticType, activity } = req.body;

  // Check that all required fields are present
  if (!userID || !analyticType || !activity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const values = [userID, analyticType, activity];

  connection.execute(
    "INSERT INTO analytics (userID, analyticType, activity) VALUES (?, ?, ?)",
    values,
    (error, result) => {
      if (error) {
        console.error("Error creating analytics:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const analytics = {
          analyticID: result.insertId,
          userID,
          analyticType,
          activity,
        };
        console.log("Analytics added to database:", analytics);
        res.sendStatus(201);
      }
    }
  );
};

module.exports = {
  postJob,
  postJobChallenge,
  getAllJobs,
  getAllJobsbyid,
  getJobById,
  getJobChallenges,
  getDev,
  postAnalytics,
  fetchJobOfferData,
  getClaimData,
  getChallengeData,
  fetchCourseMounth,
  getUserBanner,
  getParticipants,
};
