const router = require("express").Router();
let driver = require("../models/driver");


    //create
router.post('/driver/save', (req,res)=>{
    let newDriver = new driver(req.body);

    newDriver.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success:"Employee saved Successfully!"
        });
    });
});


    //read
router.get('/driver', (req,res)=>{
    driver.find().exec((err,driver)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingDrivers:driver
        });
    });
});


    //get a specific post
router.get("/driver/:id",(req,res)=>{
    let driverID = req.params.id;

    driver.findById(driverID,(err,driver)=>{
        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            driver
        });
    });
})


    //update
router.put('/driver/update/:id', (req,res)=>{
    driver.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,driver)=> {
            if(err){
                return res.status(400).json({
                    error:err
                });
            }

            return res.status(200).json   ({
                success:"Update successfully!"
            })   ;  
        }
    )
});


    //delete
router.delete('/driver/delete/:id', (req,res)=>{
    driver.findByIdAndDelete(req.params.id).exec((err,deletedDriver)=>{
        if(err) return res.status(400).json({
            massage:"delete unsuccessful", err
        });

        return res.json({
            massage:"delete successful", deletedDriver
        });
    });
});


module.exports = router;