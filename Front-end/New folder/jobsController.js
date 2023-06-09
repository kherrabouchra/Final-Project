const connection = require("../db");

getJobs = (req, res) => {
    const stmt = 'SELECT * FROM job_offer ';

    connection.query(stmt, (err, data) => {
        if (err) return res.json({ status: err });

        res.json({data: data ,status:'success'});
   
    })
}
    const getJobsByID = (req, res) => {
        const jobId = req.params.id;
      
        // Fetch the job details from the database
        const query = `SELECT * FROM job_offer WHERE jobOfferID = ?`;
      
        connection.query(query, [jobId], (error, results) => {
          if (error) {
            console.error('Error fetching job details:', error);
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
          }
      
          if (results.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
          }
      
          const jobDetails = results[0];
          return res.status(200).json({ status: 'success', data: jobDetails });
        });
      };
module.exports = { getJobs ,getJobsByID}