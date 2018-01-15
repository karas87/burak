var mysql = require('../util/mysql-connector');
exports.saveUser = saveUser;
function saveUser(username, firstname, lastname) {
    console.log(username + ' ' + firstname + ' ' + lastname + ' -- saved');
    var con = mysql.createConnection();
    var sqlQuery = 'SELECT * FROM c1portal.modules';
    con.query('SELECT * FROM c1portal.modules', function (err, rows, fields) {
        if (err) throw err
        console.log('The solution is: ', rows[0].solution)
    })
    mysql.closeConnection();
};