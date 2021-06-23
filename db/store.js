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
    getManagers(){
        return this.connection.query("SELECT * FROM employee");
    }
    getTables(){
        return this.connection.query(`SELECT role.id,title, salary, name
        FROM role, department
        WHERE role.department_id = department.id;`);
    }
    addEmployee(employee){
        return this.connection.query(`INSERT INTO employee
        SET ?`, employee)
    }
}
connection.query = promisify(connection.query)
module.exports = new Store(connection);