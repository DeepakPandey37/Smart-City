const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getDataUri = require("../Utils/datauri");
const cloudinary = require("../Utils/cloudinary");

exports.register= async(req,res)=>{
    try{
      const {fullname , email , phonenumber, password , role, profilePhoto} = req.body;
      if(!fullname || !email || !phonenumber || !password || !role){
        return res.status(400).json({
            message:" All fields are required",
            success:false,
        });
      }
   const file = req.file;
    const fileuri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
      const user = await User.findOne({email});
      if(user){
         return res.status(400).json({
            message:" User Already Exists",
            success:false,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        fullname,
        password :hashedPassword,
        email,
        phonenumber,
        role,
        profile:{
                profilePhoto:cloudResponse.secure_url,
            }
      });

      return res.status(201).json({
        message:"Account created Sucessfully",
        success:true,
      });


    }catch(error){
        console.log(error);
    }
}
exports.login = async(req,res)=>{
try{

     const { email , password , role} = req.body;
      if( !email ||  !password || !role){
        return res.status(400).json({
            message:" All fields are required",
            success:false,
        });
      }
       
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({
             message:"Incorrect email or password",
            success: false,
        })
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if(!isPasswordMatched){
         return res.status(400).json({
             message:"Incorrect password",
            success: false,
        })
      }

      if(role != user.role){
        return res.status(400).json({
            message:"Incorrect account type",
            success: false,
     })};

     const tokenData={
        userId : user._id,
     };
  const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
  _id: user._id,
  fullname: user.fullname,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  profile: {
    profilePhoto: user.profile?.profilePhoto || "",
  
    bio: user.profile?.bio || "",
    
  },
};
 return res.status(201).cookie("token" , token, {maxAge: 1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
    message:"Welcome Back",
    user,
    success:true,

 })

 
}catch(error){
    console.log(error);
}
}

exports.logout = async (req,res)=>{
    try{
    return res.status(200).cookie("token", "" , {maxAge:0}).json({
        message:"logged out successfully",
        success:true,
    });
    }catch(error){
      console.log(error);
      return res.status(400).json({
        message: "Error in logout.",
        success: false
    });
    }
}

exports.updateProfile = async (req,res)=>{
    try{
       
      const {fullname , email , phonenumber, bio } = req.body;
      const userId = req.id;
    let user = await User.findById(userId);
const profilePhotoFile = req.files?.profilePhoto?.[0];
    if (!user) {
      return res.status(400).json({ message: "User not found.", success: false });
    }
    let profilePhotoUrl;
    if (profilePhotoFile) {
      const fileUri = getDataUri(profilePhotoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    // Update fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (profilePhotoUrl) user.profile.profilePhoto = profilePhotoUrl;
    if(phonenumber) user.phonenumber = phonenumber;
    if(bio) user.profile.bio = bio;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error updating profile.",
      success: false
    });
    
}
}

