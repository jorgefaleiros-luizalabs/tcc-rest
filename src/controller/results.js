var moment = require('moment-timezone');
var connection = require('../database/connection');

function getReportAndParams(reportId) {
    return new Promise((resolve, reject) => {
        let query = 'select * from tb_symptoms_parameter;'
        connection.connection.query(query, (err, rows, fields) => {
            if(err){
                reject(err);
            }
            var bodyParams = [];
            for (var row in rows) {
              if (rows.hasOwnProperty(row)) {
                bodyParams.push(rows[row]);
              }
            }
            connection.connection.query('select * from tcc.tb_reports where id =' + reportId + ';', (err, rows, fields) => {
                if(err){
                    reject(err);
                }
                var bodyReport = [];
                for (var row in rows) {
                  if (rows.hasOwnProperty(row)) {
                    bodyReport.push(rows[row]);
                  }
                }
                var body = {
                    parameters: bodyParams,
                    report: bodyReport
                }
                resolve(body);
            });
        });
    });
}

function reportDiagnostic(payload){
    var tools = payload;
}
exports.analisys = function(_reportId) {
    var payload = getReportAndParams(_reportId).then((result) => {
        return result.json();
    })
    .then((resultJSON) => {
        var diagnostic = reportDiagnostic(resultJSON);
    })
}