module.exports = {
    
    menu: {
        name: "choice", 
        type: "list",
        message: "Next step",
        choices: ["search by employee", "add employee", "exit"]
    },

    serchByName: {
        name: "name", 
        message: "What is the employee's name?",
    },

    addEmployee: [
        {
        name: "first_name",
        message: "What is the employee first name?"
        },
        {
        name: "last_name",
        message: "What is the employee last name?"
        },
        
    ]

}