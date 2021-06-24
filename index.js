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
    try {
    const departments = await store.getDepartments()
    // get roles
    const roles = await store.getRoles()
    // get manager 
    const managers = await store.getManagers()

    

    const employee = await inquirer.prompt(
        [
            {
            name: "first_name",
            message: "What is the employee first name?"
            },
            {
            name: "last_name",
            message: "What is the employee last name?"
            },
        ]
    )
    
    // Map data to role_id
    const roleNames = roles.map(({ id, title}) => ({ name: title, value: id }))
   
    // Prompt to select title name
    const { role_id } = await inquirer.prompt(
        {
            name: "role_id",
            type: "list",
            message: "What is the employee's role?",
            choices: roleNames
        },
    )

    employee.role_id = role_id
    
    // Map data to manager_id
    const managerNames = managers.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    // Prompt to select the employee's manager
    const { manager_id } = await inquirer.prompt(
        {
            name: "manager_id",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managerNames
        },
    )
    employee.manager_id = manager_id
    
    // Create new employee
    await store.addEmployee(employee)
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