var router = global.router;
let bill = require('../models/Bill');
var mongoose = require("mongoose")
let fs = require('fs');

module.exports.insertBill = function (req, res, next) {
    const newBill = new bill({
        username: req.body.username,
        address: req.body.address,
        phone: req.body.phone

    });
    newBill.save(function (err, bill) {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                messege: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: "successful",
                data: {
                    username: req.body.username,
                    info: req.body.info,
                    address: req.body.address,
                    phone: req.body.phone
                },
                message: "Insert bill success"
            });
        };
    })
};

module.exports.listBill = function (req, res, next) {  //xuat tat ca ds san pham
    bill.find({}).sort({ name: 1 }).select({
        username: 1,
        info: 1,
        address: 1,
        phone: 1,
        Create_date: 1,
        status: 1,

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
                result: "successful",
                count: pro.length,
                data: pro,
                message: "Query list of bill success"
            });
        };
    })
};


// xuat theo id
module.exports.getBillId = function (req, res, next) {
    const { id = '' } = req.params;

    bill.findById(id,
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
                    result: "successful",
                    data: pro,
                    message: "Query Id bill success"
                });
            };
        })
};

module.exports.updateBill=function(req,res,next){
    let conditions = {}; // la 1 object
    if(mongoose.Types.ObjectId.isValid(req.body.id)==true){  //xac thuc thuoc tinh cua Oj
        conditions._id = mongoose.Types.ObjectId(req.body.id);
    } else res.json({
        result: "failed",
        data: {},
        messege: "Id khong dung"
    });

    let gtUdt = {};
    if (req.body.username && req.body.username.length > 2) {
        gtUdt.name = req.body.name;
        //gtUdt = req.body;
    }
    if (req.body.info && req.body.info.length > 2){
        gtUdt.info = req.body.info;
        //gtUdt = req.body;
    }
    if(req.body.phone && req.body.phone.length > 2){
        gtUdt.phone = req.body.phone;
        //gtUdt = req.body;
    }
    if(req.body.address && req.body.address.length > 2){
        gtUdt.address = req.body.address;
        //gtUdt = req.body;
    }
    
    const options = {
        new: true,   // tra ve du lieu da chuyen doi thay vi ban goc
        multi: true
    };
};

module.exports.deleteBill=(req, res, next)=>{
    bill.findOneAndDelete({_id: mongoose.Types.ObjectId(req.body.id)},(err,bill)=>{
        if(err){
            res.json({
                result: "failed",
                messege:`khong the xoa . loi ${err}`
            });
            return;
        }
        if(!bill){
            res.json({
                result: "failed",
                messege:"bill khong ton tai"
            })
        }
        else {
            res.json({
                result: "ok",
                messege:"xoa thanh cong"
            })
        }
    }
    )
};
