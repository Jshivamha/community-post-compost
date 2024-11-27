const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const User = require('../models/User');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const newpost = require('./Post')
router.use('/post',newpost)

router.delete('/delete-community', async (req, res, next) => {
    console.log("visited delete community");
    
    try {
        const { commId } = req.body;

        if (!commId) {
            return res.status(400).json({ message: "Community ID is required" });
        }

        const community = await Community.findById(commId);
        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        if(req.session.userId != community.ownerId){
            return res.status(404).json({ message: "Only Owner can Delete this Community" });
        }

        await Community.findByIdAndDelete(commId);

        await User.findByIdAndUpdate(community.ownerId, {
            $pull: { Communities: commId }
        });

        res.status(200).json({ message: "Community deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.delete('/leave-community', async (req, res, next) => {
    console.log("visited leave community");
    
    try {
        const { commId } = req.body;

        if (!commId) {
            return res.status(400).json({ message: "Community ID is required" });
        }

        const community = await Community.findById(commId);
        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }
        console.log(community.ownerId);
        console.log(req.session.userId);
        
        if(community.ownerId == req.session.userId){
            return res.status(401).json({"err":"You can not leave the community you own!"})
        }

        await User.findByIdAndUpdate(community.ownerId, {
            $pull: { Communities: commId }
        });

        res.status(200).json({ message: "Community left successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post('/new-community', upload.single('image'), async (req, res, next) => {
    console.log("Visited create community");
    try {
        const { Communityname, Communitydescription, image } = req.body;
        const owner = await User.findById(req.session.userId);
        const ownerId = owner._id;

        if (!Communityname || !Communitydescription) {
            return res.status(400).json({ message: "Name and description are required" });
        }
        
        if (!ownerId) {
            return res.status(401).json({ err: "User not authenticated" });
        }
        
        console.log(Communityname);
        console.log(Communitydescription);
        
        // Check if community name already exists
        const existingCommunity = await Community.findOne({ Communityname });
        if (existingCommunity) {
            return res.status(400).json({ err: "Community name already exists" });
        }

        let imageBuffer = null;

        if (image) {
            const matches = image.match(/^data:(.+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                const base64Data = matches[2];
                imageBuffer = Buffer.from(base64Data, 'base64');
            } else {
                return res.status(400).json({ message: "Invalid image format" });
            }
        } else {
            console.log("No image provided");
        }
        
        const newCommunity = await Community.create({
            ownerId: ownerId,
            ownerUsername: owner.name,
            Communityname,
            Communitydescription,
            image: imageBuffer,
            members: [ownerId],
        });
        
        // adding community id to user's community list
        const user = await User.findByIdAndUpdate(ownerId, {
            $push: { Communities: newCommunity._id }
        }, { new: true });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log(`New community created: ${Communityname}`);
        res.status(200).json({ message: "Community created successfully", community: newCommunity });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.get('/all-community', async (req,res,next) => {
    console.log("visited all community")
    try{
        const ownerId = await req.session.userId
        if (!ownerId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const communities = await Community.find();
        
        res.status(200).json({"Communities":communities});
    }
    catch(err){
        console.log(err);
    }
})

router.get('/user-community', async (req,res,next) => {
    console.log("visited user community")
    try{
        const ownerId = await req.session.userId
        if (!ownerId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // find the user by their ID
        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const communityIds = user.Communities;
        const communities = await Community.find({ _id: { $in: communityIds } });
        
        res.status(200).json({"Communities":communities});
    }
    catch(err){
        console.log(err);
    }
})

router.post('/add-to-community', async (req, res, next) => {
    console.log("Visited add to community");
    try {
        const { communityId } = req.body;
        const userId = req.session.userId;

        if (!communityId) {
            return res.status(400).json({ message: "Community ID is required" });
        }

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Fetch the community
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        // Check if the user is already a member
        if (community.members.includes(userId)) {
            return res.status(400).json({ message: "User is already a member of the community" });
        }

        // Add user to the community members list
        community.members.push(userId);
        await community.save();

        // Add community to the user's Communities list
        const user = await User.findByIdAndUpdate(userId, {
            $push: { Communities: communityId }
        }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`User ${userId} added to community ${communityId}`);
        res.status(200).json({ message: "User added to community successfully", community });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


router.get('/community/:id', async (req, res) => {
    console.log("Visited show community details");
    
    try {
        const { id } = req.params;

        // Find the community and populate the posts
        const community = await Community.findById(id)
            .populate({
                path: 'posts', // Path to the posts array
                populate: {
                    path: 'user', // Populate the user field inside each post
                    select: 'name email', // Select specific fields from the user
                }
            });

        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        console.log(community);

        res.status(200).json(community);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

  



module.exports = router;