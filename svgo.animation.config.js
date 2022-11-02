/** @type {import('svgo').OptimizeOptions} */
export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // stop `@keyframes` from being removed
          // @see https://github.com/svg/svgo/issues/888#issuecomment-444599657
          minifyStyles: false,
          // stop removing class names
          inlineStyles: false,
          // cannot animate height of paths
          // @see https://github.com/svg/svgo/issues/1634
          convertShapeToPath: false,
          // keep `defs/ref` entry
          removeUnknownsAndDefaults: {
            unknownContent: false
          },
          // keep elements that will be animated in/out of view
          removeHiddenElems: false
        }
      }
    }
  ]
}
