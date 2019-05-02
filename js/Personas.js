import Persona from "./persona.js";

export default class Personas{
    constructor(tablaPersonas){
        this._tablaPersonas = tablaPersonas;
        this._personas = [];
        this._totalPersonas = 0;
        this._initPersonas();
    }

    _initPersonas(){
        let Lpersonas = JSON.parse(localStorage.getItem("personas"));
        if(Lpersonas === null){
            return;
        }

        this.tablaPersonas(new Persona(Lpersonas));
    }

    tablaPersonas(persona){
        let row = this._tablaPersonas.insertRow(-1);

        let cellNombre = row.insertCell(0);
        let cellEmail = row.insertCell(1);
        let cellFecha = row.insertCell(2);

        cellNombre.innerHTML = persona.personaNombre;
        cellEmail.innerHTML = persona.personaEmail;
        cellFecha.innerHTML = persona.getFAsString();

        let objPersona = {
            personaNombre : persona.personaNombre,
            personaEmail : persona.personaEmail,
            personaFnacimiento : persona.personaFnacimiento
        };

        this._personas.push(objPersona);
        console.log(this._personas);
        localStorage.setItem("personas", JSON.stringify(this._personas));

    }
}