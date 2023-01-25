export interface Tache {
    _id?:string;    //? car à la création de la tache, on ne connait pas son id
    titre:string;
    termine:boolean;
    statut?:string; //car à la création de la tache on ne connait pas directement son statut 
}

