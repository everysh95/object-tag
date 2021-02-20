import { getObjectFromKey } from "../utils/get-object.js";
import { requestResources } from "../utils/request-resources.js";
import { findObject } from "../utils/core.js";

export class ImportObject extends HTMLElement {
    constructor(){
        super();
        this.obj = null;
        this.pull();
    } 
    setUpAttribute(){
        this.src = this.getAttribute('src');
        this.ref = this.getAttribute('ref');
        this.param = this.hasAttribute("param") ? this.getAttribute('param') : '';
        this.method = this.hasAttribute("method") ? this.getAttribute('method') : 'GET';
        return this.src || this.ref;
    }
    async loadObject(){
        if(this.src) return requestResources(this.method,this.src)
        else return requestResources(this.method,await findObject(this,this.ref));
    }
    async pull(){
        if(!this.setUpAttribute()) return;
        if(!this.obj) this.obj = await this.loadObject();
    }
}

customElements.define('import-object',ImportObject);