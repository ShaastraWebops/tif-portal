'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

var QuestionSchema = new Schema({
  _id: String,
  userId: String,
  name: String,
  email: {
    type: String,
    lowercase: true,
  },
  heading: String,
  body: String,
  answer: [{
    date: { type: Date, default: Date.now()},
    _id: String,
    body: String,
    name: String,
    email: String,
  }],
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  date: { type : Date, default: Date.now },
});

export default mongoose.model('Question', QuestionSchema);
