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

    // Map data to role names
    const roleNames = roles.map(role => role.title)

    console.log({ roleNames })
    const employeeAnswers = await inquirer.prompt([
        ...questions.addEmployee,
        // which Department?
        {   
            name: "department_id",
            type: "list",
            message: "Employee of which department",
            choices: departments
        }, 

        // which role?
        {
            name: "role_id",
            type: "list",
            message: "What is employee's role?",
            choices: roleNames
        }
    ])
    const department_id = departments.filter(department => department.title === employeeAnswers.department_id)[0].id
    console.log(employeeAnswers)
    // Create new employee
    }
    catch(e) {
        console.log(e)
    }

    userMenu();

}

async function querysearchByName(){
    const {name} = await inquirer.prompt(questions.querysearchByName)
    store.searchByName(name);

    userMenu();
}

// 🚀 start
userMenu()