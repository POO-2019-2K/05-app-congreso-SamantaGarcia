import Taller from "./taller.js";

export default class Talleres{
    constructor(seccionTaller1,seccionTaller2,tablaPersonas, dropdown){
        this._seccionTaller1 = seccionTaller1;
        this._seccionTaller2 = seccionTaller2;
        this._tablaPersonas = tablaPersonas;
        this._dropdown = dropdown;
        this._talleres = [];
        this._personas = [];

        this._initTalleres();
    }

    _initTalleres(){
        let Ltalleres = JSON.parse(localStorage.getItem("talleres"));
        if (Ltalleres === null) {
            return;           
          }

          this.seccionTaller1(new Taller(Ltalleres));
          
    }
    seccionTaller1(taller){        
        let itemLista = document.querySelector('#itemTaller');
        itemLista.innerHTML = taller.tallerNombre;


        let nombreTaller = document.querySelector('#STnombre');
        nombreTaller.innerHTML = taller.tallerNombre;

        let objTaller = {
            tallerNombre: taller.tallerNombre
          };
      
          this._talleres.push(objTaller); 
          console.log(this._talleres);
          localStorage.setItem("talleres", JSON.stringify(this._talleres));

    }

}