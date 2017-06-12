'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';


var router = new Router();

router.get('/', controller.index);
router.get('/list', auth.hasRole('admin'), controller.list);
router.get('/export', auth.hasRole('admin'), controller.exp);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/submit', auth.isAuthenticated(), controller.submit);
router.post('/', controller.create);

module.exports = router;
