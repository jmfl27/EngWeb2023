var express = require('express');
var router = express.Router();
var Data = require('../controllers/data')

// GET home page
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.tasksList()
    .then(tasks => {
      var idTask = tasks.length + 1
      Data.usersList()
      .then(users => {
        res.render('mainPage', { tarefas: tasks, tID : idTask, utilizadores : users, d: data });
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro na obtenção da lista de utilizadores"})
      })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tarefas"})
    })
});

// GET User Form
router.get('/users/create', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.usersList()
  .then(users => {
    var id = users.length + 1
    res.render('userForm', {d : data, idUser : id});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na obtenção da lista de utilizadores"})
  })
});

// GET Task Edit Form
router.get('/tasks/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.getTask(req.params.idTask)
    .then(task => {
      Data.usersList()
      .then(users => {
        res.render('tarefaFormEdit', { tarefa: task, utilizadores : users, d: data });
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro na obtenção da lista de utilizadores"})
      })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tarefas"})
    })
});

//GET Task delete
router.get('/tasks/delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.deleteTask(req.params.idTask)
    .then(task => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa"})
    })
});

//GET Task done
router.get('/tasks/done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.getTask(req.params.idTask)
    .then(task => {
      task.done = "true"
      Data.updateTask(task)
      .then(users => {
        res.redirect('/');
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro no armazenamento do registo de tarefa"})
      })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa"})
    })
});

// POST User
router.post('/users/create', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.addUser(req.body)
    .then(user => {
      res.redirect('/');
    }).catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de utlizador"})
    })
});

// POST Task
router.post('/tasks/create', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.addTask(req.body)
    .then(task => {
      res.redirect('/');
    }).catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de tarefa"})
    })
});

// POST Task update
router.post('/tasks/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Data.updateTask(req.body)
    .then(tawsk => {
      res.redirect('/');
    }).catch(erro => {
      res.render('error', {error: erro, message: "Erro na atualização do registo de aluno"})
    })
});

module.exports = router;
