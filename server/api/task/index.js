'use strict';

import {Router} from 'express';
import * as controller from './task.controller';
import * as auth from '../../auth/auth.service';


var router = new Router();

router.post('/create', auth.hasRole('admin'), controller.create);
router.get('/getusers/:id', auth.hasRole('admin'), controller.getusers);
router.get('/gettasks', auth.isAuthenticated(), controller.gettasks);
router.put('/apply/:id', auth.isAuthenticated(), controller.apply);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/approve/:id', auth.hasRole('admin'), controller.approve);
router.put('/reject/:id', auth.hasRole('admin'), controller.reject);

module.exports = router;
