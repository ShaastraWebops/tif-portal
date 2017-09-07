'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './city.events';

var CitySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(CitySchema);
export default mongoose.model('City', CitySchema);
