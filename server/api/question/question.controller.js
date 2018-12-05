'use strict';

import Question from './question.model';


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

export function aq(req, res) {
  Question.find().exec().then(res1 => {
    var count = res1.length;
    req.body._id = count;
    var newQuestion = new Question(req.body);
    newQuestion.save();
    res.status(200).send();
  });
}

export function questions(req, res) {
  Question.find({}, function(err, questions) {
    var questionMap = [];
    var index = 0;
    questions.forEach(function(question) {
      questionMap[index] = question;
      index++;
    });

    res.send(questionMap);
  });
}

export function addAnswer(req, res) {
  Question.findByIdAndUpdate(req.params.id, { $push: {"answer": req.body }}, {"new":true,"upsert":true}).exec()
    .then(res1 => {
      res.status(200).send();
    })
    .catch(handleError(res));
}

export function getAskedQuestions(req, res){
    Question.find({userId: req.params.id},(err, questions)=>{
      res.send(questions);
    });
}

export function destroy(req, res) {
  return Question.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

export function destroyAnswer(req, res) {
  Question.findById(req.params.qIdx,(err, question)=>{
    var answer = question.answer;
    answer.splice(req.params.ansIdx,  1);
    Question.findByIdAndUpdate(req.params.qIdx, {"answer": answer }, {"new":true,"upsert":true}).exec()
      .then(res1 => {
        res.send(answer);
      })
      .catch(handleError(res));
  });
}
