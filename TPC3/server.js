var http = require('http')
var axios = require('axios')
var mypages = require('./geraPags')
var fs = require('fs')

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // PAGINA INCIAL
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(mypages.genIndex(d))
        res.end()
    }
    // LISTA DE PESSOAS (ASCENDENTE)
    else if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? -1 : 1
                )
                      
                console.log("Recuperei " + pessoas.length + " registos")       
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genListaPes(pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    // LISTA DE PESSOAS (DESCENDENTE)
    else if(req.url == '/ordDesc'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? 1 : -1
                )
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genListaPes(pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    // PAGINA DE PESSOA EM ESPECIFICO
    else if(req.url.match(/p\d+/)){ // expressao regular de p(int)
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp){
                var pessoa = resp.data
                
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPessoaPage(pessoa, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    // CSS
    else if(req.url.match('/w3.css')){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                res.write("Erro na leitura do ficheiro: " + err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
    // PÁGINA DE DISTRIBUIÇÃO POR SEXO
    else if(req.url == '/sexo'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? 1 : -1
                )
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPagDistSexo(pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    // PÁGINA DE SEXO ESPECÍFICO
    else if(req.url.match(/sexo\/\w+/)){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? -1 : 1
                )
                var sexo = decodeURIComponent(req.url.substring(6).replace(/=/g, "%"))
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPagSexoEscolhido(sexo,pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    // PÁGINA DE DISTRIBUIÇÃO POR DESPORTO
    else if(req.url == '/desporto'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? 1 : -1
                )
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPagDistDesporto(pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    // PÁGINA DE DESPORTO ESPECÍFICO
    else if(req.url.match(/desporto\/\w+/)){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? -1 : 1
                )
                var desporto = decodeURIComponent(req.url.substring(10).replace(/=/g, "%"))
                console.log(desporto)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPagDespEscolhido(desporto,pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    // ERRO
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("<p>ERRO: Operação não suportada...</p>")
    }
    
    
}).listen(7778)

console.log('Servidor à escuta na porta 7778...')

