import { Consumable } from './Consumable';

export class Pizza extends Consumable {
  public static SLICE_WEIGHT = 100;
  private numberOfSlices: number;
  private slicesEaten: number;

  constructor(numberOfSlices: number, spoiled: boolean) {
    super('pizza', numberOfSlices, numberOfSlices * Pizza.SLICE_WEIGHT, spoiled);
  }

  public eat(): string {
    if (this.slicesEaten < this.numberOfSlices) {
      this.slicesEaten++;

      if (this.slicesEaten >= this.numberOfSlices) {
        this.setConsumed(true);
      }

      return 'You eat a slice of the pizza';
    }

    return '';
  }
}