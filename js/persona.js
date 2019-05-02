import Taller from "./taller";

export default class Persona{
    constructor(persona){
        this._personaNombre = persona.personaNombre;
        this._personaEmail = persona.personaEmail;
        this._personaFnacimiento = persona.personaFnacimiento;
    }

    get personaNombre(){
        return this._personaNombre;
    }
    get personaEmail(){
        return this._personaEmail;
    }
    get personaFnacimiento(){
        return this._personaFnacimiento;
    }

    getFAsString() {
        let F =
          this._tallerFinicio.getDate() +
          "/" +
          this._tallerFinicio.getMonth() +
          "/" +
          this._tallerFinicio.getFullYear();
    
        return F;
      }
}
