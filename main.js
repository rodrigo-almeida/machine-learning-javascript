
/**
 * Simple examples using brain.js
 */
const brain = require('brain.js');
const dataModel2 = require('./datasets/data-model-2.json');

/**
 *  Simple team matches
 *  Neural Network
 *  Outputs:
 *      0: First team wins
 *      1: Second team wins
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
 *  Outputs:
 *      Optimist 
 *      Pessimist
 */
function textAnalysis() {
    const 
        network = new brain.recurrent.LSTM(),
        samples = dataModel2.map((sample) => ({
            input: sample.text,
            output: sample.category  
        })),
        input = 'Nice to see you good'; 

    network.train(samples, {
        iterations: 2000
    });
    const output = network.run(input);
    
    return `Category: ${output}`;
}


/*********************************************
 * Running models
 */

// Model to run
const modelToRun = textAnalysis; // Change this to the desired model

// Output log
console.log(modelToRun());