import jwt from "jsonwebtoken";

export const generateToken_in_cookie =(userId, res)=>{

    const payload = {userId}; 
    const secretKey = process.env.JWT_SECRET; 
    const options = { expiresIn: '7d' };

    const token = jwt.sign(payload, secretKey, options);

    const cookieOptions = {
        maxAge: 7*24*60*60*100, // ms
        httpOnly:true, // prevent XSS attacks cross-site scripting attacks 
        sameSite:"Strict", //CSRF attacks cross-site request forgery attacks 
        secure: process.env.NODE_ENV !== "development"
    }


    res.cookie("jwt", token, cookieOptions);

    return token
}



async function verifyToken(req, res, next) {


    const idToken = req.headers.Authorization; // Fix the spelling of 'authorization'
    
    // Check if the token is provided
    if (!idToken) {
        return res.status(401).send("Unauthorized");
    }

        // return res.send(req);



    try {
        // Verify the token with Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(idToken); // Fixed 'decordedToken' typo
        req.user = decodedToken; // Corrected `res.user` to `req.user`
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
}

export { verifyToken }; // Export the `verifyToken` function

