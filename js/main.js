import Taller from "./taller.js";
import Talleres from "./Talleres.js";

class Main {
    constructor() {
        let lista = new Talleres(document.querySelector("#seccionTaller1"));

        document.querySelector("#btnCrear").addEventListener("click", () => {
            let form = document.querySelector("#form");

            let tallerNombre = document.querySelector("#tallerNombre").value;
            // let tallerFinicio = document.querySelector("#tallerFinicio").value;
            // let tallerFtermino = document.querySelector("#tallerFtermino").value;
            

            let objTaller = {
                tallerNombre: tallerNombre
              };

            let taller = new Taller(objTaller);
            lista.seccionTaller1(taller);
        });
    }
}
let m = new Main();
