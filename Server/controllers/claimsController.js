const connection = require('../db.js');
const dayjs = require('dayjs')




exports.getClaims = (req, res) => {
    const stmt = 'SELECT * FROM claim, user where user = userID ';
    connection.query(stmt, (err, data) => {
        if (err) return res.json({ Error: err });
        res.json({ status: "success", data: data});
        console.log(data);
    });
};
exports.getClaimById= (req, res) => {
    const stmt = 'SELECT * FROM claim, user  where claimID =?  and user = userID  ';

    const id = req.params.id;

    connection.query(stmt, id, (err, data) => {
        if (err) return res.json({ Error: err });

        if (data.length === 0) 
        return res.json({ message: `claim ${id} not found`});

        res.json({status:"success" , data : data[0]});
        console.log(data[0]);
    })
}

exports.getUserClaims= (req, res) => {
    const st = 'SELECT * FROM claim where  user=?';

    const id = req.params.id;

    connection.query(st, id, (err, data) => {
        if (err) return res.json({ Error: err });

        if (data.length === 0) 
        return res.json({ message: `user claims not found`});

        res.json({status:"success" , data : data});
        console.log(data);
    })
}

exports.deleteClaim = (req, res) => {
    const stmt = 'DELETE FROM claim WHERE claimID = ?';

    const id = req.params.id;

    if (!id) return res.json({ message: `Error: Claim ${id} not found`});
    
    connection.query(stmt, [id], (err, data) => {
        if (err) return res.json({ Error: err });

        res.json({status:"success",  message: `Claim ${id} deleted successfully`});
    })
}

exports.denyClaim = (req, res) => {
    const stmt = 'update claim set state="Denied"  WHERE claimID = ?';

    const id = req.params.id;

    if (!id) return res.json({ message: `Error: Claim ${id} not found`});
    
    connection.query(stmt, [id], (err, data) => {
        if (err) return res.json({ Error: err });

        res.json({status:"success",  message: `Claim ${id} denied successfully`});
    })
}


exports.createClaimReply= (req, res) => {
    const stmt = 'INSERT INTO claimResponse SET ?';
     
    const values ={
        claim: req.params.id,
        content: req.body.reply,
        responseDate: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')}; 
    
    connection.query(stmt, [values], (err, data) => {
        if (err) return res.json({ Error: err });

        res.json({status: "success",  message: "Reply successfully sent ! " });
        
    })
}

exports.createClaim =(req, res) => {
    const stmt = 'INSERT INTO claim SET ?';
      console.log(req.body);
    connection.query(stmt, [req.body], (err, data) => {
        if (err) return res.json({ Error: err });

        res.json({status: "success",  message: "Claim successfully sent ! " });
        
    })
}