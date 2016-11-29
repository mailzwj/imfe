var colors = require('colors');
module.exports = {
    warn: function(msg) {
        console.log(msg.toString()['yellow']);
    },
    info: function(msg) {
        console.log(msg.toString()['green']);
    },
    error: function(msg) {
        console.log(msg.toString()['red']);
    },
    text: function(msg) {
        console.log(msg);
    }
};