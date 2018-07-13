'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, { Schema } from 'mongoose';


var TeamSchema = new Schema({
  teamname: String,
  teammates: {
    mem1_name: String,
    mem1_email: String,
    mem1_phno: Number,
    mem2_name: String,
    mem2_email: String,
    mem2_phno: Number,
    mem3_name: String,
    mem3_email: String,
    mem3_phno: Number,
    mem4_name: String,
    mem4_email: String,
    mem4_phno: Number,
  },
  projname: { type: String },
  vertical: String,
  projdetails: String,
  projlink: String,
  questions: {
    what: String,
    howbetter: String,
    past: String
  },
  points: { type: Number, default: 0 }
});

export default mongoose.model('Team', TeamSchema);
