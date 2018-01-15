var mysql = require('mysql');
exports.createConnection = createConnection;
exports.closeConnection = closeConnection;

var connection;
function createConnection(){
    connection =  mysql.createConnection({
        host     : '10.100.132.75',
        user     : 'root',
        password : '3Arf7Egth?-!',
        database : 'c1portal'
    });
    return connection;
}

function closeConnection() {
    connection.end();
}
