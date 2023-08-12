export class DomElement {
  elType: RegExpMatchArray | null;

  classes: RegExpMatchArray | null;

  id: RegExpMatchArray | null;

  attributes: RegExpMatchArray | null;

  el: HTMLElement;

  /* eslint-disable no-useless-escape */
  constructor(creationString: string) {
    this.elType = creationString.match(/^(\w)*/g);
    this.classes = creationString.match(
      /(?<!\[[^\]]*)\.(?![^\[]*\])([^\s\.\#\[]*)/g
    );
    this.id = creationString.match(/\#([^\s\.\[]*)/g);
    this.attributes = creationString.match(/\[([^\]]*)/g);
    if (this.elType) {
      this.el = document.createElement(this.elType[0]);
      if (this.classes && this.classes.length > 0) {
        this.classes.forEach((className) => {
          this.el.classList.add(className.replace(".", ""));
        });
      }
      if (this.attributes && this.attributes.length > 0) {
        this.attributes.forEach((attributeString) => {
          const attribute = attributeString.split("=");
          if (attribute.length === 1) {
            attribute.push("");
          } else {
            const fullAttribute =
              attribute.length > 2
                ? attribute.slice(1).join("=")
                : attribute[1];
            attribute[1] = fullAttribute.replace(/"/g, "");
          }
          attribute[0] = attribute[0].replace("[", "");
          this.el.setAttribute(attribute[0], attribute[1]);
        });
      }
      if (this.id && this.id.length === 1) {
        this.el.id = this.id[0].replace("#", "");
      }
    }
  }

  public static create(creationString: string): HTMLElement {
    return new DomElement(creationString).el;
  }
}
