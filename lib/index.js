
module.exports = function({ types }) {
  return {
    visitor: {
      MemberExpression(path) {
        if(path.node.type === 'MemberExpression' && path.parentPath.type === 'MemberExpression' && path.parent.object === path.node && path.parentPath.parent.type !== 'AssignmentExpression'){
          console.log('================')
          // console.log('node==>', path.node)
          // console.log('parent==>',path.parent)
          // console.log('path=>',path)
          // console.log('parentPath=>',path.parentPath)
          console.log('parentPath=>',path.parentPath.container)
          // console.log(types.isIdentifier(path.parent, {name: `${path.node.object.name}`}))

          //path.replaceWith(types.expressionStatement(types.stringLiteral(`${name}[${index}] && (${name}[${index}].${property})`)))
          
          path.parentPath.replaceWith(
            types.logicalExpression('&&', path.node, path.parent)
          )
          path.parentPath.skip();
        }
        
      },


      // IfStatement(path) {
      //   console.log('if=>')
      //   path.traverse({
      //     MemberExpression() {
      //       console.log('MemberExpression=>')
      //     }
      //   });
        
      //   // if(path.node.test.type === 'MemberExpression' && path.node.test.property){
      //   // path.replaceWith(
      //   //   types.logicalExpression('&&', path.node.test.property, path.node.test)
      //   // )
      //   // }
      //   // if(path.node.test.type === 'LogicalExpression'){
      //   //   console.log(111)
      //   // }
      // },
    }
  }
};