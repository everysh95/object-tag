import { findObject } from "../utils/core.js";

export class DefineObject extends HTMLElement {
    constructor(){
        super();
        this.pull();
    } 
    setUpAttribute(){
        this.ref = this.getAttribute('ref');
        return this.ref;
    }
    async onPulled(){ }
    async pull(){
        if(!this.setUpAttribute()) return;
        this.obj = await findObject(this,this.ref);
        await this.onPulled();
    }
}

class ShowObject extends DefineObject {
    constructor(){
        super();
    } 
    async onPulled(){
        const text = `${this.obj}`;
        if(text && this.obj != undefined && this.obj != null) this.innerText = text;
    }
}

customElements.define('define-object',DefineObject);
customElements.define('show-object',ShowObject);