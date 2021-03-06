import { requestResources } from "../utils/request-resources.js";
import { getObjectFromKey } from "../utils/get-object.js";
import { findObject, reloadObject } from "../utils/core.js";


export class LoadTemplate extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.pull();
    } 
    setUpAttribute(){
        this.src = this.getAttribute('src');
        this.ref = this.getAttribute('ref');
        return this.ref || this.src;
    }
    async pull(){
        if(!this.setUpAttribute()) return;
        if(!this.src) this.src = await findObject(this,this.ref);
        const templateText = await (await fetch(this.src)).text();
        const templateNode = new DOMParser().parseFromString(templateText,'text/html').querySelector('template');
        if(!templateNode)
        {
            console.warn(`disable load ${this.src}(${this.ref})`)
            return;
        }
        this.templateNode = document.importNode(templateNode.content,true);
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(this.templateNode);
        this.shadowRoot.querySelectorAll("slot").forEach(
            (node) => {
                node.addEventListener('slotchange',async function(e){
                    await reloadObject(e.target.getRootNode())
                });
            }
        )
    }
}

customElements.define('load-template',LoadTemplate)