import { DefineObject } from "./basic-tag.js";

export class StyleObject extends DefineObject
{
    async onPulled()
    {
        this.innerHTML = '';
        if(this.obj)
        {
            this.link = document.createElement('link');
            for (const key of Object.keys(this.obj)) {
                this.img.setAttribute(`${key}`,`${this.obj[key]}`);
            }
            this.appendChild(this.link);
        }
    }
}

customElements.define('style-object',StyleObject);