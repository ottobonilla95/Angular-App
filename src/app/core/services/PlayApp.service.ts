import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menuitem.model';

@Injectable({
  providedIn: "root",
})
export class PlayAppService {
  constructor(private client: HttpClient) {}

  getMenu():Observable<MenuItem[]> {
    return this.client.get<MenuItem[]>(environment.baseUrl + "playapp/getmenu", {});
  }
}
