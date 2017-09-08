/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/citys              ->  index
 * POST    /api/citys              ->  create
 * GET     /api/citys/:id          ->  show
 * PUT     /api/citys/:id          ->  upsert
 * PATCH   /api/citys/:id          ->  patch
 * DELETE  /api/citys/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import City from './city.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Citys
export function index(req, res) {
  return City.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single City from the DB
export function show(req, res) {
  return City.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new City in the DB
export function create(req, res) {
  return City.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given City in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  
  if(req.body.workshops.length==1){
    req.body.workshops[0].count = req.body.workshops[0].count + 1;
  }
  else if(req.body.workshops.length==2){
    req.body.workshops[0].count = req.body.workshops[0].count + 1;
    req.body.workshops[1].count = req.body.workshops[1].count + 1;
  }
  else if(req.body.workshops.length==3){
    req.body.workshops[0].count = req.body.workshops[0].count + 1;
    req.body.workshops[1].count = req.body.workshops[1].count + 1;
    req.body.workshops[2].count = req.body.workshops[2].count + 1;
  }

  return City.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing City in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return City.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a City from the DB
export function destroy(req, res) {
  return City.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
