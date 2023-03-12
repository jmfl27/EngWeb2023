exports.formTarefas = function(idTarefa,users){
    var pagHTML = `
    <div class="w3-container w3-cell">
        <form class="w3-container w3-card-4 w3-red" method="POST">
            <input type="hidden" name="id" value=${idTarefa}>

            <h2>Adicionar Tarefa</h2>
            <p>Insira os dados da nova tarefa que pretende criar</p>

            <p><label>Qual a data limite?</label>
            <input class="w3-input w3-border" type="date" name="due">
            
            <p><label>Quem a irá realizar?</label>
            <select class="w3-select" name="who">
            <option value="" disabled selected>Escolha uma pessoa...</option>
        `
    for(let i = 0; i<users.length;i++){
        pagHTML += `
        <option class="w3-center">${users[i].name}</option>
        `
    }

    pagHTML +=   `
            </select>
        
            <p><label>Descrição da tarefa</label>
            <input class="w3-input w3-border" name="desc" type="text"></p>

            <input type="hidden" name="done" value=false>

            <button class="w3-btn w3-purple w3-mb-2" type="submit">Enviar</button>
        </form>
    </div>    
    `
}

exports.tarefasListPage = function(tarefas){
    var pagHTML = `
        <div class="w3-container w3-cell" style="width:50%">
            <h2>Tarefas por fazer:</h2>
    `

    for(let i = 0; i < tarefas.length; i++){
        if(tarefas[i].done == false){
            pagHTML += `
            <div class="w3-container">
                <p class="w3 right-align">
                [<a href="/tasks/edit/${tarefas[i].id}"><b>Editar</b></a>][<a href="/tasks/delete/${tarefas[i].id}"><b>Apagar</b></a>][<a href="/tasks/done/${tarefas[i].id}"><b>Feito</b></a>]
                </p>
                <p><b>Descrição:</b> ${tarefas[i].desc}</p>
                <p><b>Reponsável:</b> ${tarefas[i].who}</p>
                <p><b>Data Limite:</b> ${tarefas[i].due}</p>
            </div>
        `
        }
    }

    pagHTML += `
        </div>
        <div class="w3-container w3-cell" style="width:50%">
            <h2>Tarefas feitas:</h2>
    `

    for(let i = 0; i < tarefas.length; i++){
        if(tarefas[i].done == true){
            pagHTML += `
            <div class="w3-container">
                <p class="w3 right-align">
                <a href="/tasks/delete/${tarefas[i].id}"><b>Apagar</b></a>
                </p>
                <p><b>Descrição:</b> ${tarefas[i].desc}</p>
                <p><b>Reponsável:</b> ${tarefas[i].who}</p>
                <p><b>Data Limite:</b> ${tarefas[i].due}</p>
            </div>
        `
        }
    }

    pagHTML += `
        </div>
    `
} 

exports.mainPage = function(idTarefa,users,tarefas,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Lista de Tarefas</title>
        </head>

        <body>
            <header class="w3-container w3-red">
                <h1>TPC 4 - Lista de Tarefas</h1>
            </header>

        <div class="w3-container w3-cell w3-green">
            <a href="/user/create" class="w3-btn w3-purple">Adicionar utilizador</a>    
        </div>

        <div class="w3-container w3-cell">
            <form class="w3-container w3-card-4 w3-blue" method="POST">
            <fieldset>
                <legend>Tarefa</legend>
                <input type="hidden" name="id" value=${idTarefa}>

                <h2>Adicionar Tarefa</h2>
                <p>Insira os dados da nova tarefa que pretende criar</p>

                <p><label>Descrição da tarefa</label>
                <input class="w3-input w3-border" name="desc" type="text"></p>

                <p><label>Qual a data limite?</label>
                <input class="w3-input w3-border" type="date" name="due">
                
                <p><label>Quem a irá realizar?</label>
                <select class="w3-select" name="who">
                    <option value="" disabled selected>Escolha uma pessoa...</option>
        `
    for(let i = 0; i<users.length;i++){
        pagHTML += `
                    <option class="w3-center">${users[i].name}</option>
        `
    }

    pagHTML +=   `
                </select>

                <input type="hidden" name="done" value=false>
                </fieldset>  

                <button class="w3-btn w3-green w3-mb-2" type="submit">Enviar</button>
            </form>
        </div>



        <div class="w3-container w3-cell" style="width:50%">
            <h2>Tarefas por fazer:</h2>
`

for(let i = 0; i < tarefas.length; i++){
    if(tarefas[i].done == false){
        pagHTML += `
            <div class="w3-container">
                <p class="w3 right-align">
                [<a href="/tasks/edit/${tarefas[i].id}"><b>Editar</b></a>][<a href="/tasks/delete/${tarefas[i].id}"><b>Apagar</b></a>][<a href="/tasks/done/${tarefas[i].id}"><b>Feito</b></a>]
                </p>
                <p><b>Descrição:</b> ${tarefas[i].desc}</p>
                <p><b>Reponsável:</b> ${tarefas[i].who}</p>
                <p><b>Data Limite:</b> ${tarefas[i].due}</p>
            </div>
    `
    }
}

pagHTML += `
        </div>

        <div class="w3-container w3-cell" style="width:50%">
            <h2>Tarefas feitas:</h2>
`

for(let i = 0; i < tarefas.length; i++){
    if(tarefas[i].done == true){
        pagHTML += `
            <div class="w3-container">
                <p class="w3 right-align">
                <a href="/tasks/delete/${tarefas[i].id}"><b>Apagar</b></a>
                </p>
                <p><b>Descrição:</b> ${tarefas[i].desc}</p>
                <p><b>Reponsável:</b> ${tarefas[i].who}</p>
                <p><b>Data Limite:</b> ${tarefas[i].due}</p>
            </div>
    `
    }
}

pagHTML += `
        </div>

        <footer class="w3-container w3-blue">
                    <h5>João Loureiro - a97257 | Engenharia Web 2023 - Universidade do Minho</h5>
                    <h5>Generated by server: ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
`

return pagHTML
}

exports.userFormPage = function(idUser,data){
   var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
                <title>Adicionar Utilizador</title>
            </head>

            <body>
            <div class="w3-card-4">
                <header class="w3-container w3-red">
                    <h2>Formulário de Novo Utilizador</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Utilizador</legend>
                        <input type="hidden" name="id" value=${idUser}>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="name"/>
                        <label>Username</label>
                        <input class="w3-input w3-round" type="text" name="usrnm"/>
                    </fieldset>

                    <button class="w3-btn w3-green w3-mb-2" type="submit">Registar</button>

                </form>

                    <footer class="w3-container w3-blue">
                    <h5>João Loureiro - a97257 | Engenharia Web 2023 - Universidade do Minho</h5>
                    <h5>Generated by server: ${data}</h5>
                    </footer>
            </div>
            </body>
        </html>

            `
}

// -----------------------------------------------------------------------------------------

exports.studentsListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Students List
                    <a class="w3-btn w3-round w3-grey" href="/alunos/registo">+</a>
                    </h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Name</th><th>GitLink</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/alunos/${slist[i].id}">
                            ${slist[i].nome}
                        </a>
                    </td>
                    <td>${slist[i].gitlink}</td>
                    <td>
                        [<a href="/alunos/edit/${slist[i].id}">Edit</a>][<a href="/alunos/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by RPCW2023 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.studentFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Student Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Git</label>
                        <input class="w3-input w3-round" type="text" name="gitlink"/>
                    </fieldset>

                    <fieldset>
                        <legend>TPC</legend>
                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC1</label>
                        <input class="w3-check" type="checkbox" name="tpc2" value="1"/>
                        <label>TPC2</label>
                        <input class="w3-check" type="checkbox" name="tpc3" value="1"/>
                        <label>TPC3</label>
                        <input class="w3-check" type="checkbox" name="tpc4" value="1"/>
                        <label>TPC4</label>
                        <input class="w3-check" type="checkbox" name="tpc5" value="1"/>
                        <label>TPC5</label>
                        <input class="w3-check" type="checkbox" name="tpc6" value="1"/>
                        <label>TPC6</label>
                        <input class="w3-check" type="checkbox" name="tpc7" value="1"/>
                        <label>TPC7</label>
                        <input class="w3-check" type="checkbox" name="tpc8" value="1"/>
                        <label>TPC8</label>
                    </fieldset>  
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

// ---------------Student's Page--------------------------------
// Change and adapt to current dataset...
exports.studentPage = function( aluno, d ){
    var pagHTML =  `
    <html>
    <head>
        <title>Aluno: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${aluno.nome}</li>
                    <li><b>Número: </b> ${aluno.id}</li>
                    <li><b>Git (link): </b> <a href="${aluno.gitlink}">${aluno.gitlink}</a></li>
                </ul>
            </div>

            <div class="w3-container w3-margin-8">
                <ul class="w3-ul">
            `
    
        for (let i = 1;i<9;i++){
            key = `tpc${i}`
            if (key in aluno){
                        pagHTML += `
                        <li><b>TPC${i}</b></li>
                   `
            }
        }       

    pagHTML +=    `
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

exports.studentFormEditPage = function(aluno,d){
    var pagHTML =`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Student Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${aluno.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${aluno.nome}"/>
                        <label>Git</label>
                        <input class="w3-input w3-round" type="text" name="gitlink" value="${aluno.gitlink}"/>
                    </fieldset>

                    <fieldset>
                        <legend>TPC</legend>
                        `

    for (let i = 1;i<9;i++){
        key = `tpc${i}`
        if (key in aluno){
            pagHTML += `
                        <input class="w3-check" type="checkbox" name="tpc${i}" value="1" checked/>
                        <label>TPC${i}</label>
           `
        }
        else {
            pagHTML += `
                        <input class="w3-check" type="checkbox" name="tpc${i}" value="1"/>
                        <label>TPC${i}</label>
        
        `
        }
    }

    pagHTML +=       `  </fieldset>  
                        <br/>
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                    </form>

                    <footer class="w3-container w3-purple">
                        <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                    </footer>
                
                </div>
            `

    return pagHTML
}