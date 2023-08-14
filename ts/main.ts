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
    this.listenForInstructions();
  }

  getNewArt = () => {
    Api.getArt(this.currentType).then((art) => {
      if (art && art.id && art.id !== this.currentArt?.id) {
        this.currentArt = art;
        this.renderArt();
      }
    });
  };

  listenForInstructions = () => {
    document.body.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowRight":
          this.getNewArt();
          break;
        case "ArrowUp":
          this.currentType = ArtType.Cached;
          this.getNewArt();
          break;
        case "ArrowDown":
          this.currentType = ArtType.Random;
          this.getNewArt();
          break;
        case "ArrowLeft":
          this.currentType = ArtType.Favorited;
          this.getNewArt();
          break;
        case "f":
        case "Enter":
          this.favoriteArt();
          break;
      }
    });
  };

  favoriteArt = () => {
    Api.favoriteArt(this.currentArt.id).then((art) => {});
    const heart = DomElement.create('span.heart[innerText="❤️"]');
    document.body.append(heart);
    setTimeout(() => heart.remove(), 4000);
  };

  renderArt = () => {
    const artOnPage = document.querySelector(".frame");
    setTimeout(() => {
      artOnPage?.remove();
    }, 4000);
    const frame = DomElement.create("div.frame");
    const mat = DomElement.create("div.mat");
    const art = DomElement.create(
      `img.art[style="background-image:url(/images/${this.currentArt.id}.jpg);"]`
    );
    frame.append(mat);
    frame.append(art);
    document.body.append(frame);
    setTimeout(() => frame.classList.add("fade-in"), 2000);
  };
}

new Main();
