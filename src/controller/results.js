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
    var parameters = payload.parameters[0];
    var report = payload.report[0]
    var rawPoints = 0;
    let maxPoints = 0;
    let symptomBonus = 0.30;
    if (report.age <= 15){
        for( var key in report) {
            if (key !== 'id' && key !== 'age'){
                let additional = 0;
                if (report[key] === 1 && key === 'vomit') {
                    additional = parameters[key] + (parameters[key] * symptomBonus);    
                    rawPoints = rawPoints + additional;
                } else if (report[key] === 1) {
                    rawPoints = rawPoints + parameters[key]
                }
            }   
        }
    }
    if (report.age > 15){
        for (var key in report) {
            if (key !== 'id' && key !== 'age') {
                let additional = 0;
                if(report[key] === 1 && (key === 'musclePain' || key === 'eyePain' || key === 'nausea' || key === 'jointPain')){
                    additional =  parameters[key] + (parameters[key] * symptomBonus);
                    rawPoints = rawPoints + additional;
                } else if (report[key] === 1){
                    rawPoints = rawPoints + parameters[key];
                }
            }
        }
    }
    for( var key in parameters) {
        if (key !== 'id' && key !== 'created_at' && key !== 'gender'){
            maxPoints = maxPoints + parameters[key]
        }
    }
    let resultPercentage = rawPoints / maxPoints;
    return resultPercentage;
}
exports.analisys = function(_reportId) {
    return new Promise((resolve, reject) => {
        var payload = getReportAndParams(_reportId)
        .then((result) => {
            var diagnostic = reportDiagnostic(result);
            let body = {
                result: diagnostic
            };
            resolve(body);
        })
        .catch((err) => {
            reject(err);
        });
    });
}