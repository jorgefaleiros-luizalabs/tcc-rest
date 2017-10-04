var express = require('express');
var router = express.Router();
var connection = require('../database/connection');
var moment = require('moment-timezone');
/* GET users listing. */
router.get('/', (req, res, next) => {

  connection.connection.query('select * from tcc.tb_reports;', (err, rows, fields) => {
    var bodyResponse = [];
    for (var row in rows) {
      if (rows.hasOwnProperty(row)) {
        bodyResponse.push(rows[row]);
      }
    }
    res.send(bodyResponse);
  });
});

router.get('/:id', (req, res, next) => {

  connection.connection.query('select * from tcc.tb_reports where id =' + req.params.id + ';', (err, rows, fields) => {
    var bodyResponse = [];
    for (var row in rows) {
      if (rows.hasOwnProperty(row)) {
        bodyResponse.push(rows[row]);
      }
    }
    res.send(bodyResponse);
  });
});

router.post('/', (req, res, next) => {
  let startDate = moment(req.body.startDate).format('YYYY-MM-DD');
  let endDate = moment(req.body.endDate).format('YYYY-MM-DD');
  let query = "insert into tcc.tb_reports values ("+req.body.age+","+ req.body.medic +","+ req.body.nausea +","+ req.body.dizziness +","+ req.body.skinMark +","+ req.body.diagnostic +","+ req.body.disease +","+ startDate +","+ endDate +","+ req.body.latitude +","+ req.body.longitude +");";
  connection.connection.query(query, (err, results) => {
    console.log(query);
  });
});
module.exports = router;
