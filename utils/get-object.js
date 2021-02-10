export function getObjectFromKey(key,mapObject) {
    if(key.length == 0) return mapObject;
    const newKeys = key.splice(1);
    const keyAndIndex = key[0].match(/([^\[]+)\[([0-9]+)\]/)
    if(keyAndIndex)
    {
        return getObjectFromKey(newKeys,mapObject[keyAndIndex[1]][parseInt(keyAndIndex[2])]);
    }
    return getObjectFromKey(newKeys,mapObject[key[0]])
}