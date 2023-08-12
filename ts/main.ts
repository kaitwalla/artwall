import { Api } from "./api";
import { Art, ArtType } from "./interface/art";
import { DomElement } from "./domEl";
import "../scss/main.scss";

class Main {
  currentArt: Art;
  currentType: ArtType = ArtType.Random;
  constructor() {
    setInterval(() => {
      this.getNewArt();
    }, 500000);
    this.getNewArt();
  }

  getNewArt = () => {
    Api.getArt(this.currentType).then((art) => {
      if (art && art.id && art.id !== this.currentArt?.id) {
        this.currentArt = art;
        this.renderArt();
      }
    });
  };

  renderArt = () => {
    const artOnPage = document.querySelector(".frame");
    setTimeout(() => {
      artOnPage?.remove();
    }, 4000);
    const frame = DomElement.create("div.frame");
    const mat = DomElement.create("div.mat");
    const art = DomElement.create(
      `img.art[src="/images/${this.currentArt.id}.jpg"]`
    );
    frame.append(mat);
    frame.append(art);
    document.body.append(frame);
    setTimeout(() => frame.classList.add("fade-in"), 2000);
  };
}

new Main();
