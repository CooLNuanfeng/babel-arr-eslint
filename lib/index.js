
module.exports = function({ types }) {
  return {
    visitor: {
      // Identifier(path) {
      //   console.log('===Identifier===')
      //   // console.log(path.node)
      //   console.log('===Identifier===')
      // },
      MemberExpression(path){
        // console.log('types',types.isMemberExpression(path.parent))

        // console.log('===MemberExpression===',path.parent.type, path.node.type)
        if(path.parent.type === 'MemberExpression' && path.node.type === 'MemberExpression' && path.node.property){
          // console.log('parent',path.parent)
          // console.log('child', path.node.property)
          let name = path.node.object.name;
          let index = path.node.property.value
          let property = path.parent.property.name
          console.log(name)
          console.log(index)
          console.log(property)
          path.replaceWith(types.expressionStatement(types.stringLiteral(`${name}[${index}] && (${name}[${index}].${property})`)))
          // path.insertAfter(types.expressionStatement(types.stringLiteral(`)`)))
        }
        // console.log(path.node)
        console.log('===MemberExpression===')
      }
    }
  }
};