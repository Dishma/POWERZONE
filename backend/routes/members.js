const express = require('express');
const Members = require('../models/members');

const router = express.Router();

//Add Members
router.post('/member/save', (req, res) => {
    let newMember = new Members(req.body);

    newMember.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Member added successfully"
        });
    });
});

//Member List
router.get('/members', (req, res) => {
    Members.find().exec((err, members) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingMembers: members
        });
    });
});

//Get Specific Member
router.get('/member/:id', (req, res) => {
    let memberId = req.params.id;
    Members.findById(memberId, (err, member) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            member
        });
    });
});

//Update Member
router.put('/member/update/:id', (req, res) => {
    Members.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, member) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Update Successfully"
            });
        }
    );
});

//Delete Member
router.delete('/member/delete/:id', (req, res) => {
    Members.findByIdAndRemove(req.params.id).exec((err, deletedmember) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Delete Successfull", deletedmember
        });
    });
});

module.exports = router;