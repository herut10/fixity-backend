'use strict';

const userService = require('../services/userService');

module.exports = (socket, io) => {


    socket.on('loginUser', user => {
        userService.checkLogin(user.username, user.password)
            .then(user => {
                delete user.password
                socket.handshake.session.user = user
                console.log(socket.handshake.session.user);
                socket.emit('userFound', user);
            })
            .catch(err => {
                socket.emit('notFound');
            });
    })

}