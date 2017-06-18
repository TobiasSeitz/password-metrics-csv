/**
 * Created by Tobi on 17.06.17.
 */


let Analyzer = require('../lib/Analyzer');




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


testAnalyzer(Analyzer.LANGUAGES.german);