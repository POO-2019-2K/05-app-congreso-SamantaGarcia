import Persona from "./persona.js";

export default class Personas{
    constructor(tablaPersonas){
        this._tablaPersonas = tablaPersonas;
        this._personas = [];
        this._totalPersonas = 0;
        this._initPersonas();
    }

    _initPersonas(){
        //localStorage.removeItem("personas");
        let Lpersonas = JSON.parse(localStorage.getItem("personas"));
        if(Lpersonas === null){
            return;
        }

        Lpersonas.forEach((e, index) =>{
            e.personaFnacimiento = new Date(e.personaFnacimiento);
            this.tablaPersonas(new Persona(Lpersonas));
        });

        
    }

    tablaPersonas(persona){
        let row = this._tablaPersonas.insertRow(-1);

        let cellNombre = row.insertCell(0);
        let cellEmail = row.insertCell(1);
        let cellFecha = row.insertCell(2);
        let cellEdit = row.insertCell(3);
        let cellDelete = row.insertCell(4);

        cellNombre.innerHTML = persona.personaNombre;
        cellEmail.innerHTML = persona.personaEmail;
        cellFecha.innerHTML = persona.getFAsString();

        this._addButtons(row, persona);

        let objPersona = {
            personaNombre : persona.personaNombre,
            personaEmail : persona.personaEmail,
            personaFnacimiento : persona.personaFnacimiento
        };

        

        this._personas.push(objPersona);
        console.log(this._personas);
        localStorage.setItem("personas", JSON.stringify(this._personas));

    }

    _addButtons(row, persona){
        let btnEdit = document.createElement("input");
      btnEdit.type = "button";
      btnEdit.value = "Editar";
      btnEdit.className = "btn btn-outline-warning ";
      btnEdit.addEventListener("click", () => { 
        //this._editRow(row, persona); //llamando al metodo de editar
      }); 

      let btnDelete = document.createElement("input");
      btnDelete.type = "button";
      btnDelete.value = "Eliminar";
      btnDelete.className = "btn btn-outline-danger";

      row.cells[3].appendChild(btnEdit);
      row.cells[4].appendChild(btnDelete);
      
    }
}