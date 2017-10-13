var moment = require('moment-timezone');
var connection = require('../database/connection');

exports.create = function(body) {
    return new Promise((resolve, reject)=> {
        let startDate = moment(req.body.startDate).hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss');
        let created_at = moment().format('YYYY-MM-DD HH:mm:ss');
        let query = "insert into tcc.tb_reports(age, fever, nausea, bitter_taste, ab_pain, headache, joint_pain, diarrhea, vomit, muscle_pain, itchiness, anorexia, eye_pain, skin_wound, weakness, start_date, latitude, longitude, created_at) values (" + req.body.age + "," +
            req.body.fever + "," +
            req.body.nausea + "," +
            req.body.bitterTaste + "," +
            req.body.abPain + "," +
            req.body.headache + "," +
            req.body.jointPain + "," +
            req.body.diarrhea + "," +
            req.body.vomit + "," +
            req.body.musclePain + "," +
            req.body.itchiness + "," +
            req.body.anorexia + "," +
            req.body.eyePain + "," +
            req.body.skinWound + "," +
            req.body.weakness + ",\'" +
            startDate + "\'," +
            req.body.latitude + "," +
            req.body.longitude + ",\'" +
            created_at + "\');";
        connection.connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            let body = {
                reportId: results.insertId
            };
            return resolve(body);
        });
    });
}
