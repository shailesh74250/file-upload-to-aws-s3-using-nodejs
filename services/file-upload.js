const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
const config = require('../config');

aws.config.update({
  secretAccessKey: config.SECRET,
  accessKeyId: config.KEY,
  region: 'ap-south-1',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png',
    file.mimetype === 'mp4')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

// but using below commented code only image can be uploaded

// const upload = multer({
//   fileFilter,
//   storage: multerS3({
//     s3,
//     bucket: 'file-upload-using-nodejs',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: 'TESTING_META_DATA!' });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

// images, videos files can be uploaded
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'file-upload-using-nodejs',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA!' });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
