import { Weapon } from './Weapon';

export class Bow extends Weapon {

  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super('bow', baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    const nextDurabilityModifier = this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE;
    
    if (nextDurabilityModifier < 1) {
      this.setDurabilityModifier(this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE);
    }
  }
}
