import { Item } from "./Item";

export class Consumable extends Item {
  private consumed = false;
  private spoiled: boolean;

  constructor(name: string, value: number, weight: number, spoiled: boolean) {
    super(name, value, weight);
    this.spoiled = spoiled;
  }

  public get isConsumed() {
    return this.consumed;
  }

  public get isSpoiled() {
    return this.spoiled;
  }

  public setConsumed(consumed: boolean) {
    this.consumed = consumed;
  }

  public eat(): string {
    if (this.isConsumed) {
      return `There is nothing left of the ${this.name} to consume.`;
    }

    if (this.isSpoiled) {
      return `You eat the ${this.name}.\nYou feel sick.`;
    }

    if (!this.isConsumed) {
      this.setConsumed(true);

      return `You eat the ${this.name}.`;
    }

    return '';
  }

  public use(): string {
    if (!this.isConsumed && !this.isSpoiled) {
      return this.eat();
    }

    return `You use the ${this.name}`;
  }
}