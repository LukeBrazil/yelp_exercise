const db = require('./conn');
const bcrypt = require('bcryptjs');

class userModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        // Returns true or false
        return bcrypt.compareSync(this.password, hashedPassword)
    }

    async addUser() {
        try {
            const response = await db.one(`INSERT INTO reviewer (name, email, password) VALUES ($1, $2, $3) RETURNING id;`, [this.name, this.email, this.password]);
            console.log("User created: ", response.id);
            return response;

        } catch (error) {
            console.log("My error is: ", error.message);
            return error.message;
        }
    }
    async login() {
        try{
            const response = await db.one(`SELECT id, name, email, password FROM reviewer WHERE email = $1;`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            console.log('Is valid?', isValid);
            console.log("Login repsonse:", response);

            if(!!isValid) {
                const {name, id} = response;
                return { isValid, name, user_id: id}
            } else {
                return { isValid }
            }

        } catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
}

module.exports = userModel;