const connection = require('./connection');
const { promisify } = require('util')
class Store{
    constructor(connection){
        this.connection = connection;
    }

    read() {
        return this.connection.query("SELECT * FROM employee;"); 
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

    viewEmployees(){
        return this.connection.query(`SELECT first_name, last_name,title, salary, name
        FROM employee, role, department
        WHERE role.department_id = department.id
        AND employee.role_id = role.id;`);
    }
    addEmployee(employee){
        return this.connection.query(`INSERT INTO employee
        SET ?`, employee)
    }

    getEmployees(){
        return this.connection.query(`SELECT * FROM employee`)
    }
    
    updateEmployeeRole(id, role_id){
        return this.connection.query(`UPDATE employee
        SET ? 
        WHERE ?`, [{role_id}, {id}])
    }
}
connection.query = promisify(connection.query)
module.exports = new Store(connection);