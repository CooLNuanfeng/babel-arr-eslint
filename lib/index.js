
module.exports = function({ types: babelTypes }) {
  return {
    visitor: {
      Identifier(path,state) {
        console.log(path.node)
      }
    }
  }
};