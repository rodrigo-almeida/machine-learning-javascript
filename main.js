
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
    const network = new brain.NeuralNetwork();

    network.train([
        {input: [1,2], output: [0]},
        {input: [1,3], output: [1]},
        {input: [1,4], output: [1]},
        {input: [2,3], output: [0]},
        {input: [2,4], output: [1]},
    ]);

    const input = [2,3];
    
    const output = network.run(input);
    
    console.log(`Team ${input[1]} prob: ${output}`);
}

teamMatches();