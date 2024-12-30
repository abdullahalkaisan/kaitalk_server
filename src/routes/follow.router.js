import express from "express";
import { followUser, getMyFollowers, getMyFollowing, getMyFriends } from "../controllers/follow.controller.js";
import User from "../models/user.model.js";
const router = express.Router();



router.post('/follow', async (req, res) => {
    const { currentUserId, targetUserId } = req.body;

    // console.log(currentUserId, targetUserId)
  
    try {
      await followUser(currentUserId, targetUserId);

      res.status(200).json({ message: 'Follow successful' });


    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });




  router.get('/:currentUserId/:targetUserId', async (req, res) => {
    const { currentUserId, targetUserId } = req.params;

    console.log(currentUserId, targetUserId)
  
    try {
      const currentUser = await User.findById(currentUserId);
      const isFollowing = currentUser.following.includes(targetUserId);
      const isFriend = currentUser.friends.includes(targetUserId);
  
      res.status(200).json({ isFollowing, isFriend });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  





  const unfollowUser = async (currentUserId, targetUserId) => {
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);
  
    // Remove from followers and following
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUserId.toString()
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId.toString()
    );
  
    // Remove from friends
    currentUser.friends = currentUser.friends.filter(
      (id) => id.toString() !== targetUserId.toString()
    );
    targetUser.friends = targetUser.friends.filter(
      (id) => id.toString() !== currentUserId.toString()
    );
  
    // Save changes
    await currentUser.save();
    await targetUser.save();
  };
  


  router.post('/unfollow', async (req, res) => {
    const { currentUserId, targetUserId } = req.body;
  
    try {
      await unfollowUser(currentUserId, targetUserId);
      res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  



  router.post('/get-following', getMyFollowing)
  router.post('/get-friends', getMyFriends)
  router.post('/get-followers', getMyFollowers)
  


export default router;
