var router = global.router;
let category = require('../models/category');
let product = require('../models/Product');
var mongoose = require("mongoose")

module.exports.insertCategory = function (req, res, next) {

    var key = {
        //name : new RegExp(req.query.name, "i")      
        // i la khong phan biet chu hoa hay thuong  // chon co ki tu trung
        name: new RegExp('^' + req.body.name.trim() + '$', "i")
        //chon dung ki tu 
    };
    category.find(key).limit(1).exec(function (err, pro) {
        if (err) {
            res.json({
                result: "failed",
                data: [],
                messege: `Err is ${err}`
            });
        }
        else {
            if (pro.length > 0) {

            }
            else {
                const newCategory = new category({
                    name: req.body.name,
                    des: req.body.des,
                })
                newCategory.save(function (err) {
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
                                name: req.body.name,
                                des: req.body.des,
                            },
                            messege: "Insert category success"
                        });
                    };
                })
            }
        };
    })
};


module.exports.deleteCategory = (req, res, next) => {
    category.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.body.category_id) }, (err) => {
        if (err) {
            res.json({
                result: "failed",
                messege: `loi , cannot delete. Error is : ${err}`
            });
            return;
        }
        product.findOneAndRemove({ categoryId: mongoose.Types.ObjectId(req.body.category_id) }, (err) => {
            if (err) {
                res.json({
                    result: "failed",
                    messege: `Cannot delete product with categoryId: ${req.body.category_id}. Error is : ${err}`
                });
                return;
            }
            res.json({
                result: "ok",
                messege: "Delete category and product  successful"
            });
        });
    });
};

module.exports.listCategory = function (req, res, next) {  //xuat tat ca ds 

    category.find({}).limit().sort({ name: 1 }).select({
        name: 1,
        des: 1,
        Create_date: 1,
    }).exec(function (err, pro) {
        if (err) {
            res.json({
                result: false,
                data: [],
                messege: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: true,
                data: pro,
                count: pro.length,
                messege: "Query list of category success"
            });
        };
    })
};

module.exports.updateCategory=function(req,res,next){
    let conditions = {}; // la 1 object
    if(mongoose.Types.ObjectId.isValid(req.body.id)==true){  //xac thuc thuoc tinh cua Oj
        conditions._id = mongoose.Types.ObjectId(req.body.id);
        console.log(conditions)
        let gtUdt = {};
        //update name
        if (req.body.name && req.body.name.length > 0) {
            gtUdt.name = req.body.name;
            //gtUdt = req.body;
        }
        //update des
        if (req.body.des && req.body.des.length > 0) {
            gtUdt.des = req.body.des;
            //gtUdt = req.body;
    }}
};