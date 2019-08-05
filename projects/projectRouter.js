const express = require('express');

const projects = require('./projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    projects.get()
        .then( project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.get('/:id', async (req, res) => {
    try {
        const project = await projects.get(req.params.id)

        if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ errorMessage: 'the project was not found.'})
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/', async (req, res) => {
    try {
        const newProject = await projects.insert(req.body);

        if(newProject.name && newProject.description) {
            res.status(201).json(newProject);
        } else if(!newProject.name) {
            res.status(400).json({ message: 'please provide a valid name'});
        } else {
            res.status(400).json({ message: 'please provide a valid description'})
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
         const update = await projects.update(req.params.id, req.body);

         if(update) {
             res.status(201).json(update);
         } else {
             res.status(400).json({ message: 'the update was unsuccessful.'})
         }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await projects.remove(req.params.id);

        if(deleted) {
            res.status(200).json(deleted);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// router.get('/:id/actions', async (req, res) => {
//     try {
//         const 
//     }
// })

module.exports = router;