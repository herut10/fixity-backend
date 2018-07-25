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