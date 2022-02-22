const fs = require('fs');

fs.readdir('./logs/users/', (err, files) => {
    if(err) throw err; // не прочитать содержимое папки
    console.log('В папке находятся файлы:' + files);
    files.forEach(item=>{
        fs.readFile('./logs/users/' + item, (err, data) => {
            if (err) throw err;
            let users = JSON.parse(data);
            console.log('user: ', item)
            console.log(users);
        })
    })
 });
 fs.readFile('./logs/pool/pool.status','utf8',(err, data) => {
    if (err) throw err;

    let re = /{([\s\S]+?)}/g
    let str = data.match(re)
    console.log(str)
    let arrjsn = [];
    str.forEach(item=>{
        arrjsn.push(JSON.parse(item))
    })
    console.log(arrjsn)
})