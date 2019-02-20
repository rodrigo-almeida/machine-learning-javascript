/**
 * Simple examples using brain.js
 */
const brain = require('brain.js');
const dataModel2 = require('./datasets/data-model-2.json');
const dataModel3 = require('./datasets/data-model-3.json');

const yellowLog = '\x1b[33m%s\x1b[0m';

/**
 *  Simple team matches
 *  Neural Network
 *  Training data: Inline
 *  Input (inline): 
 *      [Team A, Team B]
 *  Output:
 *      0: Team A wins
 *      1: Team B wins
 */
function teamMatches() {
    const 
        network = new brain.NeuralNetwork(),
        samples = [
            {input: [1,2], output: [0]}, // Team 1 wins
            {input: [1,3], output: [1]}, // Team 3 wins
            {input: [1,4], output: [1]}, // Team 4 wins
            {input: [2,3], output: [0]}, // Team 2 wins
            {input: [2,4], output: [1]}, // Team 4 wins
        ],
        input = [2,3]; 

    network.train(samples);
    const output = network.run(input);
    
    return `Team ${input[1]} prob: ${output}`;
}

/**
 *  Simple text analysis
 *  Recurrent Neural Network
 *  Training data: data-model-2 (JSON)
 *  Input:
 *      Text to be analyzed 
 *  Outputs:
 *      Optimist 
 *      Pessimist
 */
function textAnalysis(text) {
    const 
        network = new brain.recurrent.LSTM(),
        samples = dataModel2.map((sample) => ({
            input: sample.text,
            output: sample.category  
        })),
        input = text; 

    network.train(samples, {
        iterations: 2000
    });
    const output = network.run(input);
    
    return `Category to "${input}": ${output}`;
}

/**
 *  Simple color tone analysis
 *  Neural Network
 *  Training data: data-model-3 (JSON)
 *  Input:
 *      Color in Hexadecimal
 *  Outputs:
 *      Dark 
 *      Light
 */
function colorToneAnalysis(inputHex) {
    const 
        network = new brain.NeuralNetwork(),
        samples = dataModel3,
        input = getRgb(inputHex); 

    function getRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
            g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
            b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
        } : null;
    }

    network.train(samples);
    const output = brain.likely(input, network);
    return `background: ${inputHex}, text: ` + (output === 'dark' ? 'white' : 'black');
   
}

/**
 *  [Hidden layers, measures (logging error)] example
 *  Neural Network
 *  Training data: Inline
 *  Input (inline): 
 *      [Team A, Team B]
 *  Output:
 *      0: Team A wins
 *      1: Team B wins
 */
function teamMatchesOptions(nLayers) {
    const 
        network = new brain.NeuralNetwork({ hiddenLayers: [2] }),
        samples = [
            {input: [1,2], output: [0]}, // Team 1 wins
            {input: [1,3], output: [1]}, // Team 3 wins
            {input: [1,4], output: [1]}, // Team 4 wins
            {input: [2,3], output: [0]}, // Team 2 wins
            {input: [2,4], output: [1]}, // Team 4 wins
        ],
        input = [2,3];

    let errors = [];

    network.train(samples, {
        log: (error) => errors.push(error),
        logPeriod: 10
    });
    const output = network.run(input);

    console.log(yellowLog, 'TEAM-MATCHES-OPTIONS (ERROR TABLE)');
    console.table(errors);
    
    return `Team ${input[1]} prob: ${output}`;
}

/*********************************************
 * Running models
 */

let result = [];

result.push(['TEAM MATCHES', teamMatches()]); 
//result.push(['TEXT ANALYSIS', textAnalysis('Nice to see you well')]); 
result.push(['COLOR TONE ANALYSIS', colorToneAnalysis('#fff0ff')]);
result.push(['TEAM MATCHES OPTIONS', teamMatchesOptions()]); 


// Output log
console.table(result);
