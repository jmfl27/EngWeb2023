var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
var tarefasServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /tasks e /users -----------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks?_sort=due")
                        .then(response => {
                            var tasks = response.data
                            var idTarefa = tasks.length + 1

                            axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                                var users = resp.data
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.mainPage(idTarefa,users,tasks,d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                res.end()
                            })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /users/create --------------------------------------------------------------------
                else if(req.url == "/users/create"){
                    axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                        var users = resp.data
                        var userId = users.length + 1
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(templates.userFormPage(userId,d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                        res.end()
                    })
                }
                // GET /tasks/edit/:id  --------------------------------------------------------------------
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    // Get aluno record
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let tarefa = response.data
                            // Add code to render page with the student record
                            axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                                var users = resp.data
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.tarefaFormEditPage(tarefa,users))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                res.end()
                            })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter a tarefa ${idTask}... Erro:` + erro)
                            res.end()
                        })
                }
                // GET /tasks/done/:id  --------------------------------------------------------------------
                else if(/\/tasks\/done\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let tas = response.data
                                axios.put('http://localhost:3000/tasks/' + idTask, {
                                    "id" : tas.id,
                                    "desc" : tas.desc,
                                    "due" : tas.due,
                                    "who" : tas.who,
                                    "done" : "true"
                                })
                                .then(resp => {
                                    axios.get("http://localhost:3000/tasks?_sort=due")
                                    .then(response => {
                                        var tasks = response.data
                                        var idTarefa = tasks.length + 1

                                        axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                                            var users = resp.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.mainPage(idTarefa,users,tasks,d))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                            res.end()
                                        })
                                    })
                                    .catch(function(erro){
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                        res.end()
                                    })
                                       
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                })

                        }).catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /tasks/delete/:id
                else if(/\/tasks\/delete\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/tasks/'+ idTask)
                        .then(resp => {
                            axios.get("http://localhost:3000/tasks?_sort=due")
                            .then(response => {
                                var tasks = response.data
                                var idTarefa = tasks.length + 1

                                axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                                    var users = resp.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.mainPage(idTarefa,users,tasks,d))
                                    res.end()
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                    res.end()
                                })
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                        }).catch(error => {
                            console.log('Erro: ' + error);
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                // POST /users/create 
                if(req.url == '/users/create'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/users/', {
                                "id" : result.id,
                                "name" : result.name,
                                "usrnm" : result.usrnm
                            })
                            .then(resp => {
                                axios.get("http://localhost:3000/tasks?_sort=due")
                                .then(response => {
                                    var tasks = response.data
                                    var idTarefa = tasks.length + 1

                                    axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                                        var users = resp.data
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write(templates.mainPage(idTarefa,users,tasks,d))
                                        res.end()
                                    })
                                    .catch(function(erro){
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                        res.end()
                                    })
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                    res.end()
                                })
                            }).catch(error => {
                                console.log('Erro: ' + error);
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                // POST /tasks/create 
                else if(req.url == '/tasks/create'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/tasks/', {
                                "id" : result.id,
                                "desc" : result.desc,
                                "due" : result.due,
                                "who" : result.who,
                                "done" : result.done
                            })
                            .then(resp => {
                                axios.get("http://localhost:3000/tasks?_sort=due")
                            .then(response => {
                                var tasks = response.data
                                var idTarefa = tasks.length + 1

                                axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                                    var users = resp.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.mainPage(idTarefa,users,tasks,d))
                                    res.end()
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                    res.end()
                                })
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                            }).catch(error => {
                                console.log('Erro: ' + error);
                        })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                //POST /tasks/edit/:id
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/tasks/'+ result.id, result)
                                    .then(resp => {
                                        axios.get("http://localhost:3000/tasks?_sort=due")
                            .then(response => {
                                var tasks = response.data
                                var idTarefa = tasks.length + 1

                                axios.get("http://localhost:3000/users?_sort=id").then(resp => {
                                    var users = resp.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.mainPage(idTarefa,users,tasks,d))
                                    res.end()
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de utilizadores... Erro: " + erro)
                                    res.end()
                                })
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                                    }).catch(error => {
                                        console.log('Erro: ' + error);
                                    })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

tarefasServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



