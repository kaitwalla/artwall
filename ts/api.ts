import { ArtType } from "./interface/art";

export class Api {
  public static getArt = async (type: ArtType) => {
    let action: string;
    switch (type) {
      case ArtType.Cached:
        action = "randomArt";
        break;
      case ArtType.Favorited:
        action = "favorites";
        break;
      case ArtType.Random:
      default:
        action = "randomNewArt";
        break;
    }
    return fetch("action.php?action=" + action).then((response) =>
      response.json()
    );
  };

  public static deleteArt = async (id: number) => {
    return fetch("action.php?action=deleteArt&id=" + id);
  };

  public static favoriteArt = async (id: number) => {
    return fetch("action.php?action=favorite&id=" + id).then((response) =>
      response.json()
    );
  };
}
