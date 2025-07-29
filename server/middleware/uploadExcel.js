const multer = require('multer');
const path = require('path');

// Set storage engine for Excel files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter for Excel files only
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.xlsx' || ext === '.xls') {
    cb(null, true);
  } else {
    cb(new Error('Only Excel files are allowed (.xlsx, .xls)'), false);
  }
};

const uploadExcelFile = multer({ storage, fileFilter });

module.exports = uploadExcelFile;
