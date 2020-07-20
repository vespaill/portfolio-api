const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('config');
const dbURI = config.get('dbURI');

const projectSchema = new mongoose.Schema({
  title: String,
  href: String,
  tags: [String],
  length: Number,
  data: Buffer
});

const Project = mongoose.model('Project', projectSchema, 'projects');

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${dbURI}...`))
  .catch(err => console.log(`Could not connect to MongoDB {${dbURI}} ...`, err));

app.use(express.json());
app.use(cors());
app.get('/api/projects', async (req, res) => {
  const project = await Project.find({}).select('-data');
  res.send(project);
});

const port = process.env.PORT || config.get('port');
app.listen(port, () => console.log(`Listening on port ${port}...`));
