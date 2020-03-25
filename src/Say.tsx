export interface ISay {
  say: () => string;
}

export class WorldService implements ISay {
  static serviceName = "HelloService";
  public say() {
    return "Big World";
  }
}

export class SayService implements ISay {
  constructor(public message: string) {
  }

  static serviceName = "SayService";

  public say() {
    return this.message;
  }
}
