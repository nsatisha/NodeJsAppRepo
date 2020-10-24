const {calculateTip} = require('../src/math')

test('calcualte',()=>{

     //const total = calculateTip(10,.3)
     expect(calculateTip(10,.3)).toBe(13)
    // if(total !== 13){
    //     throw new Error('Expected 13 but got' + total)
    // }
})

test('calcualtedefaultTip',()=>{

    expect(calculateTip(10)).toBe(12.6)
})