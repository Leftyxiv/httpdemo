const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./index');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database...");
  });

const port = 4000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
