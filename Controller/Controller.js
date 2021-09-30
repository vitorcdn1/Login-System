const mongodb = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    Register(req, res) {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        let error = {
            error: '',
            registered: false
        }

        for (usuario in user) {
            if (user[usuario] == '') {                              // Caso Esteja vazio irá enviar uma mensagem.
                error.error = `Erro o campo ${usuario} está vazio !!!`
                break
            }
        }

        if (error.error == '' && user.password.length < 6) {        // Se o tamanho da senha for menor que 6
            error.error = `Erro a senha e menor do que 6 !!!`
        }

        /* Se o usuario ja existe no banco de dados */

        mongodb.connect(url, (erro, db) => {
            let dbo = db.db('users')

            dbo.collection('users').find({}).toArray((erro, result) => {
                for (usuario in result) {

                    if (result[usuario].username == user.username) {
                        error.error = 'Erro o usuario já existe'
                        break;
                    }
                    if (result[usuario].email == user.email) {
                        error.error = 'Erro o email já existe'
                        break
                    }
                }

                if (error.error == "") {                // Se não tiver nenhum erro com os dados, ele e adicionado

                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))

                    dbo.collection('users').insertOne(user, (err, result) => {
                        error.registered = "true"
                        res.send(error)
                    })
                } else {
                    res.send(error)
                }
            })
        })

    },

    Login(req, res){
        
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        mongodb.connect(url, (error, db) => {
            let dbo = db.db('users')

            dbo.collection('users').findOne({username: user.username}, (error, result) => {
                
                if (result) {       // Caso Exista um usuario
                    if (result.username == user.username && bcrypt.compareSync(user.password, result.password)) {
                        let token = jwt.sign({username: result.username, email: result.email}, process.env.SECRET)
                        res.send(token)
                    } else {
                        res.send(false)
                    }
                } else {
                    res.send(false)
                }
            })
        })
    }
}