const fs = require('fs');

fs.mkdir('./pika', function(error) {
  if(error) {
    throw error;
  }
});