import Taller from "./taller.js";

export default class Talleres{
    constructor(seccionTaller1,seccionTaller2,tablaBtn){
        this._seccionTaller1 = seccionTaller1;
        this._seccionTaller2 = seccionTaller2;
        this._tablaBtn = tablaBtn;
        this._talleres = [];

        this._initTalleres();
    }

    _initTalleres(){
        //localStorage.removeItem("talleres");
        let Ltalleres = JSON.parse(localStorage.getItem("talleres"));
        console.log(Ltalleres);
        if (Ltalleres === null) {
            return;                 
          }

          Ltalleres.forEach((e, index) => { //Para probar localstorage sin esto
            e.tallerFinicio = new Date(e.tallerFinicio);
            this.seccionTaller1(new Taller(Ltalleres));

          });
    }
    seccionTaller1(taller){   
        
        let itemLista = document.querySelector('#itemTaller');
        itemLista.innerHTML = taller.tallerNombre;
        let nombreTaller = document.querySelector('#STnombre');
        nombreTaller.innerHTML = taller.tallerNombre;
        let tallerFinicio = document.querySelector('#STfechai');
        tallerFinicio.innerHTML = taller.getFinicioAsString();
        let tallerFtermino = document.querySelector('#STfechat');
        tallerFtermino.innerHTML = taller.getFterminoAsString();
        let tallerDuracion = document.querySelector('#STduracion');
        tallerDuracion.innerHTML = taller.getDuracionAsString();

        let objTaller = {
            tallerNombre : taller.tallerNombre,
            tallerFinicio : taller.tallerFinicio,
            tallerFtermino : taller.tallerFtermino,
            tallerDuracion : taller.tallerDuracion
          };
      
          this._talleres.push(objTaller); 
          console.log(this._talleres);
          localStorage.setItem("talleres", JSON.stringify(this._talleres));

    }

    

}