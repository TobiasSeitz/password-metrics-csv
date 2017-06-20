# password-metrics-csv #
A NodeJS tool to create metrics from a list of passwords. The zxcvbn library is used under the hood. The output is a .csv file that contains the metrics and that you can further analyze with R/SPSS/Excel.


## Dependencies
- NodeJS & npm
- [zxcvbn](https://github.com/dropbox/zxcvbn) 
- [commander](https://www.npmjs.com/package/commander)

## Installation

Currently, only npm is supported. The package does not (yet) support to be run in the browser.

### Node/npm

`npm install password-metrics-csv`

## Usage 

### Basic Usage in NodeJS App / Script ###
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

#### .makeCSVString() ####
Generates a string in CSV format containing the analysis. Depending on the password analysis the columns might differ slightly, but there are these common columns:
- password: The password that was analyzed. If the original password contained quotation marks `"`, those will be replaced by `&quot;` in the generated CSV string.  
- guesses: estimated number of guesses required to find out the password.
- guesses_log10: simply log(guesses)
- calc_time: how long did the calculation take?
- score: 0 is very weak, 4 is very strong
- chunks: number of identifiable word-like chunks inside the password
- lowercase: number of lowercase letters
- uppercase: number of uppercase letters
- digits: number of digits
- symbols: number of common symbols: `@'#.$;%^&+=!"()*,-/:<>?§`
- length: total number of characters 
- substitutions: number of l33t substitutions

#### .analyzePasswordsInFile(filename) ####

You can use the module to read the passwords from a file. There must only be one **password per line**.
```ecmascript 6 
let passwordFileName = 'passwords.txt';
let analyzer = new Analyzer();

analyzer.analyzePasswordsInFile(passwordFileName);
```


#### .writeCSVFile([filename],[fn]) ####
Writes the current analysis as CSV-formatted file. The default filename is `pw-analysis.csv` and is located at the same directory from which the node process was started.  

### Command Line Usage ###
You can install the module globally and run it as a command from anywhere on the terminal.

1. `npm install -g password-metrics-csv`
2. `analyze-passwords passwords.txt` 

The file containing the passwords must have one password per line. After running the command, you'll have a `pw-analysis.csv` file in the current directory that you can process through R/SPSS/Excel.

Further usage info:
``` 
Usage: analyze-passwords [options] <file>

Options:

-l, --language [language]   additional language to load
-o, --output-path [output]  path to write the .csv file containing the analysis.
-h, --help                  output usage information
-V, --version               output the version number
```

## Remarks ##
- Passwords that contain a quotation mark are analyzed as usual, but the quotation marks are replaced by `&quot;` in the generated csv.

## Author(s) ##

- [Tobi Seitz](https://www.tobi-seitz.com)


