import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
    database: "login_system",
    dialect: "mysql",
    username: "root",
    password: "gm7102@L",
    host: "localhost",
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
});

export {sequelize};