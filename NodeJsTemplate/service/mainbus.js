var maindao = require('../dao/maindao');

//Export Edilen metotlar poublic erişime açılır
exports.saveUser = saveUser;

function saveUser(username, firstname, lastname) {
    console.log('mainbus worked');
    maindao.saveUser(username, firstname, lastname);
};
