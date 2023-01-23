import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'; //pour le drag and drop

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  newTache: Tache = {
    titre : '',
    termine : false,
    statut : ''

  };  

  //objet permettant de créer une tache avec un statut prédéfini
  newTacheUndifined: Tache = { 
    titre : '',
    termine : false,
    statut : 'Undefined'
  };

  newTacheEnAttente: Tache = { 
    titre : '',
    termine : false,
    statut : 'En Attente'
  };

  newTacheEnCours: Tache = { 
    titre : '',
    termine : false,
    statut : 'En Cours'
  };

  newTacheTerminer: Tache = { 
    titre : '',
    termine : true, //true car quand on ajoute la tache elle est deja terminé
    statut : 'Terminer' //statut terminer à ne pas confondre avec le statut termine (le statut terminer met la tache dans la liste "Terminé", le statut termine raye la tache)
  };
  //
  
  filter:string = 'Tous';

  //Ici les filtres pour chaque liste (voir filtre-tache.pipe.ts)
  filterUndefined:string = 'Undefined'
  filterEnAttente:string = 'En Attente'
  filterEnCours:string = 'En Cours'
  filterTerminer:string = 'Terminer'
  //



  constructor(private tacheService: TachesService,
    private userService: UserService,
    private router: Router){ }
  
  ngOnInit(): void {
    this.tacheService.getTaches().subscribe({ 
      next: (data:Array<Tache>) => { this.taches = data; }
      
    });

  }  

  ajouter() {
    this.tacheService.ajoutTaches(this.newTache).subscribe({
      next: (data) => {
        this.taches.push(data);
      }
    });
    
  }  

  supprimer(tache: Tache): void {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches = this.taches.filter(t => tache._id != t._id);
      }
    });

  }

  modifier(tache: Tache) {
    tache.termine = !tache.termine;
    this.tacheService.updateTaches(tache).subscribe({
      next: (data) => {
      }
    });
  }

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

  change(filter:string) {
    this.filter = filter;
  }

  /* Fonctions permettant de créer une tache avec un certain statut de départ, grâce à des objets spécifiques */
  ajouterUndifined() {
    this.tacheService.ajoutTaches(this.newTacheUndifined).subscribe({
      next: (data) => {
        this.taches.push(data);
      }
    });
    window.location.reload(); //on rajoute cette ligne dans chaque fonctions pour rafraichir la page avec que les changements soient pris en compte (on a pas réussi à faire autrement, il n'y a que avec la liste "Tous" que le changement est immédiat)
  } 

  ajouterEnAttente() {
    this.tacheService.ajoutTaches(this.newTacheEnAttente).subscribe({
      next: (data) => {
        this.taches.push(data);
      }
    });
    window.location.reload();
  }

  ajouterEnCours() {
    this.tacheService.ajoutTaches(this.newTacheEnCours).subscribe({
      next: (data) => {
        this.taches.push(data);
      }
    });
    window.location.reload();
  }

  ajouterTerminer() {
    this.tacheService.ajoutTaches(this.newTacheTerminer).subscribe({
      next: (data) => {
        this.taches.push(data);
      }
    });
    window.location.reload();
  }

  //Partie drag and drop
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        
      );
      this.ajouterEnCours()//TU T'ES ARRETER ICI
        
        
      
    }
  }
}

