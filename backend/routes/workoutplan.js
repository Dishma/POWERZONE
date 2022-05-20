const express = require('express');
const WorkoutPlans = require('../models/workoutplan');

const router = express.Router();

//add workoutplan
router.post('/workoutplan/save', (req, res) => {
    let newWorkoutPlan = new WorkoutPlans(req.body);

    newWorkoutPlan.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Workout plan saved successfully"
        });
    });
});

//get workoutplans
router.get('/workoutplans', (req, res) => {
    WorkoutPlans.find().exec((err, workoutplans) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingWorkoutPlans: workoutplans
        });
    });
});

//get specific workoutplan
router.get('/workoutplan/:id', (req, res) => {
    let workoutplanId = req.params.id;
    WorkoutPlans.findById(workoutplanId, (err, workoutplan) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            workoutplan
        });
    });
});

//update workoutplan
router.put('/workoutplan/update/:id', (req, res) => {
    WorkoutPlans.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, workoutplan) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Update Successfully"
            });
        }
    );
});

//Delete WorkoutPlan
router.delete('/workoutplan/delete/:id', (req, res) => {
    WorkoutPlans.findByIdAndRemove(req.params.id).exec((err, deletedworkoutplan) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Delete Successfull", deletedworkoutplan
        });
    });
});

module.exports = router;