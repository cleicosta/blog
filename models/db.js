const Sequelize = require("sequelize");

//conexão com banco de dados
const sequelize = new Sequelize("postagem","root","password",{
    host:"localhost",
    dialect:"mysql"
});

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}