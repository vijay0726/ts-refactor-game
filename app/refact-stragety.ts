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

export interface ItemStrategy {
  update(item: Item): void;
}

export class NormalItemStrategy implements ItemStrategy {
  update(item: Item) {
    item.sellIn--;
    item.quality = item.sellIn < 0 ? item.quality - 2 : item.quality - 1;
    item.quality = item.quality < 0 ? 0 : item.quality;
  }
}

export class AgedBrieStrategy implements ItemStrategy {
  update(item: Item) {
    item.sellIn--;
    item.quality = item.sellIn < 0 ? item.quality + 2 : item.quality + 1;
    item.quality = item.quality > 50 ? 50 : item.quality;
  }
}

// 其他商品策略...

export class GildedRose {
  items: Array<Item>;
  strategies: { [key: string]: ItemStrategy } = {
    normal: new NormalItemStrategy(),
    "Aged Brie": new AgedBrieStrategy(),
    // 其他商品...
  };

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // 根据不同的商品名称 获取不同的策略
      let strategy =
        this.strategies[this.items[i].name] || this.strategies["normal"];
      strategy.update(this.items[i]);
    }

    return this.items;
  }
}
