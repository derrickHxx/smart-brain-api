const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.

//This is Derrick's API key

//Just for study purpose so I am not hiding it via dotenv
const app = new Clarifai.App({
 apiKey: '89089bce7c9645be8b57183752125754'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}