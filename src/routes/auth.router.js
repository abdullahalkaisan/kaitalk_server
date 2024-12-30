import express from "express";


// Remember: it’s important to add the extension in logical files 
import {checkAuth, checkUserExist, createuser, firebase_signup, login, logout, signup, updateCountry, updateName, updateProfession, updateProfile, updateUsername} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";
import { verifyToken } from "../lib/utils.js";

const router = express.Router();
// express.Router() creates a modular, mini router object in Express.js.

export default router;


// router.get("/signup", signup);
// router.get("/login", login);
// router.get("/logout", logout);


router.post("/signup", signup);







router.post("/logout", logout);

router.post("/checkUserExist", checkUserExist);



// router.post("/signupfirebase", verifyToken, firebase_signup);
router.post("/signupfirebase", firebase_signup);


// router.put("/update-profile", protectRoute, updateProfile);
// router.put("/update-name", protectRoute, updateName);

// router.put("/update-profession", protectRoute, updateProfession);
// router.put("/update-username", protectRoute, updateUsername);
// router.put("/update-country", protectRoute, updateCountry);



// router.get('/check', protectRoute, checkAuth);




router.put("/update-profile",  updateProfile);
router.put("/update-name", updateName);

router.put("/update-profession",updateProfession);
router.put("/update-username",  updateUsername);
router.put("/update-country",  updateCountry);



// router.post("/getlogindata",  createuser);




router.put("/createuser",  createuser);
router.post("/login", login);




router.get('/check', checkAuth);