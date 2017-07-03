'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me','user_birthday'],
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie);

/*  .get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect: '/login'}))
  .get('/auth/facebook',passport.authenticate('facebook',{scope: 'email'})); */


export default router;
