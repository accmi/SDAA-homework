import { Comparable } from './Comparable';

let id = 0;
let counter = 0;

export abstract class Item implements Comparable<Item> {
    protected id: number;
    protected value: number;
    protected name: string;
    protected weight: number;

    constructor(name: string, value: number, weight: number) {
        this.name = name;
        this.value = value;
        this.weight = weight;
        this.id = id;
        id++;
        counter++;
    }

    public abstract use(): string;

    public compareTo(other: Item): number {
        if (this.value > other.value) {
            return 1;
        }

        if (this.value === other.value) {
            return this.name.localeCompare(other.name);
        }

        return -1;
    }

    public get getId(): number {
        return this.id;
    }

    public get getValue(): number {
        return this.value;
    }

    public get getWeight(): number {
        return this.weight;
    }

    public setValue(price: number) {
        this.value = price;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setWeight(weight: number) {
        this.weight = weight;
    }

    public toString(): string {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight}`;
    }


    public static reset() {
        id = 0;
        counter = 0;
    }

    public static get numberOfItems(): number {
        return counter;
    }
}
