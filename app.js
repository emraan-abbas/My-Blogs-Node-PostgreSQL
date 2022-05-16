const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes/index.routes');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Calling Sequelize Here
// let main = async () => {
//   await sequelize.sync({ force: true }) // FORCE here working as an ALTER command, except it works and ALTER does not
// };

// main();

// Defining Routes Here
app.use('/myblog', routes);

// Defining Port and Setting Up Server
const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`My Blog Application is UP on Port: ${PORT}`);
  // await sequelize.sync({ force: true })
  await sequelize.sync()
  console.log('Database Synced !')
});

