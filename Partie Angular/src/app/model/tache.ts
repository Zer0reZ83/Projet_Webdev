export interface Tache {
    _id?:string;    //? car à la création de la tache, on ne connait pas son id
    titre:string;
    termine:boolean;
    type_tache:string;
}