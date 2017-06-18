/**
 * Created by Tobi on 16.06.17.
 */

let fs = require('fs');
let path = require('path');
let zxcvbn = require('../util/mini-zxcvbn');
let Util = require('../util/util');
let de; // german dictionary, not necessary at start-up.


/**
 * @param anything
 * @returns {String} anything in "string quotes"
 */
function inQuote(anything) {
  return '"' + anything + '"';
}


String.prototype.inQuote = function() {
  return inQuote(this);
};

Number.prototype.inQuote = function() {
  return inQuote(this);
};


class Analyzer {

  static get LANGUAGES() {
    return {
      english: 'en',
      german: 'de'
    }
  }

  /**
   * column names of the CSV file
   * if the analysis objects were flattened, they might slightly differ, so intersection is needed.
   * @return {Array}
   */
  get colnames() {
    return this._colnames;
  }

  /**
   * set the column names of the CSV file.
   * @param {Array} x
   */
  set colnames(x) {
    this._colnames = x;
  }

  /**
   * @return {string|String} the currently set language / dictionary
   */
  get lang() {
    return this._lang;
  }

  /**
   * sets the (additional) language/dictionary to use with the analysis.
   * @param {string|String} l language code as in Analyzer.LANGUAGES
   */
  set lang(l) {
    let availableLanguages = Object.values(Analyzer.LANGUAGES);
    // only update the language if it's actually available.
    if (availableLanguages.indexOf(l) !== -1) {
      this._lang = l;
    } else {
      this._lang = Analyzer.LANGUAGES.english;
    }
  }

  /**
   *
   * @param {Array} [passwords] to analyze
   * @param {String} [lang]
   */
  constructor(passwords = [], lang = Analyzer.LANGUAGES.english) {
    this._analysis = [];
    this._passwords = passwords;
    this._separator = ',';
    this.lang = lang; // use the setter to ensure this language is available.
    this._update();
  }

  /**
   * updates the internal model.
   *
   * @private
   */
  _update() {
    if (this.lang === Analyzer.LANGUAGES.german) {
      de = require('../dictionaries/german.json');
    }
    this.analyze()
  }

  /**
   * fills the _analysis array with objects containing minimal zxcvbn results
   * overwrites this._analysis completely if this._passwords have a length greater than 0
   * @param {Array }[customWords]
   * @private
   */
  _populateAnalysis(customWords = []) {
    if (this._passwords && this._passwords.length) {
      this._analysis = this._passwords.map(pw => {
        let analysis = zxcvbn(pw, customWords);
        Util.flattenObject(analysis);
        return analysis;
      });
    }
  }

  /**
   * public method to run the analysis
   * using the language that was passed to the constructor.
   *
   * @returns Array containing the analysis data
   */
  analyze() {
    this._populateAnalysis(this.lang === Analyzer.LANGUAGES.german && de.length ? de : []);
    return this._analysis;
  }


  /**
   * creates a string in CSV format from the current analysis.
   * @return {string}
   */
  makeCSVString() {
    let rows = [];
    if (this._analysis.length > 0) {

      this.colnames = Object.keys(this._analysis[0]);
      // 1. let's find out the columns that all objects in the analysis have in common.
      this._analysis.forEach((result) => {
        this.colnames = Util.intersectArrays(this.colnames, Object.keys(result));
      });

      // 2. put the column names as the first row.
      rows.push(this.colnames);

      // 3. create rows for all analysis objects using only the shared columns.
      this._analysis.forEach((item) => {
        let row = this.colnames.map((name) => {
          // if the value is not a number, we have to put it into string quotes.
          return typeof item[name] === 'number' ? item[name] : '"' + item[name] + '"';
        });
        rows.push(row.join(this._separator));
      });
    }
    // 4. return the rows by joining them with newlines.
    return rows.join('\n')
  }

  /**
   * Generates a file containing the analysis.
   * @param [fileName]
   * @param [callback]
   */
  writeCSVFile(fileName = 'pw-analysis.csv', callback) {
    let niceCSVString = this.makeCSVString();
    callback = callback || function(err) {
        if (err) {
          console.error('Failed to write the csv file:  ' + fileName);
        } else {
          console.log('File ' + fileName + ' has been created!');
        }
      };
    fs.writeFile(fileName, niceCSVString, callback);
  }

  /**
   * reads a file that contains passwords
   * Each password has to be on a separate line.
   * @param fileName
   * @return {Array}
   */
  static _readPasswordFromFile(fileName) {
    let passwords = [];

    try {
      let buffer = fs.readFileSync(fileName); // can throw errors!
      let raw = buffer.toString();
      let separator = '\n';
      passwords = raw.split(separator);

      if (passwords && passwords instanceof Array) {

      } else {
        passwords = [];
      }
    } catch (e) {
      console.warn(e);
    }
    return passwords;
  }

  /**
   * analyzes the given file and updates the internal model.
   *
   * @param fileName
   * @return {Array} of the analyzed objects.
   */
  analyzePasswordsInFile(fileName) {
    this._passwords = Analyzer._readPasswordFromFile(fileName);
    // update the analysis afterwards.
    this._update();
    return this._analysis;
  }
}

module.exports = Analyzer;