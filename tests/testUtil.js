/**
 * Created by Tobi on 17.06.17.
 */
let Util = require('../util/util');


function testFlattenProperty() {
  let testObj = {x: {a: 1, b: 2, c: 3}, y: {a: 1, b: 2, c: 3}};

  console.log('before', testObj);

  for (let property in testObj) {
    Util.flattenProperty(testObj, property);
  }

  console.log('after flattening all first-level properties', testObj);
}

function testFlattenObject() {
  let testObj = {
    x: {a: {i: ['tobi','lena'], j: 2}, b: {i: 1, j: 2}, c: {i: 1, j: 2}},
    y: {a: {i: 1, j: 2}, b: {i: 1, j: 2}, c: {i: 1, j: 2}}
  };

  console.log('before', testObj);
  Util.flattenObject(testObj);
  console.log('after deep flattening', testObj);
}


testFlattenObject();