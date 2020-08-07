const deTree = function (treeData) {
    let list = [];
    each(treeData, list)

    function each(data, list) {
        for (let item of data) {
            if (item.children.length > 0) {
                each(item.children, list);
            } else {
                list.push(item)
            }
        }
    }

    return list
}

const toJSON = function (data) {
    return JSON.parse(JSON.stringify(data));
}

export {
    deTree,toJSON
}
