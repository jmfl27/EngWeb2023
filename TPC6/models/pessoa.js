var mongoose = require('mongoose')

var moradaSchema = new mongoose.Schema({
    cidade: String,
    distrito: String,
    _id: String
})

var partidoPoliticoSchema = new mongoose.Schema({
    party_abbr: String,
    party_name : String,
    _id: String
})

var atributosSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animias_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String,
    _id : String
})

var pessoaSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: {
        type: moradaSchema,
        required: false
    },
    BI: String,
    CC: String,
    profissao: String,
    partido_politico: {
        type: partidoPoliticoSchema,
        required: false
    },
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: {
        type: atributosSchema,
        required: false
    },
    _id: String
})

module.exports = mongoose.model('pessoa', pessoaSchema)