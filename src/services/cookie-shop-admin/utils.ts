// todo typeId url -> 商品分类

export function typeIdToName(id) {
    var name = ""
    switch (id) {
        case "1": name = "经典法式"; break;
        case "2": name = "精品慕斯"; break;
        case "3": name = "奶油戚风"; break;
        case "4": name = "情人系列"; break;
        case "5": name = "儿童系列"; break;
        case "6": name = "女神系列"; break;
        case "7": name = "男士系列"; break;
        case "8": name = "长辈系列"; break;
        case "9": name = "高级定制"; break;

    }
    return name
}