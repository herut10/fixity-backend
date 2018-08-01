'use strict';

const issueService = require('../services/issueService');

module.exports = (app) => {
    app.get('/issue', (req, res) => {
        console.log('req', req.session);
        var getBy = req.query.getBy
        issueService.query(getBy)
            .then(issues => res.json(issues))
            .catch(err => console.warn(err));
    })

    app.get('/issue/:issueId', (req, res) => {
        var issueId = req.params.issueId;
        issueService.getById(issueId)
            .then(issue => res.json(issue))
            .catch(err => console.warn(err))
    })

    app.delete('/issue/:issueId', (req, res) => {
        if (!req.session.user || !req.session.user.isAdmin) {
            res.status(401)
        }
        var issueId = req.params.issueId;
        issueService.remove(issueId)
            .then(() => res.end('Deleted issue'))
            .catch(err => console.warn(err));
    })

    app.post('/issue', (req, res) => {
        var issue = req.body;

        issueService.add(issue)
            .then(issue => res.json(issue))
            .catch(err => console.warn(err));
    })

    app.put('/issue/:issueId', (req, res) => {
        // var loggedUser = req.session.user;
        // if (!loggedUser && !loggedUser.isAdmin) res.status(403).send('Not permitted to update issue');

        var updatedIssue = req.body;
        issueService.update(updatedIssue)
            .then(result => res.json(result))
            .catch(err => console.warn(err));
    })
}