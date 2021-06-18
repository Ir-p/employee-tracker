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
    
    console.log(departments)
    const { name } = await inquirer.prompt([
        ...questions.addEmployee,
        // which Department?
        {}, 
        // which role?
        {}
    ])
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