const express = require('express')
let Orders = require("../models/order");

const router = express.Router(); 

//Add Order
router.post('/order/add', (req, res) => {
    let newOrder = new Orders(req.body);

    newOrder.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Order added successfully"
        });
    });
});

//Get Order

router.get('/orders', (req, res) => {
   Orders.find().exec((err, orders) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingOrders: orders
        });
    });
});

//Get a specific Order

router.get('/order/:id', (req, res) => {
    let orderId = req.params.id;
    Orders.findById(orderId, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            order
        });
    });
});


//Update Order
router.put('/order/edit/:id', (req, res) => {
    Orders.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, order) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully!"
            });
        }
    );
});

//Delete Order
router.delete('/order/delete/:id', (req, res) => {
    Orders.findByIdAndRemove(req.params.id).exec((err, deletedorder) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Deleted Successfully", deletedorder
        });
    });
});

module.exports = router;
