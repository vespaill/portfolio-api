const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('config');
const dbURI = config.get('dbURI');

const projectSchema = new mongoose.Schema({
  created: Date,
  title: String,
  href: String,
  tags: [String],
  data: Buffer
});
const Project = mongoose.model('Project', projectSchema, 'projects');
const Tutorial = mongoose.model('Project', projectSchema, 'tutorials');

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${dbURI}...`))
  .catch(err => console.log(`Could not connect to MongoDB...`, err));

app.use(express.json());
app.use(cors());

app.get('/api/projects', async (req, res) => {
  const project = await Project.find({});
  res.send(project);
});

app.get('/api/tutorials', async (req, res) => {
  const tutorialProj = await Tutorial.find({});
  res.send(tutorialProj);
});

const port = process.env.PORT || config.get('port');
app.listen(port, () => console.log(`Listening on port ${port}...`));
