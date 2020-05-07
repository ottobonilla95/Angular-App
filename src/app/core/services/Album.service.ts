import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  constructor(private client: HttpClient) {}

  getAll(): Observable<any> {
    return this.client.get(environment.baseUrl + "album");
  }
}
