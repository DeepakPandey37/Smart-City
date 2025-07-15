const Complaint = require("../models/Complaint");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Notifications = require("../models/Notifications");
const getDataUri = require("../Utils/datauri");
const cloudinary = require("../Utils/cloudinary");




exports.registerComplain = async (req, res) => {
  try {
    const { title, description, location, type } = req.body;

    if (!title || !description || !location || !type) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const userId = req.id;

    // Handle file upload (from 'file' field)
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Please upload a photo",
        success: false,
      });
    }

    // Convert buffer to data URI
    const fileUri = getDataUri(file);

    // Upload to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // Create complaint data
    const complaintData = {
      title,
      description,
      location,
      photo: cloudResponse.secure_url, // Save to 'photo' field in DB
      type,
      applicant: userId,
    };

    await Complaint.create(complaintData);

    return res.status(201).json({
      message: "Complaint registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in registerComplain:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};




exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ applicant: req.id }).sort({ createdAt: -1 });

    return res.status(200).json({ complaints, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching complaints", success: false });
  }
};

//Admin 

exports.getAllComplaints = async (req, res) => {
  try {
    const allcomplaints = await Complaint.find()
      .populate({
        path: "applicant", 
        select: "fullname email", 
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "All complaints fetched",
      allcomplaints,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in get all complaints",
      success: false
    });
  }
};
exports.getComplaintById = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const getComplaint = await Complaint.findById(complaintId);

    if (!getComplaint) {
      return res.status(400).json({
        message: "No complaint found with this ID",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Complaint fetched successfully",
       getComplaint, 
      success: true,
    });

  } catch (error) {
    console.error("Error fetching complaint:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the complaint",
      error: error.message,
      success: false,
    });
  }
};



exports.updateStatus = async(req,res)=>{
    try{
         const complaintId = req.params.id;
         const {status} = req.body;
         const complaint = await Complaint.findById(complaintId);
          if (!complaint) {
      return res.status(404).json({ message: "Complaint not found", success: false });
    }
         complaint.status = status;
         await complaint.save();

      return res.status(200).json({ message: "Complaint Status Updated", success: true });
   

    }catch(error){
          console.log(error);
    }
}
exports.notifications = async (req, res) => {
  try {
    const { noticeTitle, noticeDescription } = req.body;

    if (!noticeTitle || !noticeDescription) {
      return res.status(400).json({ message: "Enter all fields", success: false });
    }

    const data = {
      noticeTitle,
      noticeDescription,
    };

    await Notifications.create(data);

    return res.status(201).json({
      message: "Notice registered successfully",
      success: true,
    });

  } catch (error) {
    console.log("Error in notifications controller:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.description= async(req,res)=>{
  try{
    const {feedbackDescription} = req.body;
    if(!feedbackDescription){
      return res.status(404).json({ message: "Enter all Fields", success: false });

    } 
    let data = {
      feedbackDescription
    }
    await Complaint.create(data);
     return res.status(201).json({
         
    message:"Feedback registered successfully",
    success:true
         });

  }catch(error){
    console.log(error);
  }
}

exports.getall = async(req,res)=>{
   try {
    const all = await Notifications.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications: all });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notifications" });
  }
}

