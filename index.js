const store = require('./db/store');
const inquirer = require('inquirer');
const questions = require('./utils/questions');

async function userMenu() {
   const { choice } = await inquirer.prompt(questions.menu);
    
   // lowercase + trip + TODO: validation
   const formatedChoices = choice.toLowerCase().trim();
   switch (formatedChoices) {
       case 'search by employee name': return querysearchByName()
       case 'add employee': return addEmployee()
   }
}


async function addEmployee(){
    // getDepartments
    try {
    const departments = await store.getDepartments()
    // getRoles
    const roles = await store.getRoles()
    const managers = await store.getManagers()

    console.log(roles[0])
    // Map data to role names
    const roleNames = roles.map(role => role.title)
    const  managerNames = managers.map(employee => `${employee.first_name} ${employee.last_name}` )
    const employeeAnswers = await inquirer.prompt([
        ...questions.addEmployee,

       

        // Prompt to select the employee's role
        {
            name: "title",
            type: "list",
            message: "What is the employee's role?",
            choices: roleNames
        },

        {
            name: "manager_id",
            type: "list",
            message: "Who is your manager?",
            choices: managerNames
        },
       
    ])
   
   
    
    const employeeRole = roles.filter(role => role.title === employeeAnswers.title)[0].id
    employeeAnswers.role_id = employeeRole

    const employeeManager = managers.filter(employee => 
            `${employee.first_name} ${employee.last_name}` === employeeAnswers.manager_id)[0].id
    employeeAnswers.manager_id = employeeManager
    
    // Create new employee
    store.addEmployee(employeeAnswers)
        .then(console.log)
        .catch(console.log)
    
    }
    catch(e) {
        console.log(e)
    }

    return userMenu();

}

async function querysearchByName(){
    const {name} = await inquirer.prompt(questions.querysearchByName)
    store.searchByName(name);

    userMenu();
}

// 🚀 start
userMenu()