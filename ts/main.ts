import { env } from "./env";
import { Api } from "./api";
import { Art, ArtType } from "./interface/art";
import { DomElement } from "./domEl";
import "../scss/main.scss";

enum NotificationType {
  NEWART = "newArt",
  RANDOMART = "randomArt",
  CACHEDART = "cachedArt",
  FAVORITEDART = "favoritedArt",
}

class Main {
  currentArt: Art;
  currentType: ArtType = ArtType.Cached;
  constructor() {
    setInterval(() => {
      this.getNewArt();
    }, 500000);
    this.getNewArt();
    this.listenForInstructions();
  }

  connectToSocket = () => {
    const socket = new WebSocket(
      `wss://${env.GOTIFY_SERVER_URL}/stream?token=C8Xi7C5QAOEyKLW`
    );

    socket.addEventListener("message", (event: MessageEvent<any>) => {
      if (event) {
        const message = JSON.parse(event.data);
        if (message.title === "client:command") {
          switch (message.message) {
            case "next":
              this.getNewArt(true);
              break;
            case "favorite":
              this.favoriteArt();
              break;
            case "type-random":
              this.switchType(ArtType.Random);
              break;
            case "type-cached":
              this.switchType(ArtType.Cached);
              break;
            case "type-favorited":
              this.switchType(ArtType.Favorited);
              break;
          }
        }
      }
    });
  };

  notify = (type: NotificationType) => {
    const notification = DomElement.create(`div.notification.${type}`);
    document.body.append(notification);
    setTimeout(() => notification.remove(), 3200);
  };

  getNewArt = (notify = false) => {
    if (notify) {
      this.notify(NotificationType.NEWART);
    }
    Api.getArt(this.currentType).then((art) => {
      if (art && art.id && art.id !== this.currentArt?.id) {
        this.currentArt = art;
        this.renderArt();
      }
    });
  };

  listenForInstructions = () => {
    this.connectToSocket();
    document.body.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowRight":
          this.getNewArt(true);
          break;
        case "ArrowUp":
          this.switchType(ArtType.Cached);
          break;
        case "ArrowDown":
          this.switchType(ArtType.Random);
          break;
        case "ArrowLeft":
          this.switchType(ArtType.Favorited);
          break;
        case "f":
        case "Enter":
          this.favoriteArt();
          break;
      }
    });
  };

  switchType(type: ArtType) {
    this.currentType = type;
    switch (type) {
      case ArtType.Cached:
        this.notify(NotificationType.CACHEDART);
        break;
      case ArtType.Random:
        this.notify(NotificationType.RANDOMART);
        break;
      case ArtType.Favorited:
        this.notify(NotificationType.FAVORITEDART);
        break;
    }
    this.getNewArt();
  }

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
