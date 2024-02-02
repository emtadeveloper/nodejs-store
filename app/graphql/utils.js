function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value);
    });
    return value;
}

// کد بهینه نیست چون استفاده زیاد از توابع بازگشتی سبب پر شدن استک برنامه می شود

function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case kind.STRING:
        case kind.BOOLEAN:
            return valueNode.value;
        case kind.INT:
        case kind.FLOAT:
            return Number(valueNode.value);
        case kind.OBJECT:
            return parseObject(valueNode.value);
        case kind.LIST:
            return valueNode.values.map(value => parseValueNode(value));
        default:
            return null;
    }
}

function parseLiteral(valueNode) {
    switch (valueNode.kind) {
        case kind.STRING:
            return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value) : valueNode;
        case kind.INT:
        case kind.FLOAT:
            return Number(valueNode.value);
        case kind.OBJECT:
    }
}

function toObject(value) {
    if (typeof value === "object") {
        return value;
    }
    if (typeof value === "string" && value.charAt(0) === "{") {
        return JSON.parse(value);
    }
    return null;
}

module.exports = {toObject, parseObject, parseValueNode, parseLiteral};
