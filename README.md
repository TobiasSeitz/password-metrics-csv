# password-metrics-csv #
A NodeJS tool to create metrics from a list of passwords. The zxcvbn library is used under the hood. 


## Dependencies
- [zxcvbn](https://github.com/dropbox/zxcvbn) 

## Installation

Currently, only npm supported. The package does not support to be run in the browser.

### Node/npm

`npm install password-metrics-csv`

## Usage

Basic:
```ecmascript 6 
let Analyzer = require('password-metrics-csv');

let myAnalyzer = new Analyzer(['password1','MargaretThatcherisa110%sexy!']);
myAnalyzer.writeCSVFile();
```
This will create a file `pw-analysis.csv` containing something like this:
```
password,guesses,guesses_log10,calc_time,score,chunks,lowercase,uppercase,digits,symbols,length,substitutions,sequence_0_pattern,sequence_0_dictionary_name,sequence_0_reversed,sequence_0_l33t,sequence_0_uppercase_variations,sequence_0_l33t_variations,sequence_0_guesses,sequence_0_guesses_log10,sequence_0_chunkLength,sequence_0_subtitutions,crack_times_seconds_online_throttling_100_per_hour,crack_times_seconds_online_no_throttling_10_per_second,crack_times_seconds_offline_slow_hashing_1e4_per_second,crack_times_seconds_offline_fast_hashing_1e10_per_second
"password1",190,2.278753600952829,10,0,1,8,0,1,0,9,0,"dictionary","passwords","false","false",1,1,189,2.276461804173244,9,0,6840,19,0.019,1.9e-8
"MargaretThatcherisa110%sexy!",538324720000000000,17.731044323180157,17,4,5,21,2,3,2,28,0,"dictionary","female_names","false","false",2,1,50,1.6989700043360185,8,0,19379689920000000000,53832472000000000,53832472000000,53832472
```


## Author(s) ##

- [Tobi Seitz](https://www.tobi-seitz.com)


