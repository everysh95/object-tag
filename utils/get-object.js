export function getObjectFromKey(key,mapObject) {
    if(key.length == 0) return mapObject;
    if(!mapObject) null;
    const newKeys = key.splice(1);
    const keyAndIndex = key[0].match(/([^\[]+)\[([0-9]+)\]/)
    if(keyAndIndex)
    {
        if(!mapObject[keyAndIndex[1]])return null;
        return getObjectFromKey(newKeys,mapObject[keyAndIndex[1]][parseInt(keyAndIndex[2])]);
    }
    return getObjectFromKey(newKeys,mapObject[key[0]])
}