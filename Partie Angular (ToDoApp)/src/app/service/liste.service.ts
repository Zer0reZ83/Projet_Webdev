//meme architecture que tache.service.ts mais on remplace tache par liste, nécessaire pour ajouter, supprimer des liste,etc...
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tache} from "../model/tache";
import { Observable } from 'rxjs';
import {Liste} from "../model/liste";

@Injectable({
  providedIn: 'root'
})
export class ListeService {
  private url:string = 'http://localhost:3000/listes/';

  constructor(private http: HttpClient) { }

  getListe():Observable<Array<Liste>> {
    return this.http.get<Array<Liste>>(this.url, {withCredentials:true});
  }

  ajoutListe(liste: Liste):Observable<Liste> {
    return this.http.post<Tache>(this.url, liste, {withCredentials:true});
  }

  updateListe(liste:Liste):Observable<Tache> {
    return this.http.put<Tache>(this.url+liste._id, liste, {withCredentials:true});
  }

  removeListe(liste:Liste):Observable<Tache> {
    return this.http.delete<Tache>(this.url+liste._id, {withCredentials:true});
  }
}
