const express = require('express');
const mongoose = require('mongoose');
const Leader = require('../models/leaders');
const authenticate = require('../authenticate');

const leaderRouter = express.Router();

leaderRouter.route('/')
  .get((req, res, next) => {
    Leader.find()
      .then(leaders => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Leader.create(req.body)
      .then(leader => {
        console.log('Leader created:', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch(err => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Leader.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

leaderRouter.route('/:leaderId')
  .get((req, res, next) => {
    Leader.findById(req.params.leaderId)
      .then(leader => {
        if (leader) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        } else {
          const err = new Error(`Leader ${req.params.leaderId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Leader.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, { new: true })
      .then(leader => {
        if (leader) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        } else {
          const err = new Error(`Leader ${req.params.leaderId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Leader.findByIdAndDelete(req.params.leaderId)
      .then(response => {
        if (response) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          const err = new Error(`Leader ${req.params.leaderId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  });

module.exports = leaderRouter;