#!/usr/bin/env node
/**
 * Created by Tobi on 18.06.17.
 */

let fs = require('fs');
let program = require('commander');
let Analyzer = require('../index');
let pckg = require('../package.json');

console.log('\n################ PASSWORD ANALYSIS ################\n');

program
  .version(pckg.version)
  .arguments('<file>')
  .option('-l, --language [language]', 'additional language to load', 'en')
  .option('-o, --output-path [output]', 'path to write the .csv file containing the analysis.', 'pw-analysis.csv')
  .action(function(file) {
    if (file && fs.existsSync(file)) {
      let myAnalyzer = new Analyzer();
      myAnalyzer.lang = program.language || 'en';
      myAnalyzer.analyzePasswordsInFile(file);
      myAnalyzer.writeCSVFile(program.outputPath);
    } else {
      console.log('File "' + file + '" does not exist. Is the path correct? ');
    }
  })
  .parse(process.argv);

if(!process.argv.slice(2).length) {
  program.help();
  return;
}
