import {
  Item,
  GildedRose,
  NormalItemStrategy,
  AgedBrieStrategy,
} from "@/refact-stragety";

describe("GildedRose", () => {
  it("should decrease the sellIn and the quality for normal items", () => {
    const gildedRose = new GildedRose([new Item("normal", 10, 20)]);
    const items = gildedRose.updateQuality();
    // 执行updateQuality后，quality和sellIn应该分别减1
    expect(items[0].quality).toEqual(19);
    expect(items[0].sellIn).toEqual(9);
  });

  it('should increase the quality for "Aged Brie"', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    // 执行updateQuality后，quality应该增加1，sellIn减1
    expect(items[0].quality).toEqual(21);
    expect(items[0].sellIn).toEqual(9);
  });

  // 更多测试用例，如sellIn小于0时或quality超过50时的情况
});

describe("NormalItemStrategy", () => {
  let strategy: NormalItemStrategy;

  beforeEach(() => {
    strategy = new NormalItemStrategy();
  });

  // 测试项
  it("Normal商品 销售日过期后，品质每日减1", () => {
    const item = new Item("normal", 2, 20);
    strategy.update(item);
    expect(item.quality).toEqual(19);
  });

  it("Normal商品 销售日过期后，品质每日减2", () => {
    const item = new Item("normal", 2, 20);
    while (item.sellIn >= 0) {
      strategy.update(item);
      console.log("item.sellIn, item.quality", item.sellIn, item.quality);
    }
    expect(item.quality).toEqual(16);
  });
});

describe("AgedBrieStrategy", () => {
  let strategy: AgedBrieStrategy;

  beforeEach(() => {
    strategy = new AgedBrieStrategy();
  });

  // 测试项
  it("Aged Brie商品， 销售未过期，品质每日加1", () => {
    const item = new Item("Aged Brie", 2, 20);
    strategy.update(item);
    expect(item.quality).toEqual(21);
  });

  it("Aged Brie商品， 销售过期后，品质每日加2", () => {
    const item = new Item("Aged Brie", 2, 20);
    while (item.sellIn >= 0) {
      strategy.update(item);
    }
    expect(item.quality).toEqual(24);
  });
});

// 测试其他策略…
