const db = require('./conn');

class userModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static async addUser(name, email, password) {
        try{
            const response = await db.result(`INSERT INTO reviewer(name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
            return response;
        } catch (err) {
            return err;
        }
    }
}

module.exports = userModel;