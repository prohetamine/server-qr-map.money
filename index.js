const express   = require('express')
    , app       = express()

const cors = require('cors')

app.use(cors())
app.options('*', cors())

let routes = [
  { hash: 'd315510141ce7ba2705162cdb4d994d3', route: [] },
  { hash: 'f2da84363dd355fb576da5f0ce99b18c', route: [] },
  { hash: '2d2043137b19b0d2e62ffafad914151d', route: [] },
  { hash: 'd410bfd083e1e003db2ac947895c6a3f', route: [] },
  { hash: '365ed25b334c0ccea25263d7dec275a2', route: [] },
  { hash: 'aa7e839302323a9b31d150389b85c938', route: [] },
  { hash: '289f8edc6c4ebfabf05e09a02a2d18c2', route: [] },
  { hash: 'd128f87d77625f4f8c09de8d2191f76b', route: [] },
  { hash: 'f1c3e5487323b0006bf8903abd5acc7a', route: [] },
  { hash: '55c0d1a6d1e49a77b8a2731a9c90ef2d', route: [] },
  { hash: 'c1e80d1065da9681609375d11175b0a7', route: [] },
  { hash: '441846a92f15f60947acd1da055402f6', route: [] },
  { hash: '1ff9b34296d430e744f6db6224f9ee8e', route: [] },
  { hash: '53d62d50b3d6f96c8ffd8a4dc9fc7aaa', route: [] },
  { hash: '7b015acf50c73208fb1dd2ab44c56819', route: [] },
  { hash: 'ce0d9454f3160074f005d0a598484a84', route: [] },
  { hash: '50772c984c23c075db883dc0f87adc89', route: [] },
  { hash: '8be32529d0b6c607132cc5ad6f229dfe', route: [] },
  { hash: 'ca59f97fb0bed7f5739c2290e2d87229', route: [] },
  { hash: '6da2a520a7f461459d022c7fe3d891f9', route: [] },
  { hash: '1c06c6d1ad484315a1f117736fa60e80', route: [] },
  { hash: '06a80477133ca378a30b3084f2f8d405', route: [] },
  { hash: '0c0bb98342ace699b35dd08577e7611b', route: [] },
  { hash: '6e197ca53a4f01e53fbecce1c7acd99a', route: [] },
  { hash: 'dd3dad0ac2ff316353a4eec359d5b046', route: [] },
  { hash: '05c6dcc4e5a6617b5afaf794812cab68', route: [] },
  { hash: '6782bb6dd9100e2b02c7dc048f0e38d8', route: [] },
  { hash: '71759fb22be3515c3887dfdfa6e731fd', route: [] }
]

app.get('/api/getEndPoint', (req, res) => {
  const hash = req.query.hash

  if (hash !== '0') {
    const route = routes.find(
      ({ hash: _hash }) =>
        hash === _hash
    )?.route

    res.json(
      route && (route[route.length - 1] || [55.7522, 37.6156])
    )
  } else {
    const route = routes.find(
      ({ hash: _hash }) =>
        'd315510141ce7ba2705162cdb4d994d3' === _hash
    )?.route

    res.json(
      route && (route[route.length - 1] || [55.7522, 37.6156])
    )
  }
})

app.get('/api/getPointsRoutes', (req, res) => {
  const hash                      = req.query.hash
      , [_longitude, _latitude]   = req.query.geo.split(',')
      , longitude                 = parseFloat(_longitude)
      , latitude                  = parseFloat(_latitude)

  if (
    (typeof(longitude) === 'number' && longitude.toString() !== 'NaN') &&
    (typeof(latitude) === 'number' && latitude.toString() !== 'NaN') &&
    hash !== '0' &&
    longitude !== 0 &&
    latitude !== 0
  ) {
    routes = routes.map(
      point =>
        point.hash === hash
          ? ({
            ...point,
            route: [
              ...point.route,
              [longitude, latitude]
            ]
          })
          : point
      )
  }

  res.json(
    routes
  )
})

app.listen(9999)
