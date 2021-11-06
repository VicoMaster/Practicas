class AnimarTexto {
    constructor(id, objetivo) {
        this.texto = document.getElementById(id);
        this.objetivo = document.getElementById(objetivo);
        this.letras = this.texto.innerText.split("");
        this.texto.innerText = '';

        this.letras.forEach(letra => {
            let caracter = letra === ' ' ? '\xa0' : letra;
            this.texto.innerHTML = this.texto.innerHTML + `
        <div>
            <span>${caracter.toUpperCase()}</span>
            <span class="second-line" >${caracter.toUpperCase()}</span>
        </div>`
        });

        this.objetivo.addEventListener("mouseenter", () => {
            let cuenta = 0;
            const intervalo = setInterval(() => {
                if (cuenta < this.texto.childElementCount) {
                    this.texto.children[cuenta].classList.add('animation-letter');
                    cuenta += 1;
                } else {
                    clearInterval(intervalo);
                }
            }, 30);

        });

        this.objetivo.addEventListener("mouseleave", () => {
            let cuenta = 0;
            const intervalo = setInterval(() => {
                if (cuenta < this.texto.childElementCount) {
                    this.texto.children[cuenta].classList.remove('animation-letter');
                    cuenta += 1;
                } else {
                    clearInterval(intervalo);
                }
            }, 30);

        });
    }
}

new AnimarTexto('logo', 'logotipo');