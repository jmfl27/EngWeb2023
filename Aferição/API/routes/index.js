var express = require('express');
var router = express.Router();
var EMD = require('../controllers/emd')

/* GET home page. */
/*
router.get('/EMDs', function(req, res, next) {
  EMD.list()
    .then(dados => res.json(dados))
    .catch(erro => res.status(601).json({erro : erro}))
});

router.get('/EMDs/:id', function(req, res, next) {
  EMD.getEMD(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});
*/

// API: 1
router.get('/api/emd', function(req, res, next) {
  EMD.getEMDList()
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});

// API: 2
router.get('/api/emd/:id', function(req, res, next) {
  EMD.getEMD(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});

// API: 3
router.get('/api/modalidades', function(req, res, next) {
  EMD.getModalidades()
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});

// API: 4
router.get('/api/emd?res=OK', function(req, res, next) {
  EMD.getAprovados()
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});

// API: 5
router.get('/api/emd?modalidade=:modal', function(req, res, next) {
  EMD.getXModalidade(req.params.modal)
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});

// API: 6
router.get('/api/atletas?gen=F', function(req, res, next) {
  EMD.getFemininos()
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});

// API: 7
router.get('/api/emd?modalidade=:clube', function(req, res, next) {
  EMD.getXClube(req.params.clube)
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).json({erro : erro}))
});

/*

router.post('/EMDs', (req,res) => {
  EMD.addEMD(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(603).json({erro : erro}))
})

router.put('/EMDs/:id', (req,res) => {
  EMD.updateEMD(req.body)
    .then(dados => res.json(dados))
    .catch(erro => res.status(604).json({erro : erro}))
})

router.delete('/EMDs/:id', (req,res) => {
  EMD.deleteEMD(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.json({erro : erro}))
})
*/

module.exports = router;
