import { DefineObject } from "./basic-tag.js";

export class ImageObject extends DefineObject
{
    async onPulled()
    {
        this.innerHTML = '';
        if(this.obj)
        {
            this.img = document.createElement('img');
            this.img.setAttribute('src',`${this.obj}`);
            this.appendChild(this.img);
        }
    }
}

customElements.define('image-object',ImageObject);