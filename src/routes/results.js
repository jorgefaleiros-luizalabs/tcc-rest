var express = require('express');
var router = express.Router();
var controller = require('../controller/results');

/* GET users listing. */
router.get('/:reportId', function (req, res, next) {
    controller.analisys(req.params.reportId)
    .then((response) => {
        res.json(response);
    })
    .catch((err) => res.error(err));
});

module.exports = router;
