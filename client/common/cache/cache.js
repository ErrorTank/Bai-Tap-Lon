

export class Cache {
  engine = null;

  constructor(engine = localStorage) {
    this.engine = engine
  }

  get = (key) => {
    let vStr = this.engine.getItem(key);
    if (vStr == null) {
      return null;
    }
    return typeof vStr === "object" ? JSON.parse(vStr) : null;
  };

  set = (value, key) => {
    if (value == null) {
      this.engine.removeItem(key);
    } else {
      try {
        this.engine.setItem(key, JSON.stringify(value));
      } catch (e) {
        // May throw exception if not enough memory allocated or in Safari's private mode
      }
    }
  };
}




