const store = require("./db/store");
const inquirer = require("inquirer");
const questions = require("./utils/questions");

async function userMenu() {
  const { choice } = await inquirer.prompt(questions.menu);

  // prompts to make initial selection of the next step
  const formatedChoices = choice.toLowerCase().trim();
  switch (formatedChoices) {
    //   case view all employees in database
    case "view all employees":
      return viewEmployees();
    // case add employee's first_name, last_name, role_id, and manager_id to employee table
    case "add employee":
      return addEmployee();

    case "update employee's role":
      return updateEmployee();
  }
}

// Console logs all employees
async function viewEmployees() {
  try {
    // const { name}  = await inquirer.prompt(questions.querysearchByName)
    const employees = await store.viewEmployees();
    console.table(employees);
  } catch (e) {
    console.log(e);
  }
  userMenu();
}

// Stores employees first_name, last_name, role_id, manager_id in employee table
async function addEmployee() {
  try {
    // get manager
    const managers = await store.getManagers();

    // prompt to enter employee's first_name and last_name
    const employee = await inquirer.prompt([
      {
        name: "first_name",
        message: "What is the employee first name?",
      },
      {
        name: "last_name",
        message: "What is the employee last name?",
      },
    ]);
    const role_id = await getRoleId();
    
    employee.role_id = role_id;

    // Map data to manager_id
    const managerNames = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    // Prompt to select the employee's manager
    const { manager_id } = await inquirer.prompt({
      name: "manager_id",
      type: "list",
      message: "Who is the employee's manager?",
      choices: managerNames,
      default: NaN,
    });
    employee.manager_id = manager_id;

    // Create new employee
    await store.addEmployee(employee).then(console.log).catch(console.log);
  } catch (e) {
    console.log(e);
  }

  return userMenu();
}

async function updateEmployee() {
  try {
    // Store.get(employees' names)

    // get roles
    // Which epmloyee?
   const employee_id = await getEmployeeId();

    // Which role?
    // Get desired role_id
    const role_id = await getRoleId();

    // Find employee by employee id and update employee's role_id
    const updated = await store.updateEmployeeRole(employee_id, role_id)
    
  } catch (e) {
    console.log(e);
  }
  return userMenu();
}
// Gets role_id
async function getRoleId() {
    // get roles
    const roles = await store.getRoles();
    // Map data to role_id
    const roleNames = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    // Prompt to select title name
    const { role_id } = await inquirer.prompt({
      name: "role_id",
      type: "list",
      message: "What is the employee's role?",
      choices: roleNames,
    });
    return role_id
  }

  async function getEmployeeId() {
    // get roles
    const employees = await store.getEmployees();
    // Map data to role_id
    const employeesNames = employees.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    // Prompt to select title name
    const { id } = await inquirer.prompt({
      name: "id",
      type: "list",
      message: "What is the employee's name?",
      choices: employeesNames,
    });
    return id
  }
// 🚀 start
userMenu();
