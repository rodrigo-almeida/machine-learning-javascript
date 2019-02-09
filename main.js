
/**
 * Simple examples using brain.js
 */
const brain = require('brain.js');

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

// Model to run
const modelToRun = teamMatches; // Change this to the desired model

// Output log
console.log(modelToRun());