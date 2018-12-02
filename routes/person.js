const express  = require('express');
const bodyParser = require('body-parser');

const personRouter = express.Router();
personRouter.use(bodyParser.json());

const Persons = require('../models/person');

personRouter.route('/')
.get((req, res, next) => {
    Persons.find({})
    .then((persons) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(persons);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) =>
{
    Persons.create(req.body)
    .then((person) => {
        console.log('person created');
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(person);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = personRouter;