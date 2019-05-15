import Taller from "./taller.js";

export default class Talleres{
    constructor(agenda){
        this._agenda = agenda;
        this._talleres = [];

        this._initTalleres();
    }

    _findKey(tallerNombre){      
      let foundK = -1; //solo lo encuentra desde el 0 en adelante. Por eso se inicializa como -1
      this._talleres.forEach((e, index) => {
        if (e.tallerNombre === tallerNombre) {
          foundK = index;
          return;
        }
      });
      return foundK;
    }


    encontrarTaller(taller){
      let mostrar = this._findKey(taller.tallerNombre);
      if (mostrar >=0){
        Swal.fire({
          type: "error",
          title: "Error",
          text: "Ese nombre ya está ocupado" 
        });
        return;
      }
      this._seccionTaller1(taller);
      //console.log(this._talleres);
      localStorage.setItem("talleres", JSON.stringify(this._talleres));
    }
    
    

    _initTalleres(){
      //localStorage.removeItem("talleres");
        let Ltalleres = JSON.parse(localStorage.getItem("talleres"));
        console.log(Ltalleres);
        if (Ltalleres === null) {
            return;                 
          }

          Ltalleres.forEach((e, index) => { 
            e.tallerFinicio = new Date(e.tallerFinicio);
            this._seccionTaller1(new Taller(e));

          });
    }
    _seccionTaller1(taller){ 
      let itemLista = document.querySelector('#drop-menu');
        let nombreTaller = document.querySelector('#STnombre');
        nombreTaller.value = taller.tallerNombre;
        let tallerFinicio = document.querySelector('#STfechai');
        tallerFinicio.value = taller.getFinicioAsString();
        let tallerFtermino = document.querySelector('#STfechat');
        tallerFtermino.value = taller.getFterminoAsString();
        let tallerDuracion = document.querySelector('#STduracion');
        tallerDuracion.value = taller.tallerDuracion;   
        let tallerLimite = document.querySelector('#STLimite');
        tallerLimite.value = taller.tallerLimite;       

        let objTaller = {
            tallerNombre : taller.tallerNombre,
            tallerFinicio : taller.tallerFinicio,
            tallerFtermino : taller.tallerFtermino,
            tallerDuracion : taller.tallerDuracion,
            tallerLimite : taller.tallerLimite
          };
      
          this._talleres.push(objTaller); 
          //console.log(this._talleres);
          localStorage.setItem("talleres", JSON.stringify(this._talleres));


          let a = document.createElement("a");
        a.className = "dropdown-item";
        a.type = "a";
        a.innerHTML = taller.tallerNombre;
        // console.log(a)
         a.addEventListener("click", () =>{
          this._mostrarTaller(taller, objTaller);
         });
        itemLista.appendChild(a);
    }
  
    _mostrarTaller(taller, objTaller){     

      localStorage.setItem("current", taller.tallerNombre);

      console.log(localStorage.getItem("current"));
      let nombreTaller = document.querySelector('#STnombre');
        nombreTaller.innerHTML = taller.tallerNombre;
        let tallerFinicio = document.querySelector('#STfechai');
        tallerFinicio.innerHTML = taller.getFinicioAsString();
        let tallerFtermino = document.querySelector('#STfechat');
        tallerFtermino.innerHTML = taller.getFterminoAsString();
        let tallerDuracion = document.querySelector('#STduracion');
        tallerDuracion.innerHTML = taller.tallerDuracion;
        let tallerLimite = document.querySelector('#STLimite');
        tallerLimite.innerHTML = taller.tallerLimite;         

        //Crear botones      
        console.log(localStorage.getItem("personas"));
      let iconE = document.createElement("span");
        iconE.className = "fa fa-trash-alt";
        let btnE = document.createElement("button");        
        btnE.type = "button";
        btnE.appendChild(iconE);
        btnE.className = "btn btn-outline-danger ";
        btnE.addEventListener("click", () => { 
          
          let position = this._findKey(taller.tallerNombre);
          this._talleres[position] = objTaller;

          let Lpersonas = JSON.parse(localStorage.getItem("personas"));
          
          console.log(Lpersonas);
          let foundAt = -1; //solo lo encuentra desde el 0 en adelante. Por eso se inicializa como -1
          
          Lpersonas.forEach((e, index) => {
          console.log(e.id);
          console.log(localStorage.getItem("current"));
          
          if (e.id === localStorage.getItem("current")) {
            
            foundAt = index;
            Swal.fire({
              type: "error",
              title: "Error",
              text: "No puedes eliminar el taller si aún tiene participantes" 
              
            });
          }if(e.id != localStorage.getItem("current")){      
            Swal.fire({
              type: "success",
              title: "Error",
              text: "eliminado" 
            });
            this._talleres.splice(position, 1);
           localStorage.setItem("talleres", JSON.stringify(this._talleres));
           return;
          }

            
        });
        
         return foundAt;
   
      }); 
      nombreTaller.appendChild(btnE);  
      this._agenda.initPersonas();
    }


}