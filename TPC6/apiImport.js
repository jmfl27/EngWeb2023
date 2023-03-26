var axios = require('axios')

const data = require('./dataset-extra1.json')

for(p in data['pessoas']){
    axios.post('http://localhost:3000/pessoas', data['pessoas'][p])
        .then(res => console.log(res.data))
        .catch(err => console.log("ERROR: " + err));
}