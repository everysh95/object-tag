import { DefineObject } from "./basic-tag.js";

export class ImageObject extends DefineObject
{
    async onPulled()
    {
        this.innerHTML = '';
        if(this.obj)
        {
            this.img = document.createElement('img');
            if(typeof this.obj === 'string') this.img.setAttribute('src',`${this.obj}`);
            else this.img.setAttribute('src',URL.createObjectURL(this.obj));
            this.appendChild(this.img);
        }
    }
}

export class VideoObject extends DefineObject
{
    async onPulled()
    {
        this.innerHTML = '';
        if(this.obj)
        {
            this.img = document.createElement('video');
            if(typeof this.obj === 'string') this.img.setAttribute('src',`${this.obj}`);
            else this.img.setAttribute('src',URL.createObjectURL(this.obj));
            this.appendChild(this.img);
        }
    }
}
export class AudioObject extends DefineObject
{
    async onPulled()
    {
        this.innerHTML = '';
        if(this.obj)
        {
            this.img = document.createElement('audio');
            if(typeof this.obj === 'string') this.img.setAttribute('src',`${this.obj}`);
            else this.img.setAttribute('src',URL.createObjectURL(this.obj));
            this.appendChild(this.img);
        }
    }
}

customElements.define('image-object',ImageObject);
customElements.define('video-object',VideoObject);
customElements.define('autio-object',AudioObject);