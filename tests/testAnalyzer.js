/**
 * Created by Tobi on 17.06.17.
 */

let Analyzer = require('../lib/Analyzer');

let path = require('path');


function testAnalyzer(lang = 'en') {
  let testPasswords = [
    'Bier',
    'Buch',
    'Münchn3r',
    'b@nana.boy',
    'password1',
  ];
  let test = new Analyzer(testPasswords, lang
  );

  console.log(test.makeCSVString());
}

function testFileAnalysis() {
  console.log('starting test.' );
  let passwordFileName = 'passwords.txt';
  let analyzer = new Analyzer();

  analyzer.lang = Analyzer.LANGUAGES.german;
  analyzer.analyzePasswordsInFile(path.join(__dirname,passwordFileName));

  console.log(analyzer.makeCSVString());
}


// testAnalyzer(Analyzer.LANGUAGES.german);
testFileAnalysis();
