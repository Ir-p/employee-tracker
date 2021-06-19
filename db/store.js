const connection = require('./connection');
const { promisify } = require('util')
class Store{
    constructor(connection){
        this.connection = connection;
    }

    read() {
        return this.connection.query("SELECT * FROM employee;"); 
    }
    searchByName(name){
        return this.connection.query("SELECT * FROM")
    }

    getDepartments(){
        return this.connection.query("SELECT * FROM department");
    }
    getRoles(){
        return this.connection.query("SELECT * FROM role");
    }
}
connection.query = promisify(connection.query)
module.exports = new Store(connection);