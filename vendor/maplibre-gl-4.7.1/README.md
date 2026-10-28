# MapLibre GL JS 4.7.1

Unmodified copies of `dist/maplibre-gl.js`, `dist/maplibre-gl.css` and `LICENSE.txt` (BSD-3-Clause)
from the npm package `maplibre-gl@4.7.1`
(`https://registry.npmjs.org/maplibre-gl/-/maplibre-gl-4.7.1.tgz`, integrity
`sha512-lgL7XpIwsgICiL82ITplfS7IGwrB1OJIw/pCvprDp2dhmSSEBgmPzYRvwYYYvJGJD7fxUv1Tvpih4nZ6VrLuaA==`).

Version 4.7.1 on purpose: 5.x breaks iOS < 13.4. The app loads these files only when the map view opens
(`js/app.js`). `scripts/validate-technical.mjs` checks the SHA-256 of each file:

| File | SHA-256 |
| --- | --- |
| `maplibre-gl.js` | `be9633c4d870e26fb37f1cfe5c5a77181667114003ea16207ac7850d8da8add1` |
| `maplibre-gl.css` | `576b085fdd9487a65a19215328c1e086c07ce5bf6da09b666b3806d3d008dae9` |
| `LICENSE.txt` | `ee5fc05a0677eaf69601d2c7db0d9ecd6cc27c3abc1d0733bc9ed34707cf8ef2` |

The source map (`maplibre-gl.js.map`) is not copied; browsers ask for it only with developer tools open.
