import { checkCookie } from "./auth.js";

//TODO no me está entrando en checkCookie
export function gestionarPersonajes() {
    if (checkCookie) {
        //TODO mostrar contenido
    } else {
        document.getElementById("carrousel").innerHTML = `
            <p class="text-center text-muted">
            Debes estar identificado para ver el contenido de esta página.
            </p>
        `;
    }
}

