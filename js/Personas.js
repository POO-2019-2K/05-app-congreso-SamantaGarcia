import Persona from "./Persona.js";

export default class Personas{
    constructor(tablaPersonas){
        this._tablaPersonas = tablaPersonas;
        this.initPersonas();
        this._nLugares = "";
        
    }

    initPersonas(){
      this._tablaPersonas.innerHTML = "";
      this._personas = [];
      this._totalPersonas = 0;
      this._inscritos = 0;
      this._lugaresDisponibles = localStorage.getItem("limite");
      console.log(this._lugaresDisponibles);
        //localStorage.removeItem("personas");
        let Lpersonas = JSON.parse(localStorage.getItem("personas"));
        if(Lpersonas === null){
            return;
        }
       
        console.log(Lpersonas);
        Lpersonas.forEach((e, index) =>{          
            e.personaFnacimiento = new Date(e.personaFnacimiento);
            this._tablaPersonass(new Persona(e));
          
        });

        
    }

    _contarInscritos(tallerId){
      let encontrar = -1; //solo lo encuentra desde el 0 en adelante. Por eso se inicializa como -1
        this._personas.forEach((i, index) => {
          if (i.id === tallerId) {
            encontrar = index;  
            this._inscritos++;   
            this._nLugares = this._lugaresDisponibles - this._inscritos;   
            console.log("inscritos",encontrar);     
            let totalp = document.querySelector("#totalp");
            totalp.innerHTML = this._inscritos;
            let disponibles = document.querySelector("#disponibles");
            disponibles.innerHTML = this._nLugares;

            // if(this._nLugares <=0){
            //   Swal.fire({
            //     type: "error",
            //     title: "Lugares Agotados",
            //     text: "Este taller ha llegado al límite de participantes" 
                
            //   });
            //   return;
            // }
            
          }
        });
      
      //console.log("inscritos primero:", this._inscritos);
      this._inscritos = "";
      //console.log(totalp);
      //console.log(this._lugaresDisponibles);

    }

    _tablaPersonass(persona){
      let tallerId = localStorage.getItem("current");
      let tallerL = localStorage.getItem("limite");
      if (persona.id === tallerId) {
        let row = this._tablaPersonas.insertRow(-1);
        let cellNombre = row.insertCell(0);
        let cellEmail = row.insertCell(1);
        let cellFecha = row.insertCell(2);
        let cellEdit = row.insertCell(3);
        let cellDelete = row.insertCell(4);

        cellNombre.innerHTML = persona.personaNombre;
        cellEmail.innerHTML = persona.personaEmail;
        cellFecha.innerHTML = persona.getFAsString();

        this._contarInscritos(tallerId);
        this._addButtons(row, persona);
        
      }
      
     
       
        //console.log(persona.id, tallerId);
        let objPersona = {
            id : persona.id,
            personaNombre : persona.personaNombre,
            personaEmail : persona.personaEmail,
            personaFnacimiento : persona.personaFnacimiento,
            
        };

        this._personas.push(objPersona);
        //console.log(this._personas);
        localStorage.setItem("personas", JSON.stringify(this._personas));    
        

    }

    _findP(personaEmail){
      
        let foundAt = -1; //solo lo encuentra desde el 0 en adelante. Por eso se inicializa como -1
        this._personas.forEach((e, index) => {
          if (e.personaEmail === personaEmail) {
            foundAt = index;
            return;
          }
        });
        return foundAt;
      }

      addPersona(persona) {
        //buscar empleado:
        let found = this._findP(persona.personaEmail);
        if (found >= 0) {
          Swal.fire({
            type: "error",
            title: "Error",
            text: "El correo electrónico ingresado ya existe" 
          });
          return;
        }

        if(this._nLugares <0){
          Swal.fire({
            type: "error",
            title: "Lugares Agotados",
            text: "Este taller ha llegado al límite de participantes" 
            
          });
          return;
        }
        
        let tallerId = localStorage.getItem("current");        
        persona.id = tallerId;
        this._tablaPersonass(persona);
        //console.log(this._personas);
        localStorage.setItem("personas", JSON.stringify(this._personas));
    
      }

    _addButtons(row, persona){
        let iconEdit = document.createElement("span");
        iconEdit.className = "fa fa-user-edit";     

      let btnEdit = document.createElement("button");
      btnEdit.type = "button";
      btnEdit.appendChild(iconEdit);
      btnEdit.className = "btn btn-outline-warning ";
      btnEdit.addEventListener("click", () => { 
        this._editRow(row, persona); //llamando al metodo de editar
      }); 

      let iconEli = document.createElement("span");
        iconEli.className = "fa fa-user-times";
      let btnDelete = document.createElement("button");
      btnDelete.type = "button";
      btnDelete.appendChild(iconEli);
      btnDelete.className = "btn btn-outline-danger";
      btnDelete.addEventListener("click", () => { 
        this._deleteRow(row, persona); //llamando al metodo de editar
      }); 

      row.cells[3].appendChild(btnEdit);
      row.cells[4].appendChild(btnDelete);

     
      
    }

    _deleteRow(row, persona){
      
        this._personas.splice(persona, 1);
        row.innerHTML = ""; 
        localStorage.setItem("personas", JSON.stringify(this._personas));
       // console.log(this._personas);  
       
        return;          
    }

    _editRow(row, persona){
        //console.log(row, persona);
        let inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.value = persona.personaNombre;

        let inputEmail = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.value = persona.personaEmail;

        let inputFecha = document.createElement("input");
        inputFecha.type = "date";
        inputFecha.value = persona.personaFnacimiento;

        row.cells[0].innerHTML = ""; //borrar la celda
        row.cells[0].appendChild(inputNombre); //appendChild para crear un input através de una variable  

        row.cells[1].innerHTML = "";
        row.cells[1].appendChild(inputEmail);

        row.cells[2].innerHTML = "";
        row.cells[2].appendChild(inputFecha);

         //crear botones

         let iconSave = document.createElement("span");
        iconSave.className = "fa fa-user-check";
      //salvar
    let btnSave = document.createElement("button");
    btnSave.type = "button";
    btnSave.appendChild(iconSave);
    btnSave.className = "btn btn-outline-success";
    row.cells[3].innerHTML = "";
    row.cells[3].appendChild(btnSave);
    btnSave.addEventListener("click", () => {
      let newP ={
        personaNombre : inputNombre.value,
        personaEmail : inputEmail.value,
        personaFnacimiento : inputFecha.value
      }
      this._saveEdit(row, persona,newP);
    });

    let iconCan = document.createElement("span");
    iconCan.className = "fa fa-user-alt-slash";

    let btnCancel = document.createElement("button");
    btnCancel.type = "button";
    btnCancel.appendChild(iconCan);
    btnCancel.className = "btn btn-outline-danger";
    row.cells[4].innerHTML = "";
    row.cells[4].appendChild(btnCancel);
    btnCancel.addEventListener("click", () => {
      this._cancelEdit(row, persona); //llamar metodo
    });
    }

    _saveEdit(row, persona,newP){
      let position = this._findP(persona.personaEmail);
      this._personas[position] = newP;
      localStorage.setItem("personas", JSON.stringify(this._personas));

      this._cancelEdit(row, new Persona(newP));
      //console.log(row, persona, newP)
  }

    _cancelEdit(row, persona){
        row.cells[0].innerHTML = persona.personaNombre;
        row.cells[1].innerHTML = persona.personaEmail;
        row.cells[2].innerHTML = persona.personaFnacimiento;
    
        row.cells[3].innerHTML = "";
        row.cells[4].innerHTML = "";
         this._addButtons(row, persona); //metodo de botones
      }
    
      
}