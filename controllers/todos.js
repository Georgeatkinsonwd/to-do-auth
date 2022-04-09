const Todo = require('../model/Todo')

module.exports = {
    getTodos: async (req,res) => {
        console.log(req.user)
        try{
            const todoItems = await Todo.find({microsoftId: req.user.microsoftId})
            res.render('todos.ejs',{todos: todoItems})
        }
        catch(err){
            console.error(err)
        }
    }
}