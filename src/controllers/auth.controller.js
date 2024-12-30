// import User from "../models/user.model.js";
import {generateToken_in_cookie } from "../lib/utils.js";
import bcrypt  from "bcrypt";
import cloudinary from "../lib/cloudinary.js";
import { auth, provider } from "../../../client/src/firebaseConfig.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";


export const signup = async (req, res) => {




  const {displayName, email, photoURL,
    profession} = req.body;

  try {

    // if(!fullName || !email || !password || !profession){
    //   return res.status(400).json({message:"All fields are required"})
    // }

    // if(password.length < 6 ){
    //   return res.status(400).json({message: "Password must be at least 6 characters"});
    // }

    const user_exist = await User.findOne({email})
    if(user_exist) return res.status(400).json({message:"Email already exists"});




 
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: displayName, 
      email,
      profilePic: photoURL,
      username: user_exist._id,
      profession,
      // password: hashedPassword
    })

    if(newUser){
      // generateToken_in_cookie(newUser._id, res)
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email:newUser.email,
        profilePic: newUser.profilePic,
        username:newUser.username
        // profession:newUser.profession,
        // username:newUser._id
      })
    }else{
      res.status(400).json({message: "Invalid user data"});
    }
    
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message:"Internal Server Error " + error.message });
    
  }
};



export const checkUserExist = async (req, res) => {
  const { email } = req.body;
  try {
    const user_exist = await User.findOne({ email });
    if (user_exist) {
      if(!user_exist.profession){
        return res.status(200).json({ completeProfile:false, exists: true, user: user_exist });
      }
      return res.status(200).json({ exists: true, user: user_exist });
    }else{
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.log("Error in checkUserExist controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// import User from '../models/User.js'; // Adjust import according to your project structure





export const createuser = async (req, res) => {
  const {
    email,
    fullName,
    profession,
    profilePic,
    username,
    skills,
    category,
    country,
    completeProfile,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Update existing user
      const updatedUser = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            fullName,
            profilePic,
            username,
            profession,
            country,
            skills,
            category,
            completeProfile,
          },
        },
        { new: true, upsert: false } // Return updated document; no need for upsert here
      );
      console.log("Updated user:", updatedUser);
      return res.status(200).json(updatedUser);
    } else {
      // Create a new user
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        fullName,
        profilePic,
        username,
        profession,
        country,
        skills,
        category,
        completeProfile,
      });

      await newUser.save();
      console.log("New user created:", newUser);
      return res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error in createuser controller:", error);
    res.status(500).json({ message: "Internal Server Error: " + error.message });
  }
};




export const firebase_signup = async (req, res) => {
  try {
    // Destructure user data from the verified token

    const getData = await req.currentUser;

    console.log("getData", getData);
    
    const {  displayName, email, photoURL } = req; // Fixed `req.users` to `req.user`

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    // If the user does not exist, create a new one
    if (!user) {
        user = new User({ fullName: displayName, email, profilePic: photoURL });
        await user.save();
    }

    // Send the user data in the response
    res.send(user);
} catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
}
}



















export const login = async (req, res) => {
  const { email } = req.body;
  try {

    const user_exist = await User.findOne({ email });


    // if (!user_exist) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // const isPasswordCorrect = await bcrypt.compare(
    //   password,
    //   user_exist.password
    // );
    // if (!isPasswordCorrect) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // signInWithPopup(auth, provider);

    // generateToken_in_cookie(user_exist._id, res);

    // res.status(200).json({
    //   _id: user_exist._id,
    //   fullName: user_exist.fullName,
    //   email: user_exist.email,
    //   profilePic: user_exist.profilePic,
    // });

    console.log("lgoin user_exist", user_exist);
    
    res.status(200).json(user_exist);


  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};







export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({message:"Logged out successfully!"});
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
  }
};


export const updateProfile = async (req, res)=>{
  try {
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required"});
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile", error);
  }
}


export const updateName = async (req, res)=>{
  try {
    const {fullName} = req.body;
    const userId = req.user._id;

    if(!fullName){
      return res.status(400).json({message:"Name is required"});
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {fullName}, {new:true})
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile", error);
  }
}


export const updateProfession = async (req, res)=>{
  try {
    const {profession} = req.body;
    const userId = req.user._id;

    if(!profession){
      return res.status(400).json({message:"Profession is required"});
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {profession}, {new:true})
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile", error);
  }
}


export const updateUsername = async (req, res)=>{
  try {
    const {username} = req.body;
    const userId = req.user._id;

    if(!username){
      return res.status(400).json({message:"username is required"});
    }

    const username_exist = await User.findOne({username})
    if(username_exist) return res.status(400).json({message:"This username already taken"});



    const updatedUser = await User.findByIdAndUpdate(userId, {username}, {new:true})
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile", error);
  }
}



export const updateCountry = async (req, res)=>{
  try {
    const {country} = req.body;
    const userId = req.user._id;

    if(!country){
      return res.status(400).json({message:"country is required"});
    }

    // const country_exist = await User.findOne({country})
    // if(username_exist) return res.status(400).json({message:"This username already taken"});



    const updatedUser = await User.findByIdAndUpdate(userId, {country}, {new:true})
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile", error);
  }
}



export const checkAuth = async (req, res)=>{
  // try {
  //   res.status(200).json(req.user);
  // } catch (error) {
  //     console.log("Error in checkAuth controller", error.message);
  //     res.status(500).json({message:"Internal Server Error"});
      
  // }
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// router.post('/check-user', async (req, res) => {
