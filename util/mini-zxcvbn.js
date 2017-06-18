/**
 * Created by TbsStz on 19.07.2016.
 */
let zxcvbn = require('zxcvbn');

let lowercaseRegex = /[a-zäöüæœ]/g;
let uppercaseRegex = /[A-ZÄÖÜÆŒ]/g;
let digitsRegex = /[0-9]/g;
let symbolsRegex = /[@'#\.\$;%\^&\+=!"\(\)\*,-\/:<>\?§]/g;

/**
 * this is a wrapper around the zxcvbn password strength estimate function.
 * Its purpose is to strip all plain text passwords and tokens thereof, allowing
 * more ethically acceptable logging of password strength statistics.
 * @param {string} password the password to check
 * @param {Array} customWords additional words to put into the matching routine
 * @param {Boolean} deletePW should the password be deleted
 * @param {Boolean} keepSequence do we return the cracking sequence in the analysis?
 * @returns {*}
 */
let miniZxcvbn = function(password, customWords = [], deletePW = false, keepSequence = false){

  let estimate = zxcvbn(password, customWords);
  let anonymous_sequence = [];
  let uppercaseMatches = password.match(uppercaseRegex);
  let lowercaseMatches = password.match(lowercaseRegex);
  let digits = password.match(digitsRegex);
  let symbols = password.match(symbolsRegex);
  let totalSubstitutions = 0;


  if (deletePW) {
    // we don't want to save the password in plain text.
    delete estimate.password;
  }

  // we don't need these:
  delete estimate.feedback;
  delete estimate.crack_times_display;

  if(estimate.sequence){
    estimate.sequence.forEach(function(matchObj){
      // only care about the length of the chunk
      matchObj.chunkLength = matchObj.j - matchObj.i + 1;

      // i and j would reveal the start and end of the chunk.
      delete matchObj.i;
      delete matchObj.j;

      // delete chunks and sensitive info about them.
      // some of the properties are only there for legacy reasons
      delete matchObj.token;
      delete matchObj.base_token;
      delete matchObj.base_guesses;
      delete matchObj.base_matches;
      delete matchObj.rank;
      delete matchObj.matched_word;
      delete matchObj.sub_display;
      delete matchObj.graph;

      // only count the substitutions, but don't save which ones.
      matchObj.subtitutions = matchObj.sub ? Object.keys(matchObj.sub).length : 0;
      totalSubstitutions += matchObj.subtitutions;
      delete matchObj.sub;

      anonymous_sequence.push(matchObj);
    });
  }


  // delete estimate.sequence;
  estimate.chunks = anonymous_sequence.length;
  estimate.lowercase = lowercaseMatches ? lowercaseMatches.length : 0;
  estimate.uppercase = uppercaseMatches ? uppercaseMatches.length : 0;
  estimate.digits = digits ? digits.length : 0;
  estimate.symbols = symbols ? symbols.length : 0;
  estimate.length = password.length;
  estimate.substitutions = totalSubstitutions;


  return estimate;
};

module.exports = miniZxcvbn;