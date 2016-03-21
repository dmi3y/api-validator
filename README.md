# JsonSchema API validator <img src="https://circleci.com/gh/dmi3y/json-api-validator.png?circle-token=:c9b904200c9df88f84e2dd80e9a44d5e16505f0e" />

> Slightly opinionated view on [JsonSchema](http://json-schema.org/) API validation.

### Install

> json-api-validator

### Proposed usecase

> But not limited.

Let's say there is folder structure of json schemas.

````
api +
     \schemas +
               \request +
               |         \pathA
               |            get.json
               |            post.json
               |            put.json
               |                     +
               |                      \subpathA
               |                            get.json
               |          .... etc ....
               \response +
                          \pathA
                            get.json
                            post.json
                            put.json
                                    +
                                     \subpathA
                                            get.json
                          .... etc ....
````

This will be possible setup for validator.

`api/validator.js`

````js
var validator = require('api-validator')({
  // from cwd
  base: './schemas'
})

// ... and later in the code
var result = validator(jsonToValidate, 'response/pashA/get.json')
// ... do something based on result
````

See tests for better examples.

### API

This module is a wrapper over the [tv4](https://github.com/geraintluff/tv4) JsonSchema validator. The result returned from the call is direct pipeline from [`tv4.validateMultiple`](https://github.com/geraintluff/tv4#usage-3-multiple-errors) method.

There is options you can pass for initiation:

- `base` root folder from which schemas will be searched up, default to `cwd`.
- `globPattern` the pattern used to search schemas, default to `/**/*`.
- `formats` hash of the custom formats for [`tv4.addFormat`](https://github.com/geraintluff/tv4#addformatformat-validationfunction) multiple form.


### Notes

As of now the all schemas are loaded in the memory, no matter will they be used or not. The lazy loading are considerably on the road map.
