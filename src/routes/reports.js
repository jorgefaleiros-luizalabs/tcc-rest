var express = require('express');
var router = express.Router();
var connection = require('../database/connection');
var moment = require('moment-timezone');
var controller = require('../controller/reports');
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
  controller.create(req.body)
  .then((result)=>{
    res.status(201).json(result);
  })
  .catch((err) => {
    res.send(err)
  });
});
module.exports = router;
