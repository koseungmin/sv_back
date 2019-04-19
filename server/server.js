var app = require('../app');
var post = process.env.PORT || 3005;
const syncDatabase = require('../bin/sync-database');

app.listen(3005, () => {
    console.log('Example app listening on port 3005!');

    syncDatabase().then(() => {
   console.log('Database sync');
    })

});
