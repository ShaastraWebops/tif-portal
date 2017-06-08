'use strict';

import {Router} from 'express';
import * as controller from './upload.controller';
import * as auth from '../../auth/auth.service';


var router = new Router();

router.post('/', auth.isAuthenticated(), controller.uploadFile);

module.exports = router;
