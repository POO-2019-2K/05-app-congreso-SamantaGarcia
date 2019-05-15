export default class Taller{
    constructor(taller){
        this._tallerNombre = taller.tallerNombre;
        this._tallerFinicio = new Date(taller.tallerFinicio);
        this._tallerFtermino = new Date(taller.tallerFtermino);
        this._tallerDuracion = taller.tallerDuracion;
        this._tallerLimite = taller.tallerLimite;
    }

    get tallerNombre(){
        return this._tallerNombre;
    }
    get tallerFinicio(){
        return this._tallerFinicio;
    }
    get tallerFtermino(){
        return this._tallerFtermino;
    }
    get tallerDuracion(){
        return this._tallerDuracion;
    }
    get tallerLimite(){
        return this._tallerLimite;
    }

    getFinicioAsString() {
        let Finicio =
          this._tallerFinicio.getDate() +
          "/" +
          this._tallerFinicio.getMonth() +
          "/" +
          this._tallerFinicio.getFullYear();
    
        return Finicio;
      }

    getFterminoAsString() {
        let Ftermino =
          this._tallerFtermino.getDate() +
          "/" +
          this._tallerFtermino.getMonth() +
          "/" +
          this._tallerFtermino.getFullYear();
    
        return Ftermino;
      }

      getDuracionAsString(){
          console.log(this._tallerDuracion);
          let hora =
          ("0" + this._tallerDuracion.getHours()).slice(-2) + ':' + ("0" + this._tallerDuracion.getMinutes()).slice(-2);       

        return hora;
      }

}