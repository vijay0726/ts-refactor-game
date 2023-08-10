export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let qualityChange = -1;
      if (
        this.items[i].name == "Aged Brie" ||
        this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
      ) {
        qualityChange = 1;
        if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
          if (this.items[i].sellIn < 11 && this.items[i].sellIn > 5)
            qualityChange = 2;
          else if (this.items[i].sellIn <= 5) qualityChange = 3;
          else if (this.items[i].sellIn < 0)
            qualityChange = -this.items[i].quality;
        }
      } else if (
        this.items[i].name == "Conjured" ||
        this.items[i].name.includes("Conjured")
      ) {
        qualityChange *= 2;
      }
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        qualityChange = 0;
      }
      if (this.items[i].sellIn <= 0 && this.items[i].name !== "Aged Brie") {
        qualityChange *= 2;
      }
      this.items[i].quality = Math.min(
        50,
        this.items[i].quality + qualityChange
      );
      this.items[i].quality = Math.max(0, this.items[i].quality);
      if (this.items[i].name !== "Sulfuras, Hand of Ragnaros")
        this.items[i].sellIn -= 1;
    }

    return this.items;
  }
}
