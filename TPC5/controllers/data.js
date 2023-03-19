var axios = require('axios')

//Users List
module.exports.usersList = () => {
    return axios.get('http://localhost:3000/users?_sort=id')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

//Add User
module.exports.addUser = u => {
    return axios.post('http://localhost:3000/users', u)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

//Tasks List
module.exports.tasksList = () => {
    return axios.get('http://localhost:3000/tasks?_sort=due')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

//Add Task
module.exports.addTask = t => {
    return axios.post('http://localhost:3000/tasks', t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

//Get Task
module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

//Update Task
module.exports.updateTask = t => {
    return axios.put('http://localhost:3000/tasks/'+t.id, t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

//Delete Task
module.exports.deleteTask = id => {
    return axios.delete('http://localhost:3000/tasks/'+id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}