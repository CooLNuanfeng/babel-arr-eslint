const nodeSet = new Set();
const nodeMap = {};

module.exports = function({ types }) {
  return {
    visitor: {
      MemberExpression(path) {
        if(path.node.type === 'MemberExpression' && path.parentPath.type === 'MemberExpression' && path.parent.object === path.node && path.parentPath.parent.type !== 'AssignmentExpression'){
          console.log('================')
      
          nodeSet.add(path.node.object.name)
          nodeMap[path.node.object.name] = path.node

          // console.log(nodeSet)
          // console.log(nodeMap)

          const hasLeftNode = function(node){
            if(node.object && node.object.name && !nodeMap[path.node.object.name]){
              nodeSet.add(node.object.name)
              nodeMap[node.object.name] = node
              console.log(node)
              path.parentPath.replaceWith(
                types.logicalExpression('&&',path.parent, node)
              )
              path.parentPath.skip();
            }
            if(node.left){
              hasLeftNode(node.left)
            }
          }

          if(path.parentPath.container.left.type === 'LogicalExpression'){
            hasLeftNode(path.parentPath.container)
          }

          // let arrKey = [...nodeSet]
          // console.log(arrKey)
          
          // let expressNode = arrKey.reduce((node, item, index)=>{
          //   console.log('item=>',item)
          //   console.log('index=>',index)
          //   return types.logicalExpression('&&', node, nodeMap[item])
          // })

          // path.parentPath.replaceWith(
          //   types.logicalExpression('&&',expressNode, path.parent)
          // )
          // path.parentPath.skip();
          
          // let arrKey = [...nodeSet]
          // console.log(arrKey)
          // if(arrKey.length > 2){
          //   let expressNode = arrKey.reduce((node, item, index)=>{
          //     console.log('item=>',item)
          //     console.log('index=>',index)
          //     return types.logicalExpression('&&', node, nodeMap[item])

          //     // if(index > 2){
          //     //   let newNode = types.logicalExpression('&&', node, nodeMap[item])
          //     //   path.parentPath.replaceWith(newNode)
          //     //   path.parentPath.skip();
          //     //   return newNode
          //     // }else{
          //     //   path.parentPath.replaceWith(
          //     //     types.logicalExpression('&&',path.parent, node)
          //     //   )
          //     //   path.parentPath.skip();
          //     //   return node
          //     // }
          //   }, types.logicalExpression('&&',nodeMap[arrKey[0]], nodeMap[arrKey[1]]))

          //   path.parentPath.replaceWith(
          //     types.logicalExpression('&&',expressNode, path.parent)
          //   )
          //   path.parentPath.skip();

          // }
          
          
          

          // types.logicalExpression('&&', )
         

          // [...nodeSet].reduce(item=>{
          //   console.log(item)
          //   path.parentPath.replaceWith(
          //     types.expressionStatement(
          //       types.logicalExpression('&&', nodeMap[item], path.parentPath.container.right)
          //     )
          //   )
          //   path.parentPath.skip();
          // },path.parentPath.container.right)
          


          // console.log('node==>', path.node)
          // console.log('parent==>',path.parent)
          // console.log('path=>',path)
          // console.log('parentPath=>',path.parentPath)
          // console.log('parentPath.container=>',path.parentPath.container)
          // console.log(types.isIdentifier(path.parent, {name: `${path.node.object.name}`}))

          //path.replaceWith(types.expressionStatement(types.stringLiteral(`${name}[${index}] && (${name}[${index}].${property})`)))


          // const hasLeftNode = function(node){
          //   if(node.object && node.object.name === path.node.object.name){
          //     console.log('left',node.object.name)
          //     console.log('path',path.node.object.name)
          //     path.parentPath.skip();
          //   }
          //   if(node.left){
          //     hasLeftNode(node.left)
          //   }
          // }

          
          // if(path.parentPath.container.left && path.parentPath.container.left == path.node){
          //   console.log(111)
          // }else{
          //   console.log(222)
          // }
          // path.parentPath.replaceWith(
          //   types.logicalExpression('&&', path.node, path.parent)
          // )
          // path.parentPath.skip();
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