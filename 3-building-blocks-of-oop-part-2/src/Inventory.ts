import { Item } from "./Item";
import { ItemComparator } from './ItemComparator';

export class Inventory {
  protected items: Item[] = [];

  public addItem(item: Item) {
    this.items.push(item);
  }

  public sort(comparator?: ItemComparator): void {
    if (comparator) {
      this.items.sort(comparator.compare);
      return;
    }

    this.items.sort((a, b) => a.getValue - b.getValue);
  }

  public toString(): string {
    return this.items.join(', ');
  }
}
