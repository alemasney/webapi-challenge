const express = require('express');

const actions = require('./actionModel.js');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const actionsId = await actions.get(req.params.id);
        console.log(req.params)
        if(actionsId) {
            res.status(200).json(actionsId)
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/')

module.exports = router;