var mongoose = require('mongoose')

var nomeSchema = new mongoose.Schema({
    primeiro: String,
    último: String,
    _id: String
})

var emdSchema = new mongoose.Schema({
    _id: String,
    index : Number,
    dataEMD: String,
    nome: {
        type: nomeSchema,
        required: false
    },
    idade: Number,
    género: String,
    morada: String,
    modalidade: String,
    clube: String,
    email: String,
    federado: Boolean,
    resultado: Boolean
})

module.exports = mongoose.model('exames', emdSchema)