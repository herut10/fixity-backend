'use strict';

const commentService = require('../services/commentService');

module.exports = (socket, io) => {
    socket.on('commentSent', comment => {
        console.log('socket:',comment);
        commentService.add(comment.comment)
            .then(addedComment => {
                addedComment.commenter = comment.commenter;
                io.emit('commentReceived', addedComment);
            }).catch(err => {
                socket.emit('error');
            });
    })

}