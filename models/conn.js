const host = 'lallah.db.elephantsql.com';
const database = 'wkgnlwqk';
const user = 'wkgnlwqk';
const password = 'CWQ4YwgbdB88lz-OPPOLQxyC45Bi3G-p';

const pgp = require('pg-promise')({
    query: function(e) {
        console.log("Query: ", e.query);
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password
}

const db = pgp(options);

module.exports = db;