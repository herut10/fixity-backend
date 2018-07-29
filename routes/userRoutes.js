const userService = require('../services/userService')

function addUserRoutes(app) {
    app.get('/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
            .catch(err => console.warn(err));
    });

    app.get('/user/:userId', (req, res) => {
        var userId = req.params.userId;
        userService.getById(userId)
            .then(user => res.json(user))
            .catch(err => console.warn(err));
    })

    app.delete('/user/:userId', (req, res)=>{
        var userId = req.params.userId;
        userService.remove(userId)
            .then(()=>res.end(`user ${userId} Deleted `))
            .catch(err => console.warn(err));
    })

    app.post('/user', (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => res.json(user))
            .catch(err => console.warn(err));
    })

    app.put('/user/:userId', (req, res)=>{
        const user = req.body;
        userService.update(user)
            .then(user=>res.json(user))
            .catch(err => console.warn(err));
    })
}

module.exports = addUserRoutes;
