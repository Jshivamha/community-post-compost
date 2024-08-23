const express = require('express');
const router = express.Router();
const Community = require('../modals/Community');
const User = require('../modals/User');

router.post('/', async (req, res, next) => {
    console.log("Visited create community");
    try {
        const { Communityname, Communitydescription } = req.body;
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

        const newCommunity = await Community.create({
            ownerId: ownerId,
            ownerUsername: owner.name,
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
        res.status(200).json({ message: "Community created successfully", community: newCommunity });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
