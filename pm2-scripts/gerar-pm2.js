const fs = require('fs');

const path = './pm2-scripts';

fs.readdir(path, function(err, items) {
    const apps = [];
 for (let i=0; i<items.length; i++) {
     if(items[i] != 'pm2-geral.json' && items[i] != 'gerar-pm2.js' ) {
        const obj = JSON.parse(fs.readFileSync(path + '/' + items[i], 'utf8'));
        obj.apps[0].out_file = `~/.pm2/logs/${obj.apps[0].name}-out.log`;
        obj.apps[0].error_file = `~/.pm2/logs/${obj.apps[0].name}-error.log`;
        apps.push(obj.apps[0]);
     }
 }
 const geral = { apps };
 fs.writeFile(path + "/pm2-geral.json", JSON.stringify(geral), function(err) {
     if(err) {
         return console.log(err);
     }
 
     console.log("The file was saved!");
 }); 
 console.log(apps.length);
});