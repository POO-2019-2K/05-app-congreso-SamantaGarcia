import Taller from "./taller.js";
import Talleres from "./Talleres.js";

import Persona from "./persona.js";
import Personas from "./Personas.js";

class Main {
    constructor() {
        let lista = new Talleres(document.querySelector("#seccionTaller1"), document.querySelector("#seccionTaller1"));

        document.querySelector("#btnCrear").addEventListener("click", () => {
            let form = document.querySelector("#form")

            if (form.checkValidity() === true) {
            let tallerNombre = document.querySelector("#tallerNombre").value;
            let tallerFinicio = document.querySelector("#tallerFinicio").value;
            let tallerFtermino = document.querySelector("#tallerFtermino").value;
            let tallerDuracion = document.querySelector("#tallerDuracion").value;
            

            let objTaller = {
                tallerNombre : tallerNombre,
                tallerFinicio : tallerFinicio,
                tallerFtermino : tallerFtermino,
                tallerDuracion : tallerDuracion
              };

            let taller = new Taller(objTaller);
            lista.encontrarTaller(taller);
        }

        form.classList.add("was-validated");
        });



        let agenda = new Personas(document.querySelector("#tablaPersonas"));
        document.querySelector("#btnAgregar").addEventListener("click", () => {
            let form2 = document.querySelector("#form2");

            if (form2.checkValidity() === true){
                let personaNombre = document.querySelector("#personaNombre").value;
                let personaEmail = document.querySelector("#personaEmail").value;
                let personaFnacimiento = document.querySelector("#personaFnacimiento").value;
                let sDate = personaFnacimiento.split("-");

                let objPersona = {
                    personaNombre : personaNombre,
                    personaEmail : personaEmail,
                    personaFnacimiento : new Date(sDate[0], sDate[1]-1, sDate[2])
                };
                console.log(objPersona);

                let persona = new Persona(objPersona);
                agenda.addPersona(persona);

                document.getElementById('form2');
            }
            form2.classList.add("was-validated");
        });
    }
}
let m = new Main();
