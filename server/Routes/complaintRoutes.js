const express = require("express");
const router = express.Router();
const {registerComplain , getMyComplaints , getAllComplaints, updateStatus, getComplaintById , notifications , description, getall} = require("../Controllers/complaintController");
const isAuthenticated = require("../Middlewares/isAuthenticated");
const singleUpload = require("../Middlewares/multer");
const multiUpload = require("../Middlewares/multi");

router.route("/registerComplaint").post( singleUpload ,isAuthenticated,registerComplain);
router.route("/getComplaints").get(isAuthenticated,getMyComplaints);
router.route("/getAll").get(getAllComplaints );
router.route("/update-status/:id").post(isAuthenticated,updateStatus, );
router.route("/get/:id").get(isAuthenticated,getComplaintById);
router.route("/notifications").post(isAuthenticated, singleUpload,notifications);
router.route("/notifications").get(isAuthenticated, notifications);
router.route("/notifications/get").get(isAuthenticated, getall);
router.route("/description").get(isAuthenticated,description);

module.exports = router;

