<<<<<<< HEAD
const userService = require('../services/userService')

function addUserRoutes(app) {
    app.get('/toy', (req, res) => {
        toyService.query()
            .then(toys => res.json(toys))
            .catch(err=>console.log('server failed to get toys'));
    });

    app.get('/toy/:toyId', (req, res) => {
        var toyId = req.params.toyId;
        toyId = toyId.substring(1, toyId.length)
        toyService.getById(toyId)
            .then(toy => res.json(toy))
            .catch(err=>console.log('server failed to get byId'));
    })

    app.delete('/toy/:toyId', (req, res)=>{
        var toyId = req.params.toyId;
        toyId = toyId.substring(1, toyId.length)
        toyService.remove(toyId)
            .then(()=>res.end(`Toy ${toyId} Deleted `))
            .catch(err=>Console.log('server failed to delete'));
    })

    app.post('/toy', (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => res.json(toy)
            .catch(err=>console.log('server failed to add toy')))
    })

    app.put('/toy/:toyId', (req, res)=>{
        const toy = req.body;
        toyService.update(toy)
            .then(toy=>res.json(toy))
            .catch(err=>console.log('server failed to update toy'));
    })
}

module.exports = addUserRoutes;
=======
const commentService = require('../services/commentService.js')


module.exports = (app) => {

    // LIST
    app.get('/comment', (req, res) => {
        commentService.query()
            .then(comments => res.json(comments))
    })
    // CREATE
    app.post('/comment', (req, res) => {
        const comment = req.body;
        commentService.add(comment)
            .then(comment => {
                res.json(comment)
            })
    })
}
>>>>>>> a47539602454df60398a5c969dfd9c8b66ea2fd9
