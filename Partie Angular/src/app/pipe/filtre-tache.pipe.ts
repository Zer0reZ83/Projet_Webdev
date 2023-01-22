import { Pipe, PipeTransform } from '@angular/core';
import { TachesComponent } from '../component/taches/taches.component';
import { Tache } from '../model/tache';

@Pipe({
  name: 'filtreTache'
})
export class FiltreTachePipe implements PipeTransform {

  transform(value: Array<Tache>, filter:string): Array<Tache> {
    if (!value) {
      return value;
    }

    switch(filter) {
      case 'Actif':
        return value.filter( tache =>  !tache.termine)
        break;
      case 'Termine':
        return value.filter( tache =>  tache.termine)
      case 'Tous':
        return value;
        break;
      //Ici on modifie le filtre pour qu'on affiche seulement les taches qui ont un certain statut pour chaque liste 
      case 'Undefined':
        return value.filter(tache => tache.statut === "Undefined")
        break;

      case 'En Cours':
        return value.filter(tache => tache.statut === "En Cours")
        break;

      case 'En Attente':
        return value.filter(tache => tache.statut === "En Attente")
        break;
      
      case 'Terminer':
        return value.filter(tache => tache.statut === "Terminer")
        break;
      //
      default:
        return value;

    }

  }

}
