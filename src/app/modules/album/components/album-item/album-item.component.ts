import { Component, Input } from "@angular/core";
import { Album } from "src/app/shared/models/album.model";

@Component({
  selector: "app-album-item",
  templateUrl: "./album-item.component.html",
  styleUrls: ["./album-item.component.css"],
})
export class AlbumItemComponent {
  @Input("album") album: Album;

}
