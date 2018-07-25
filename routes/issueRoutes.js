'use strict';

const issueService = require('../services/issueService');

module.exports = (app) => {
    app.get('/issue', (req, res) => {
        issueService.query()
            .then(issues => res.json(issues));
    })

    // app.get('/issue/:filter', (req, res) => {
    //     var filterBy = req.params.filter
    //     filterBy = JSON.parse(filterBy)
    //     issueService.query(filterBy)
    //         .then(issues => res.json(issues))
    // })

    app.get('/issue/:issueId', (req, res) => {
        var issueId = req.params.issueId;
        issueService.getById(issueId)
            .then(issue => res.json(issue));
    })

    app.delete('/issue/:issueId', (req, res) => {
        // var loggedUser = req.session.user;
        // if (!loggedUser && !loggedUser.isAdmin) res.status(403).send('Not permitted to delete issue');

        var issueId = req.params.issueId;
        issueService.remove(issueId)
            .then(() => res.end('Deleted issue'));
    })

    app.post('/issue', (req, res) => {
        var issue = req.body;
        issueService.add(issue)
            .then(issue => res.json(issue));
    })

    app.put('/issue/:issueId', (req, res) => {
        // var loggedUser = req.session.user;
        // if (!loggedUser && !loggedUser.isAdmin) res.status(403).send('Not permitted to update issue');

        var issue = req.body;
        issueService.update(issue)
            .then(result => res.json(result));
    })
}