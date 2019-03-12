# validity-cf-crop-integrity-validator

Validity style validator to ensure that required image crops are selected with
an image widget array. This validator works with cf image widget areas.

## Installation

    npm install validity-cf-crop-integrity-validator

## Usage

Below is a simple example for usage with schemata and save:

```js

var schemata = require('schemata')
  , createCropValidator = require('validity-cf-crop-integrity-validator')
  , crops = [ { name: 'Rectangle' } ]

  var requiredCrops = crops.map(function(crop) {
    return crop.name
  })

  var schema = schemata(
    { images:
      { type: Object
      , defaultValue: {}
      , validators:
        { all: [ createCropValidator(requiredCrops) ]
        }
      }
    }
  )
```

## API

### var validate = createUniqueValidator(Array: requiredCrops)

Create a validate function. `requiredCrops` should be an array of image crops
that require selection.

### validate(String:key, String:keyDisplayName, Object:object, Function:cb)

This is a validity compatible function, which in turn is used by schemata for schema validation.

The callback signature cb(err, errorMessage).

err is an Error object if something bad happened and null otherwise.
errorMessage is a String if a validation error happened and undefined otherwise.

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)