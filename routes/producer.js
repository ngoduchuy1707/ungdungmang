var router = global.router;
let producer = require("../models/Producer");
let product =require("../models/Product");
var mongoose = require("mongoose");
let fs = require("fs");
const {isAuth} = require('../controller/authencation.controller');

var controller = require("../controller/producer.controller");

router.get("/list_producer",controller.listProducer);

router.get("/get_producer/:id", controller.getProducerId);

router.get("/get_producer_name",controller.getProducerName);

router.post("/insert_producer",controller.insertProducer);

router.delete("/delete_producer",controller.deleteProducer);

module.exports=router;