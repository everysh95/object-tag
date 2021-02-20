import { DefineObject } from "./basic-tag.js";

export class LinkObject extends DefineObject
{
    async onPulled()
    {
        this.innerHTML = '';
        if(this.obj)
        {
            this.link = document.createElement('link');
            for (const key of Object.keys(this.obj)) {
                this.link.setAttribute(`${key}`,`${this.obj[key]}`);
            }
            this.appendChild(this.link);
        }
    }
}

export class StyleObject extends DefineObject
{
    async onPulled()
    {
        this.innerHTML = '';
        if(this.obj)
        {
            this.style = document.createElement('style');
            if(typeof this.obj === "string") this.style.innerHTML = this.obj
            else this.style.innerHTML = `${this.obj}`
            this.appendChild(this.style);
        }
    }
}

customElements.define('link-object',LinkObject);
customElements.define('style-object',StyleObject);