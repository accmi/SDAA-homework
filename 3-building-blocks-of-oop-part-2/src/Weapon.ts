import { Item } from './Item';

export abstract class Weapon extends Item {
  static MODIFIER_CHANGE_RATE = 0.05;

  protected baseDamage: number;
  protected damageModifier: number;
  protected baseDurability: number;
  protected durabilityModifier: number;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
    this.damageModifier = Weapon.MODIFIER_CHANGE_RATE;
    this.durabilityModifier = Weapon.MODIFIER_CHANGE_RATE;
  }

  public abstract polish(): void;

  public get getBaseDamage(): number {
    return this.baseDamage;
  }

  public get getDamageModifier(): number {
    return this.damageModifier;
  }

  public get getBaseDurability(): number {
    return this.baseDurability;
  }

  public get getDurabilityModifier(): number {
    return this.durabilityModifier;
  }


  public setBaseDamage(baseDamage: number) {
    this.baseDamage = baseDamage;
  }

  public setDamageModifier(damageModifier: number) {
    this.damageModifier = damageModifier;
  }

  public setBaseDurability(baseDurability: number) {
    this.baseDurability = baseDurability;
  }

  public setDurabilityModifier(durabilityModifier: number) {
    this.durabilityModifier = durabilityModifier;
  }

  public getDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  public getDurability(): number {
    return this.baseDurability + this.durabilityModifier;
  }

  public use(): string {
    let description = `You use the ${this.name}, dealing ${this.getDamage()} points of damage.`;

    if (this.getDurability() <= 0) {
      return "You can't use the hammer, it is broken.";
    }

    if (this.getDurability() - Weapon.MODIFIER_CHANGE_RATE <= 0) {
      description += 'The hammer breaks.';
    }

    return description;
  }
  public toString(): string {
    return `${this.name} − Value: ${this.value}, Weight: ${this.weight}, Damage: ${this.getDamage()}, Durability: ${this.getDurability()}%`;
  }
}
