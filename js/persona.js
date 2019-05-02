export default class Persona{
    constructor(persona){
        this._personaNombre = persona.personaNombre;
        this._personaEmail = persona.personaEmail;
        this._personaFnacimiento = new Date(persona.personaFnacimiento);
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
          this._personaFnacimiento.getDate() +
          "/" +
          this._personaFnacimiento.getMonth() +
          "/" +
          this._personaFnacimiento.getFullYear();
    
        return F;
      }
}
