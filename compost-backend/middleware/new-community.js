const express = require('express');
const router = express.Router();
const Community = require('../modals/Community');
const User = require('../modals/User');

router.post('/', async (req, res, next) => {
    console.log("Visited create community");
    try {
        const { Communityname, Communitydescription } = req.body;
        const ownerId = req.session.userId;

        if (!Communityname || !Communitydescription) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        if (!ownerId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        console.log(Communityname);
        console.log(Communitydescription);

        // Check if community name already exists
        const existingCommunity = await Community.findOne({ Communityname });
        if (existingCommunity) {
            return res.status(400).json({ message: "Community name already exists" });
        }

        const newCommunity = await Community.create({
            ownerId: ownerId,
            Communityname,
            Communitydescription,
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
        res.status(201).json({ message: "Community created successfully", community: newCommunity });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ message: "Community name must be unique" });
        }
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
