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
  VIDEOS = "videos",
}

interface VideoApiResponse {
  video: string;
}

class Main {
  currentArt: Art;
  currentType: ArtType = ArtType.Random;
  interval: NodeJS.Timer;
  switch = true;

  constructor() {
    this.setInterval();
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
            case "delete":
              this.deleteArt();
              break;
            case "favorite":
              this.favoriteArt();
              break;
            case "type-random":
              this.switchType(ArtType.Random);
              this.switch = true;
              break;
            case "type-cached":
              this.switchType(ArtType.Cached);
              this.switch = false;
              break;
            case "type-favorited":
              this.switchType(ArtType.Favorited);
              this.switch = false;
              break;
            case "type-videos":
              this.switchType(ArtType.Videos);
              this.switch = false;
              break;
            case "refresh":
              window.location.reload();
              break;
          }
        }
      }
    });
  };

  deleteArt = () => {
    if (this.currentType === ArtType.Videos) {
      Api.deleteArt(this.currentArt.id);
      this.getNewArt(true);
    }
  };

  notify = (type: NotificationType) => {
    const notification = DomElement.create(`div.notification.${type}`);
    document.body.append(notification);
    setTimeout(() => notification.remove(), 3200);
  };

  setInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.getNewArt();
    }, 750000);
  };

  getNewArt = (notify = false) => {
    if (this.currentType !== ArtType.Videos) {
      if (notify) {
        this.notify(NotificationType.NEWART);
      }
      Api.getArt(this.currentType).then((art) => {
        if (art && art.id && art.id !== this.currentArt?.id) {
          this.currentArt = art;
          this.renderArt();
        }
      });
    } else {
      Api.getArt(this.currentType).then((video) => {
        this.renderVideo(video);
      });
    }
  };

  listenForInstructions = () => {
    this.connectToSocket();
    document.body.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "d":
          this.deleteArt();
          break;
        case "v":
          this.switchType(ArtType.Videos);
          this.switch = false;
          break;
        case "ArrowRight":
          this.getNewArt(true);
          break;
        case "ArrowUp":
          this.switchType(ArtType.Cached);
          this.switch = false;
          break;
        case "ArrowDown":
          this.switchType(ArtType.Random);
          this.switch = true;
          break;
        case "ArrowLeft":
          this.switchType(ArtType.Favorited);
          this.switch = false;
          break;
        case "f":
        case "Enter":
          this.favoriteArt();
          break;
      }
    });
  };

  randomSwitch() {
    if (this.switch) {
      const randomNum = Math.floor(Math.random() * 4);
      switch (randomNum) {
        case 0:
          this.switchType(ArtType.Random);
          break;
        case 1:
          this.switchType(ArtType.Cached);
          break;
        case 2:
          this.switchType(ArtType.Favorited);
          break;
        case 3:
          this.switchType(ArtType.Videos);
          break;
      }
    }
  }

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
      case ArtType.Videos:
        this.notify(NotificationType.VIDEOS);
        break;
    }
    this.getNewArt();
  }

  favoriteArt = () => {
    if (this.currentType !== ArtType.Videos) {
      Api.favoriteArt(this.currentArt.id).then((art) => {});
      const heart = DomElement.create('span.heart[innerText="❤️"]');
      document.body.append(heart);
      setTimeout(() => heart.remove(), 4000);
    }
  };

  hideCurrentArt = () => {
    const artOnPage = document.querySelector(".frame");
    setTimeout(() => {
      artOnPage?.remove();
    }, 4000);
  };

  renderArt = () => {
    this.hideCurrentArt();
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

  renderVideo = (videoResponse: VideoApiResponse) => {
    this.hideCurrentArt();
    const frame = DomElement.create("div.frame.video");
    const mat = DomElement.create("div.mat");
    const container = DomElement.create("div.container");
    const video = DomElement.create(
      `video[autoplay=true][loop=true][muted=true][src="/videos/${videoResponse.video}"]`
    );
    container.append(mat);
    container.append(video);
    frame.append(container);
    document.body.append(frame);
    setTimeout(() => frame.classList.add("fade-in"), 2000);
  };
}

new Main();
