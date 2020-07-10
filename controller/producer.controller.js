var router = global.router;
let product = require('../models/Product');
var mongoose = require("mongoose");
let producer = require('../models/Producer');
let fs = require('fs');

exports.getProducerId = function (req, res, next) {
    const { id = '' } = req.params;
    producer.findById(id,
        (err, pro) => {
            if (err) {
                res.json({
                    result: "failed",
                    data: [],
                    message: `Err is ${err}`
                });
            }
            else {
                res.json({
                    result: "Sucessful",
                    data: pro,
                    message: ""
                });
            };
        })
};
exports.getProducerName = function (req, res, next) {
    producer.find({ name: req.params.name }).exec(function (err, pro) {
        if (err) {
            res.json({
                result: "failed",
                data: [],
                message: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: "Sucessful",
                data: pro,
                message: ""
            });
        };
    })
};
exports.insertProducer = function (req, res, next) {
    const newProducer = new producer({
        name: req.body.name,
        image_prod: req.body.image_prod
    });
    newProducer.save(function (err, producer) {
        if (err) {
            res.json({
                result: "Failed",
                data: {},
                message: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: "Successful",
                data: {
                    name: req.body.name,
                    image_prod: req.body.image_prod
                },
                message:"Insert producer successful"
            });
        };
    })
};

exports.deleteProducer=function(req,res,next){
    producer.findOneAndDelete({_id:mongoose.Types.ObjectId(req.body.id)},(err,name)=>{
        if(err)
        {
            res.json({
                result:"failed",
                message:`Loi khong the xoa ${err}`
            });
            return;
        }
        if(!name){
            res.json({
                result:"failed",
                message:"Producer khong ton tai"
            })
        }
        else{
            res.json({
                result:"OK",
                message:"Xoa producer thanh cong"
            })
        }
    })
};
exports.listProducer = function (req, res, next) {
    producer.find({}).sort({ name: 1 }).select({
        name: 1,
        image_prod: 1
    }).exec(function (err, pro) {
        if (err) {
            res.json({
                result: "failed",
                data: [],
                message: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: "Sucessful",
                data: pro,
                count: pro.length,
                message: ""
            });
        };
    })
};