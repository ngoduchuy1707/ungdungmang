var router = global.router;
let bill = require("../models/Bill");
var mongoose = require("mongoose");
let fs = require("fs");
const {isAuth} = require('../controller/authencation.controller');
/* GET users listing. */

var controller = require("../controller/bill.controller");

router.post("/insert_bill", controller.insertBill);

router.get("/list_bill", controller.listBill);

// xuat san pham theo id
router.get("/get_bill_id/:id", controller.getBillId);


router.put("/update_bill", controller.updateBill);

router.delete("/delete_bill", controller.deleteBill);

module.exports = router;