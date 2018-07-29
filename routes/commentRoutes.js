const commentService = require('../services/commentService.js')


module.exports = (app) => {

    // LIST
    app.get('/comment', (req, res) => {
        var getBy = req.query.getBy;
        commentService.query(getBy)
        .then(comments => res.json(comments))
        .catch(err => console.warn(err)) 
    })
    // CREATE
    app.post('/comment', (req, res) => {
        const comment = req.body;
        commentService.add(comment)
            .then(comment => res.json(comment))
            .catch(err=> console.warn(err))
    });        
}
