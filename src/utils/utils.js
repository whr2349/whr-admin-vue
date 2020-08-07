export const deTree = function (treeData) {
    let list = [];
    each(treeData);

    async function each(data) {
        for await (const item of data){
            if(item.children.length>0){
                each(item.children);
            }else {
                list.push(item)
            }
        }
    }
    return list
}
