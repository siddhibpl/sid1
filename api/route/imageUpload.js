var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/uploadCompanyLogo', function(req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // get file name
  var photo = getTimeForPhotoName();
  console.log("photo>>>>", photo);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.company;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('web/img/logo/company/' + photo, function(err) {
    if (err) {
      return next(err);
    } else {
      return res.json({
        "resCode": "OK",
        "results": "Upload successfully!"
      });
    }
  });
});

router.post('/uploadCollegeLogo', function(req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // get file name
  var photo = getTimeForPhotoName();
  console.log("photo>>>>", photo);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.college;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('web/img/logo/college/' + photo, function(err) {
    if (err) {
      return next(err);
    } else {
      return res.json({
        "resCode": "OK",
        "results": "Upload successfully!"
      });
    }
  });
});

function getTimeForPhotoName() {
  var d = new Date();
  var getSec = d.getSeconds();
  var getMin = d.getMinutes();
  var getHor = d.getHours();
  var photoName = 'photo' + getHor + '_' + getMin + '_' + getSec + '.png';
  console.log(photoName);
  return photoName
}

module.exports = router;
