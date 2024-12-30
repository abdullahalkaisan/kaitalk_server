import User from "../models/user.model.js";


export const followUser = async (currentUserId, targetUserId) => {


  console.log(currentUserId);
  


    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    console.log(currentUser)
  
    if (!currentUser || !targetUser) {
      throw new Error('User not found');
    }

    if (currentUserId === targetUserId) {
      throw new Error('You cannot follow yourself');
    }
  
    // Add to following and followers
    if (!currentUser.following.includes(targetUserId)) {
      currentUser.following.push(targetUserId);
    }
    if (!targetUser.followers.includes(currentUserId)) {
      targetUser.followers.push(currentUserId);
    }
  
    // Check for mutual following
    if (targetUser.following.includes(currentUserId)) {
      // Add to friends list
      if (!currentUser.friends.includes(targetUserId)) {
        currentUser.friends.push(targetUserId);
      }
      if (!targetUser.friends.includes(currentUserId)) {
        targetUser.friends.push(currentUserId);
      }
  
      // Remove from followers/following
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId.toString()
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId.toString()
      );
    }
  
    // Save changes
    await currentUser.save();
    await targetUser.save();
  };
  



 export const getMyFollowing = async (req, res) => {
    const { following } = req.body; // Accept the `following` array from the request body
    try {
      const users = await User.find({ _id: { $in: following } }).select(
        'fullName profilePic profession username country'
      );
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  }



  export const getMyFriends = async (req, res) => {
    const { friends } = req.body; // Accept the `following` array from the request body
    try {
      const users = await User.find({ _id: { $in: friends } }).select(
        'fullName profilePic profession username country'
      );
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  }


  export const getMyFollowers = async (req, res) => {
    const { followers } = req.body; // Accept the `following` array from the request body
    try {
      const users = await User.find({ _id: { $in: followers } }).select(
        'fullName profilePic profession username country'
      );
      res.status(200).json(users);
      console.log("my followers" , users)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  }


  

  // router.post('/get-following', async (req, res) => {
  //   const { following } = req.body; // Accept the `following` array from the request body
  //   try {
  //     const users = await User.find({ _id: { $in: following } }).select(
  //       'name profilePicture flag profession username country'
  //     );
  //     res.status(200).json(users);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to fetch users', error });
  //   }
  // });