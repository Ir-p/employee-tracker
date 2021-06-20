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


    // Map data through managers' names

    console.log({ roleNames })
    const employeeAnswers = await inquirer.prompt([
        ...questions.addEmployee,
        // which Department?
        {   
            name: "department_id",
            type: "list",
            message: "Which department does the employee work for?",
            choices: departments
        }, 

        // which role?
        {
            name: "title",
            type: "list",
            message: "What is the employee's role?",
            choices: roleNames
        },
        // Prompt to select the employee's manager
        // {
        //     name: "manager_id",
        //     type: "list",
        //     message: "Who is the employee's manager?"
        //     choices: managerNames
        // }
    ])
    const department_id = departments.filter(department => department.title === employeeAnswers.department_id)[0]
    
    // Create new employee
    console.table(employeeAnswers)
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