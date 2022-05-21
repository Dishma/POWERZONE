const router = require("express").Router();
let Supplement = require("../models/supplement");

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
router.get('/supplement', (req, res) => {
    Supplement.find().exec((err, supplement) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingSupplements: supplement
        });
    });
});

//Get a specific Supplement

router.get('/supplement/:id', (req, res) => {
    let supplementId = req.params.id;
    Supplement.findById(supplementId, (err, supplement) => {
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
    Supplement.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, supplement) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Update Successfully"
            });
        }
    );
});

//Delete Supplement
router.delete('/supplement/delete/:id', (req, res) => {
    Supplement.findByIdAndRemove(req.params.id).exec((err, deletedsupplement) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Delete Successfull", deletedsupplement
        });
    });
});



module.exports = router;
