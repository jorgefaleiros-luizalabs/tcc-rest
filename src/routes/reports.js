var express = require('express');
var router = express.Router();
var connection = require('../database/connection');
var moment = require('moment-timezone');
var controller = require('../controller/reports');
moment.tz.setDefault('America/Sao_Paulo');
/* GET users listing. */
const DateFormat = 'YYYY-MM-DD HH:mm:ss'; 

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

router.get('/position', (req, res, next) => {
  connection.connection.query('select latitude, longitude from tcc.tb_reports where created_at between \'' + moment().add(-7, 'days').format(DateFormat) + '\' and \'' + moment().format(DateFormat) +'\';', (err, rows, fields) => {
    var bodyResponse = [];

    if (err) throw err;

    if (rows.length === 0){
      res.status(404);
    }
    for (var row in rows) {
      if (rows.hasOwnProperty(row)) {
        bodyResponse.push(rows[row]);
      }
    }
    res.send(bodyResponse);
  });
})

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
