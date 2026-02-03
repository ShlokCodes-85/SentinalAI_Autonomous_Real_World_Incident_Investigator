const Item = require('../models/Item');

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create an item
exports.createItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
