var express = require('express');
//Bu js router amacıyla kullanılacak
var mainbus = require('../service/mainbus');
var router = express.Router();


//Middleware callback(Tüm requestler bu middleware callback'ten geçer. Burda requestle ilgili kontrolller yapılabilir)
router.use(function (req, res, next) {
    console.log('Router use worked...');
    next();//next(çagrılmadıgı durumlarda request o anda kesilir
});

//Çoklu metot tipine göre requestlerin handle edildiği
router.route('/multimethod')
    .all(function(req, res, next) {
        console.log("Tüm http metotlar gelir");
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next();
    })
    .get(function(req, res, next) {
        console.log("GET method kullanildi");
        res.json(req.user);
    })
    .put(function(req, res, next) {
        console.log("PUT method kullanildi");
        //Using try catch
        try{
            // just an example of maybe updating the user
            req.user.name = req.params.name;
            // save user ... etc
            res.json(req.user);
        }catch(err) {
            console.error(err);
        }

    })
    .post(function(req, res, next) {
        console.log("POST method kullanildi");
        next(new Error('not implemented'));
    })
    .delete(function(req, res, next) {
        console.log("DELETE method kullanildi");
        next(new Error('not implemented'));
    });

//GET ile çağrılan tüm '/test' requestler burda handle edilir
router.get('/', function(req, res, next) {
    var message = 'Test router get methot handled.....';
    console.log(message);
    var json = new Object();
    json.message = message;
    json.success = true;
    res.send(json);
});

//POST ile çağrılan tüm '/test' requestler burda handle edilir
router.post('/', function(req, res, next) {
    var message = 'Test router  post method handled.....';
    console.log(message);
    var json = new Object();
    json.message = message;
    json.success = 'true';
    res.send(json);
});

//GET ile çağrılan '/test/saveuser' pattern'li requestler burda handle edilir. Burda path kısmına regex'ler yazılabilir
router.get('/saveuser', function(req, res, next) {
    console.log('Original URL : ' + req.originalUrl);
    console.log('Base URL : ', req.baseUrl);
    console.log('Path : '+ req.path);

    console.log('username : ' + req.param('username'));
    console.log('firstname : ' + req.param('firstname'));
    console.log('lastname : ' + req.param('lastname'));

    var message = 'Save users handled...';
    var json = new Object();
    json.message = message;
    json.success = 'true';
    res.send(json);
});

//POST ile çağrılan '/test/saveuser' pattern'li requestler burda handle edilir. Burda path kısmına regex'ler yazılabilir
router.post('/saveuser', function(req, res, next) {
    console.log('username : ' + req.param('username'));
    console.log('firstname : ' + req.param('firstname'));
    console.log('lastname : ' + req.param*('lastname'));
    mainbus.saveUser(req.param('username') , req.param('firstname'), req.param('lastname'));
    var message = 'Save users handled...';
    var json = new Object();
    json.message = message;
    json.success = 'true';
    res.send(json);
});

//Çoklu handler örneği
var firstGetUsers =  function(req, res, next){
    console.log('First getusers() method handled...');
    testbus.saveUser('test');
    next();
};
var secondGetUsers =  function(req, res, next){
    console.log('Second getusers() method handled...');
    res.send('second response');
};
router.get('/getusers',[firstGetUsers,secondGetUsers]);

module.exports = router;