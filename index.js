/**
 * Created by Tobi on 16.06.17.
 */

let Analyzer = require('./lib/Analyzer');

let test = new Analyzer([
  'test123',
  'password1',
  'm@ngled@gnle'
  ]
);


let str = test.makeCSVString();
test.writeCSVFile();
