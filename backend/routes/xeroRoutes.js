const express = require('express');
const { addData, getData, deleteData, updateDate, updateStatus } = require('../controllers/xeroControllers');

const router = express.Router();


router.post("/addData", addData);
router.get("/getData", getData);
router.delete("/deleteData/:id", deleteData);
router.put("/updateData/:id", updateDate)

router.put("/updateStatus/:id", updateStatus);


module.exports = router;