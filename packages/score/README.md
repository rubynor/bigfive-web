# bigfive-score

Calculate score for big five tests.

See https://bigfive-test.com

## Scoring Logic

For detailed information about the scoring methodology and classification criteria, see [LOGIC.md](LOGIC.md)

## Installation

```
$ npm i @bigfive-org/score
```

## Usage

Pass an object with property **answers**.
Answers have to be an Array with domain and score. Facet is optional.

```js
import { processAnswers } from '@bigfive-org/score'
const result = {
  "timeElapsed": 51,
  "lang": "en",
  "test": "50-IPIP-NEO-PI-R",
  "totalQuestions": 50,
  "answers": [
    {
      "domain": "A",
      "facet": "1",
      "score": "3"
    },
    {
      "domain": "A",
      "facet": "1",
      "score": "3"
    },
    {
      "domain": "E",
      "facet": "1",
      "score": "3"
    },
    {
      "domain": "E",
      "facet": "2",
      "score": "3"
    }
  ]
}

processAnswers(result)
```

returns score for each factor

```js
{
  'A': {
    'score': 6,
    'count': 2,
    'result': 'neutral',
    'facet': {
      '1': {
        'score': 6,
        'count': 2,
        'result': 'neutral'
      }
    }
  },
  'E': {
    'score': 6,
    'count': 2,
    'result': 'neutral',
    'facet': {
      '1': {
        'score': 3,
        'count': 1,
        'result': 'neutral'
      },
      '2': {
        'score': 3,
        'count': 1,
        'result': 'neutral'
      }
    }
  }
}
```

## License

[MIT](LICENSE)
