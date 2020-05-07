import { Component } from "@angular/core";
import { AlbumService } from "src/app/core/services/Album.service";

@Component({
  selector: "app-album-home",
  templateUrl: "./album-home.component.html",
  styleUrls: ["./album-home.component.css"],
})
export class AlbumHomeComponent {
  constructor(private albumService: AlbumService) {
  }

  albums: [] = [];
  ngOnInit(): void {
    this.albumService.getAll().subscribe((response) => {
      this.albums = response.items;
      console.log(this.albums);
    });
  }
}
