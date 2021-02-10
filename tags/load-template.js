import { requestResources } from "../utils/request-resources.js";
import { getObjectFromKey } from "../utils/get-object";

export class LoadTemplate extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.init();
    } 
    setUpAttribute(){
        this.src = this.getAttribute('src');
        this.ref = this.getAttribute('ref');
        this.router = this.getAttribute('router') ? this.hasAttribute('router') : 'router.json';
        return this.ref || this.src;
    }
    async init(){
        if(!this.setUpAttribute()) return;
        if(this.ref)
        {
            const resources =  await requestResources('GET',this.router);
            const key = this.ref.split('.');
            this.src = getObjectFromKey(key,resources);
        }
        const templateText = await (await fetch(this.src)).text();
        this.templateNode = document.importNode(new DOMParser().parseFromString(templateText,'text/html').querySelector('template').content,true);
        this.shadowRoot.append(this.templateNode);
    }
}

customElements.define('load-template',LoadTemplate)