
/**
 * Created by Tobi on 18.06.17.
 */

let fs = require('fs');
let Analyzer = require('../index');
let arguments = process.argv;

// https://nodejs.org/docs/latest/api/process.html#process_process_argv
// 0 = program name, 1 = script name, 2 = first actual argument.
let pwFileName = arguments[2];


console.log('\n################ PASSWORD ANALYSIS ################');

if (pwFileName) {
  if(fs.existsSync(pwFileName)) {
    let myAnalyzer = new Analyzer();
    myAnalyzer.lang = arguments[3] ? arguments[3] : 'en';
    myAnalyzer.analyzePasswordsInFile(pwFileName);
    myAnalyzer.writeCSVFile();
  } else {
    console.log('File "'+ pwFileName +'" does not exist. Is the path correct? ');
  }
} else {

  console.log('Incorrect usage. ');
  console.log('Usage: \tnode analyze <pw-filename> [<language>]\n');
  console.log('Arguments:');
  console.log('\tpw-filename: \t\tA text-file that contains one password per line. The passwords should not be in quotes.');
  console.log('\tlanguage: \t\tBase the analysis on a certain language. One of ["en","de"]. Default = "en"');
  console.log('\nOutput will be in pw-analysis.csv\n');
}
