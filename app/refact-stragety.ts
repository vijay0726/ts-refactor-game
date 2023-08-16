// 商品类
export class Item {
  name: string; // 商品名称
  sellIn: number; // 销售剩余天数
  quality: number; // 商品品质值

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// 更新策略接口
export interface ItemStrategy {
  update(item: Item): void;
}

// 一般商品更新策略
export class NormalItemStrategy implements ItemStrategy {
  update(item: Item) {
    item.sellIn--; // 销售剩余天数减1
    // 销售日期过期后，品质值每日减2；否则每日减1
    item.quality = item.sellIn < 0 ? item.quality - 2 : item.quality - 1;
    // 品质值不得小于0
    item.quality = item.quality < 0 ? 0 : item.quality;
  }
}

// “Aged Brie”品质值随时间增长策略
export class AgedBrieStrategy implements ItemStrategy {
  update(item: Item) {
    item.sellIn--; // 销售剩余天数减1
    // 销售日期过期后，品质值每日加2；否则每日加1
    item.quality = item.sellIn < 0 ? item.quality + 2 : item.quality + 1;
    // 品质值不得超过50
    item.quality = item.quality > 50 ? 50 : item.quality;
  }
}

// ...其他商品更新策略

// 吉尔达玫瑰商品店
export class GildedRose {
  items: Array<Item>; // 店铺内所有商品
  // 商品更新策略对应表
  strategies: { [key: string]: ItemStrategy } = {
    normal: new NormalItemStrategy(),
    "Aged Brie": new AgedBrieStrategy(),
    // ...其他商品策略
  };

  // 构造函数，初始化商品店里的所有商品
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // 更新所有商品的品质值和销售剩余天数
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // 根据商品名称选择不同的策略进行更新，如果没有对应的策略，则使用一般商品的更新策略
      let strategy =
        this.strategies[this.items[i].name] || this.strategies["normal"];
      strategy.update(this.items[i]);
    }
    // 返回更新后的商品列表
    return this.items;
  }
}
