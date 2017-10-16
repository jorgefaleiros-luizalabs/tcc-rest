var moment = require('moment-timezone');
var connection = require('../database/connection');

exports.create = function(body) {
    return new Promise((resolve, reject)=> {
        let startDate = moment(body.startDate).hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss');
        let created_at = moment().format('YYYY-MM-DD HH:mm:ss');
        let query = "insert into tcc.tb_reports(age, fever, gender, nausea, bitter_taste, ab_pain, headache, joint_pain, diarrhea, vomit, muscle_pain, itchiness, anorexia, eye_pain, skin_wound, weakness, start_date, latitude, longitude, created_at) values (" + 
            body.age + "," +
            body.fever + ",'" +
            body.gender +"'," +
            body.nausea + "," +
            body.bitterTaste + "," +
            body.abPain + "," +
            body.headache + "," +
            body.jointPain + "," +
            body.diarrhea + "," +
            body.vomit + "," +
            body.musclePain + "," +
            body.itchiness + "," +
            body.anorexia + "," +
            body.eyePain + "," +
            body.skinWound + "," +
            body.weakness + ",\'" +
            startDate + "\'," +
            body.latitude + "," +
            body.longitude + ",\'" +
            created_at + "\');";
        connection.connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            console.log(results)
            let body = {
                reportId: results.insertId
            };
            return resolve(body);
        });
    });
}
