const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET'],
  credentials: true
}));

app.use('/interview', require('./routes/Interview'));


app.listen(5000, () => {
  console.log("server is running on 5000");
});
