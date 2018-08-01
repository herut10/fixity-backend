'use strict';

const issueService = require('../services/issueService');

module.exports = (socket, io) => {
    socket.on('issueAdd', issue => {
        issueService.add(issue)
            .then(AddedIssue => {
                
                io.emit('issueAdded', AddedIssue);
            })
            .catch(err => {
                socket.emit('errorAdding');
            });
    })

    socket.on('issueLikesChanged', updatedIssue => {
        socket.handshake.session.wow = 'qwe';
        console.log('wow');
        console.log(socket.handshake.session);
        io.emit('issueLikesChanged', updatedIssue);
    })


    // app.delete('/issue/:issueId', (req, res) => {
    //     // var loggedUser = req.session.user;
    //     // if (!loggedUser && !loggedUser.isAdmin) res.status(403).send('Not permitted to delete issue');

    //     var issueId = req.params.issueId;
    //     issueService.remove(issueId)
    //         .then(() => res.end('Deleted issue'))
    //         .catch(err => console.warn(err));
    // })

    // app.post('/issue', (req, res) => {
    //     var issue = req.body;
    //     issueService.add(issue)
    //         .then(issue => res.json(issue))
    //         .catch(err => console.warn(err));
    // })

    // app.put('/issue/:issueId', (req, res) => {
    //     // var loggedUser = req.session.user;
    //     // if (!loggedUser && !loggedUser.isAdmin) res.status(403).send('Not permitted to update issue');

    //     var updatedIssue = req.body;
    //     issueService.update(updatedIssue)
    //         .then(result => res.json(result))
    //         .catch(err => console.warn(err));
    // })
}