import { Component, Input } from "@angular/core";

@Component({
  selector: "app-item-list-bar",
  templateUrl: "./item-list-bar.component.html",
  styleUrls: ["./item-list-bar.component.scss"],
})
export class ItemListBarComponent {
  @Input("menuitem") menuitem;
  style;
  styleLink;
  ngOnInit(): void {
    this.style = {
      "background-color": `rgb(155,155,155,${this.menuitem.opacity/10})`,
    };
    this.styleLink = {
      "background-color": `rgb(155,155,155,${this.menuitem.opacity+1/10})`,
    };
  }
}
