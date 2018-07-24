'use strict';

import { Router } from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
import * as teamCtrl from '../team/team.controller.js';

var router = new Router();

router.get('/', controller.index);
router.get('/checkUser/:email', controller.checkUser);
router.get('/getTeam/:teamName', teamCtrl.getTeam);
router.get('/list', auth.hasRole('admin'), controller.list);
router.get('/export', auth.hasRole('admin'), controller.exp);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/submit/:state', auth.isAuthenticated(), teamCtrl.teamsubmit);
router.put('/selected/:id', auth.hasRole('admin'), controller.select);
router.put('/update', auth.isAuthenticated(), controller.upsert);
router.put('/rejected/:id', auth.hasRole('admin'), controller.reject);
router.post('/', controller.create);
router.post('/forgotpass', controller.forgotPassword);
router.post('/resetpass/:email/:token', controller.resetPassword);
module.exports = router;
