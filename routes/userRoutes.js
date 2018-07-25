const userService = require('../services/userService')

function addUserRoutes(app) {
    app.get('/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
    });

    app.get('/user/userId', (req, res) => {
        var userId = req.params.userId;
        userService.getById(userId)
            .then(user => res.json(user))
    })

    app.delete('/user/userId', (req, res)=>{
        var userId = req.params.userId;
        userService.remove(userId)
            .then(()=>res.end(`user ${userId} Deleted `))
    })

    app.post('/user', (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => res.json(user))
    })

    app.put('/user/userId', (req, res)=>{
        const user = req.body;
        userService.update(user)
            .then(user=>res.json(user))
    })
}

module.exports = addUserRoutes;
