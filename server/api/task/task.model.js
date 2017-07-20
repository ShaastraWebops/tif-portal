'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import User from '../user/user.model';
import mongoose, {Schema} from 'mongoose';


var TaskSchema = new Schema({
  title: String,
  description: String,
  deadline: {
    month: String,
    day: Number,
    year: Number
  },
  points: Number,
  files: [String],
  pending:[
  {type: Schema.Types.ObjectId, ref: 'User'
  }
   ],
  approved:[
  {type: Schema.Types.ObjectId, ref: 'User'
  }
   ],
  rejected:[
  {type: Schema.Types.ObjectId, ref: 'User'
  }
   ]
});

/**
 * Virtuals
 */

// Public profile information

export default mongoose.model('Task', TaskSchema);
