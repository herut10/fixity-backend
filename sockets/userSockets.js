'use strict';

const userService = require('../services/userService');

module.exports = (socket, io) => {


    socket.on('loginUser', user => {
        console.log(user);

        userService.checkLogin(user.username, user.password)
            .then(user => {

                socket.emit('userFound', user);
            })
            .catch(err => {
                socket.emit('notFound');
            });
    })

}