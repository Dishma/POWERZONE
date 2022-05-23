const express = require('express')
let Supplements = require("../models/supplement");

const router = express.Router(); 

//Add Supplement
router.post('/supplement/add', (req, res) => {
    let newSupplement = new Supplement(req.body);

    newSupplement.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Supplement added successfully"
        });
    });
});

//Get Supplement

router.get('/supplements', (req, res) => {
    Supplements.find().exec((err, supplements) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingSupplements: supplements
        });
    });
});

//Get a specific Supplement

router.get('/supplement/:id', (req, res) => {
    let supplementId = req.params.id;
    Supplements.findById(supplementId, (err, supplement) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            supplement
        });
    });
});


//Update Supplement
router.put('/supplement/edit/:id', (req, res) => {
    Supplements.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, supplement) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully!"
            });
        }
    );
});

//Delete Supplement
router.delete('/delete/:id', (req, res) => {
    Supplements.findByIdAndRemove(req.params.id).exec((err, deletedsupplement) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Deleted Successfull", deletedsupplement
        });
    });
});

module.exports = router;
