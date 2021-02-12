import { getObjectFromKey } from './get-object.js';

function findObjectElement(node,objectID) {
    if(!node || !node.parentElement){
        return null;
    }
    let objectElement = null;
    const sisterElements = Array.from(node.parentElement.childNodes).filter((e) => e.nodeType == 1 && e.getAttribute('object-id') == objectID);
    if(sisterElements.length > 0)
    {
        objectElement = sisterElements[0];
        if(objectElement.tagName == 'SLOT') objectElement = objectElement.assignedElements()[0];
    }
    if(!objectElement) objectElement = findObjectElement(node.parentElement,objectID);
    return objectElement;
}

export async function reloadObject(rootNode) {
    rootNode.querySelectorAll('*[object-id]').forEach(
        (node) => {if(node.tagName != 'SLOT')node.obj = null;}
    );
    for (const node of rootNode.querySelectorAll('*[ref]')) {
        await node.pull();
    }
}

export async function findObject(node,key) {
    const keyList = key.split('.');
    const keyAndIndex = keyList[0].match(/([^\[]+)\[([0-9]+)\]/)
    if(keyAndIndex)
    {
        const objDataElement = findObjectElement(node,keyAndIndex[1]);
        if(!objDataElement) return null;
        await objDataElement.pull();
        return getObjectFromKey(keyList.slice(1),objDataElement.obj[keyAndIndex[2]]);
    }
    else
    {
        const objDataElement = findObjectElement(node,keyList[0]);
        if(!objDataElement) return null;
        await objDataElement.pull();
        return getObjectFromKey(keyList.slice(1),objDataElement.obj);
    }
}