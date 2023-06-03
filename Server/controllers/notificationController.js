const con = require('../db.js');
const dayjs = require('dayjs')
exports.getNotifications =  (req, res, next)  => {
    if (!req.params.id) {
        return ( res.json({Error:"Not found"}));
      }
    con.query('SELECT * FROM notifications, challenge where recipientID = ? and challengeID = content',[req.params.id], function (err, data, fields) { 
      if (err) res.json({Error:err});
     res.status(201).json({
       status: "success",
       length: data?.length,
       data: data,
       
     }); 
    console.log(data);
   });
   };
   
   exports.getNotificationsInst =  (req, res, next)  => {
    if (!req.params.id) {
        return ( res.json({Error:"Not found"}));
      }
    con.query('SELECT * FROM notifications where recipientID = ? ',[req.params.id], function (err, data, fields) { 
      if (err) res.json({Error:err});
     res.status(201).json({
       status: "success",
       length: data?.length,
       data: data,
       
     }); 
    console.log(data);
   });
   };
   exports.createNotification = (req, res, next) => {
    const q = 'INSERT INTO notifications SET ?';
    const values = {
      recipientID: req.body.recipientID,
      title: req.body.title,
      date_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      description: req.body.content,
    };
  
    con.query(q, values, function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while creating the notification.' });
      }
  
      return res.status(200).json({ status: 'success', message: 'Notification created successfully.' });
    });
  };
  