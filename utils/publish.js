const ghpages = require('gh-pages');
const path = require('path');

const buildDir = path.resolve(__dirname, '../build');

ghpages.publish(buildDir, (error) => {
  if (error) {
    console.log('Error!', error);
  } else {
    console.log('Successfully puplished to gh-pages');
  }
});
