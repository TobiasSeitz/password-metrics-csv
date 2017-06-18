/**
 * Created by Tobi on 16.06.17.
 */

/**
 * @author Tobi Seitz
 */
class Util {
  /* snatched from: https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/ */
  /**
   * calculates the standard deviation.
   * @param {Array} values
   */
  static sd(values) {
    let avg = Util.average(values);

    let squareDiffs = values.map(function(value) {
      let diff = value - avg;
      let sqrDiff = diff * diff;
      return sqrDiff;
    });

    let avgSquareDiff = average(squareDiffs);

    let stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
  }

  /**
   * calculates the arithmetic mean of some data.
   * @param {Array} data is an array of objects or integers.
   * @param {String} [fieldName] contains the property name in data that should be considered.
   */
  static average(data, fieldName) {
    let sum;

    if (fieldName) {
      sum = data.reduce(function(sum, value) {
        return sum + value[fieldName];
      }, 0);
    } else if (data instanceof Array) {
      sum = data.reduce(function(sum, value) {
        return sum + value;
      }, 0);
    }
    return sum / data.length;
  }


  /**
   * @author Tobi Seitz
   * creates multiple unique properties in the top level from nested objects.
   * @param {Object} object that contains some properties.
   * @param {String} propertyName that defines the property which is itself an object.
   * @return {*}
   */
  static flattenProperty(object, propertyName) {
    let flattenedObj = {};
    let mergeNames = (a, b) => {
      return a + '_' + b;
    };

    if (typeof object[propertyName] !== 'object') {
      return object[propertyName];
    }

    // only if the property exists and it actually has keys:
    let assumptionsMet = Object.keys(object[propertyName]).length;

    if (assumptionsMet) {
      Object.keys(object[propertyName]).forEach((key) => {
        flattenedObj[mergeNames(propertyName, key)] = object[propertyName][key];
      });
      // we don't need the deep property anymore
      delete object[propertyName];

      // copy over the result.
      for (let key in flattenedObj) {
        object[key] = flattenedObj[key]
      }
    }
    return object;
  }

  /**
   * @author Tobi Seitz
   * creates an object with a single level from nested objects.
   * uses recursion, so be careful for deeply nested objects.
   *
   * @param {Object|Array} obj that contains nested Objects.
   * @return {*}
   */
  static flattenObject(obj) {

    // 1. recursively flatten the object properties that remain.
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        // this is the break condition (if the following check is false for all k)
        if (typeof obj[k] === 'object') {
          // recursively flatten;
          Util.flattenObject(obj[k]);
        }
      }
    }

    // 2. flatten top level (collect)
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        Util.flattenProperty(obj, k);
      }
    }

    return obj;
  }

  /**
   * creates the minimum common elements of two arrays (intersection)
   *
   * @param {Array} a
   * @param {Array} b
   * @return {Array.<*>}
   */
  static intersectArrays(a,b) {
    // https://stackoverflow.com/a/43933543/1447479
    a = new Set(a);
    b = new Set(b);
    return [...a].filter(v => b.has(v));
  }
}
module.exports = Util;