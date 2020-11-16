var express = require('express');
var router = express.Router();

var addressService=require("../src/service/addressService")

router.use('/addAdd', function(req, res) {
	console.log("---------------执行地址新增------------------");
	addressService.showBookLimit(req,res);
});

module.exports = router;
