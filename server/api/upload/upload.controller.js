'use strict';

import jsonpatch from 'fast-json-patch';
import multer from 'multer';

var saveWithName = "Noname";
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'client/assets/uploads')
  },
  filename: function(req, file, cb) {

    saveWithName = file.fieldname + '-' + Date.now() + "." + file.originalname.split('.').pop();
    cb(null, saveWithName)
  }
});

var upload = multer({storage: storage}).single('uploadedFile');

export function uploadFile(req, res) {

  upload(req, res, err => {

    if (err) {

      return res.json({success: false,  msg: "Error while uploading file", name: 'no file was uploaded'});
    }
    res.json({success: true, msg: "File Uploaded!", name: saveWithName});
    console.log(req.files);
  });
}
