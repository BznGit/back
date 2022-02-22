var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('dist'));
app.listen(8081, ()=>{
	console.log('Back run  on 8081 port');
});

app.get('/users', function(reg, res, next){
    fs.readdir('./logs/users/', (err, files) => {
        if(err) throw err; // не прочитать содержимое папки
        console.log('В папке находятся файлы:' + files);
        console.log('send users: ', files);
        res.end(JSON.stringify(files))
    });
});

app.get('/user1', function(reg, res, next){
    fs.readFile('./logs/users/dgb1q9a8tp75sw0mgzpe2555g889azpx66er4gnr9e8', (err, data) => {
        if (err) throw err;
        let user = JSON.parse(data);
        console.log('send user1', user);
        res.end(JSON.stringify(user))
    })
});

app.get('/pool', function(reg, res, next){
    fs.readFile('./logs/pool/pool.status','utf8',(err, data) => {
        if (err) throw err;
        let re = /{([\s\S]+?)}/g
        let str = data.match(re)
        let arrjsn = [];
        str.forEach(item=>{
            arrjsn.push(JSON.parse(item))
        })
        console.log('send pool:', arrjsn)
        res.end(JSON.stringify(arrjsn))
    })
});
