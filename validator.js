module.exports = createValidator

var equal = require('deep-equal')

function createValidator (requiredCrops) {
  return validate

  function validate (key, msg, object, callback) {
    var cropsValid
    var errorMessage = 'Image crops have not been downloaded'

    if (hasImages(object, key)) {
      cropsValid = true
      object[key].widgets.forEach(function (image) {
        // If there are no crops, this is bad
        if (!Array.isArray(image.crops)) {
          cropsValid = false
          return cropsValid
        }

        var existing = image.crops
          // Get the list of crops that have been downloaded
          .filter(function (crop) { return !!crop.src })
          // Just get their names so that it can be easily to
          // compared to the list of required crops
          .map(function (crop) { return crop.name })

        if (!equal(existing.sort(), requiredCrops.slice(0).sort())) {
          cropsValid = false
          return cropsValid
        }
      })
    } else {
      errorMessage = 'Images are required'
    }
    return callback(null, cropsValid ? undefined : errorMessage)
  }
}

function hasImages (object, key) {
  return object[key] && Array.isArray(object[key].widgets) && object[key].widgets.length
}
