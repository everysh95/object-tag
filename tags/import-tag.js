import { getObjectFromKey } from "../utils/get-object.js";
import { requestResources } from "../utils/request-resources.js";

export class ImportObject extends HTMLElement {
    constructor(){
        super();
        this.obj = null;
        this.pull();
    } 
    setUpAttribute(){
        this.ref = this.getAttribute('ref');
        this.router = this.getAttribute('router') ? this.hasAttribute('router') : 'router.json';
        this.param = this.hasAttribute("param") ? this.getAttribute('param') : '';
        this.method = this.hasAttribute("method") ? this.getAttribute('method') : 'GET';
        return this.ref;
    }
    async loadObject(){
        const resources =  await requestResources('GET',this.router);
        const key = this.ref.split('.');
        return requestResources(this.method,getObjectFromKey(key,resources));
    }
    async pull(){
        if(!this.setUpAttribute()) return;
        if(!this.obj) this.obj = await this.loadObject();
    }
}

customElements.define('import-object',ImportObject);