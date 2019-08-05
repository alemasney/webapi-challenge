const express = require('express');
const helmet = require('helmet');

const projects = require('./projects/projectModel.js');
const actions = require('./actions/actionModel.js');

//const actionRouter = require('./actions/actionRouter.js');
//const projectRouter = require('./projects/projectRouter.js');

const server = express();

server.use(express.json());
//server.use('/api/actions', actionRouter);
//server.use('/api/projects', projectRouter);
server.use(helmet());

server.get('/', (req, res) => {
    res.send(`<h2>Find a Project</h2>`)
});

server.get('/api/projects', async (req, res) => {
    projects.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await projects.get(req.params.id)

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ errorMessage: 'the project was not found.' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.post('/api/projects', async (req, res) => {
    try {
        const newProject = await projects.insert(req.body);

        if (newProject.name && newProject.description) {
            res.status(201).json(newProject);
        } else if (!newProject.name) {
            res.status(400).json({ message: 'please provide a valid name' });
        } else {
            res.status(400).json({ message: 'please provide a valid description' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.put('/api/projects/:id', async (req, res) => {
    try {
        const update = await projects.update(req.params.id, req.body);

        if (update) {
            res.status(201).json(update);
        } else {
            res.status(400).json({ message: 'the update was unsuccessful.' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.delete('/api/projects/:id', async (req, res) => {
    try {
        const deleted = await projects.remove(req.params.id);

        if (deleted) {
            res.status(200).json(deleted);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.get('/api/projects/:id/actions', async (req, res) => {
    try {
        const projectActions = await projects.getProjectActions(req.params.id)

        if(projectActions) {
            res.status(200).json(projectActions);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.get('/api/projects/:id/actions/:id', async (req, res) => {
    try {
        const actionsId = await actions.get(req.params.id);
        
        if (actionsId) {
            res.status(200).json(actionsId)
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.post('/api/projects/:id/actions', async (req, res) => {
    
    try {
        const addAction = await actions.insert(req.body);
        
        if(addAction) {
            res.status(200).json(addAction);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.put('/api/projects/:id/actions/:id', async (req, res) => {
    try {
        const updateAction = await actions.update(req.params.id, req.body);

        if(updateAction.description && updateAction.notes) {
            res.status(201).json(updateAction);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

server.delete('/api/projects/:id/actions/:id', async (req, res) => {
    try {
        const deletedAction = await actions.remove(req.params.id);

        if (deletedAction) {
            res.status(200).json(deletedAction);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = server;