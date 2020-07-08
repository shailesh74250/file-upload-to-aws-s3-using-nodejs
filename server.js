const express = require('express'),
  app = express(),
  fileRoutes = require('./routes/file-upload');

app.use('/api/v1/', fileRoutes);

const PORT = process.env.PORT || '3001';

app.listen(PORT, function () {
  console.log('Node server started on port ' + PORT);
});
