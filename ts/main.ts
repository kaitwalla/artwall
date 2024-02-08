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
  currentType: ArtType = ArtType.Videos;
  interval: ReturnType<typeof setInterval>;
  switch = true;
  offline: HTMLImageElement;
  container: HTMLDivElement;

  constructor() {
    this.container = document.getElementById("container") as HTMLDivElement;
    this.offline = document.getElementById("offline") as HTMLImageElement;
    this.setInterval();
    this.getNewArt();
    this.listenForInstructions();
  }

  connectToSocket = () => {
    const socket = new WebSocket(
      `wss://${env.GOTIFY_SERVER_URL}/stream?token=${env.GOTIFY_TOKEN}`,
    );

    socket.onclose = (error: Event) => {
      this.offline.style.display = "block";
      setTimeout(() => {
        this.connectToSocket();
      }, 15000);
    };

    socket.onerror = (error: Event) => {
      socket.close();
    };

    socket.onopen = () => {
      this.offline.style.display = "none";
      socket.addEventListener("message", (event: MessageEvent<any>) => {
        if (event) {
          const message = JSON.parse(event.data);
          if (message.appid === 2) {
            setTimeout(() => {
              const plexDiv = document.querySelectorAll(".plex");
              if (plexDiv.length > 0) {
                for (const iframe of Array.from(plexDiv)) {
                  iframe.setAttribute(
                    "src",
                    iframe.getAttribute("src") as string,
                  );
                }
              }
            }, 500);
          }
          if (message.title === "client:command") {
            switch (message.message) {
              case "refresh-status":
                setTimeout(this.refreshStatus, 1000);
                break;
              case "paint":
                this.paintFrame();
                break;
              case "move":
                this.moveFrame();
                break;
              case "next":
                this.randomSwitch();
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
  };

  refreshStatus = () => {
    const frame = document.getElementById("status") as HTMLIFrameElement;
    frame.setAttribute("src", frame.getAttribute("src") as string);
  };

  deleteArt = () => {
    if (this.currentType !== ArtType.Videos) {
      Api.deleteArt(this.currentArt.id);
      this.randomSwitch();
    }
  };

  paintFrame = () => {
    document.getElementById("container")?.classList.toggle("dark`");
  };

  moveFrame = () => {
    document.getElementById("container")?.classList.toggle("bottom");
  };

  notify = (type: NotificationType) => {
    const notification = DomElement.create(`div.notification.${type}`);
    this.container.append(notification);
    setTimeout(() => notification.remove(), 3200);
  };

  setInterval = () => {
    setInterval(() => {
      this.refreshStatus();
    }, 300000);
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.randomSwitch();
      const randomNum = Math.floor(Math.random() * 10) + 1;
      if (randomNum % 2 == 0) {
        this.moveFrame();
      }
      if (randomNum % 3 == 0) {
        this.paintFrame();
      }
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
          this.randomSwitch();
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
      this.setInterval();
      const randomNum = Math.floor(Math.random() * 3) + 1;
      switch (randomNum) {
        case 1:
          this.switchType(ArtType.Random);
          break;
        case 2:
          this.switchType(ArtType.Cached);
          break;
        case 3:
          this.switchType(ArtType.Favorited);
          break;
        case 4:
          this.switchType(ArtType.Videos);
          break;
      }
    } else {
      this.getNewArt();
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
    if (artOnPage) {
      setTimeout(() => {
        (artOnPage as HTMLDivElement).remove();
      }, 6000);
    }
  };

  renderArt = () => {
    this.hideCurrentArt();
    const frame = DomElement.create("div.frame");
    const art = DomElement.create(
      `img.art[style="background-image:url(/images/${this.currentArt.id}.jpg);"]`,
    );
    frame.append(art);
    this.container.append(frame);
    setTimeout(() => frame.classList.add("fade-in"), 3000);
  };

  renderVideo = (videoResponse: VideoApiResponse) => {
    this.hideCurrentArt();
    const frame = DomElement.create("div.frame.video");
    const container = DomElement.create("div.container");
    const video = DomElement.create(
      `video[autoplay=true][loop][playsinline][muted][src="/videos/${videoResponse.video}"]`,
    ) as HTMLVideoElement;
    video.muted = true;
    container.append(video);
    frame.append(container);
    this.container.append(frame);
    setTimeout(() => frame.classList.add("fade-in"), 2000);
  };
}

new Main();
