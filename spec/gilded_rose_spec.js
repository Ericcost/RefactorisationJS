var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose Service", function() {

//Full Test

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

// Example Test
  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });


// Backstage passes test

  it("the quality should increase by 3 when it remains 5 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 2, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(3);
    expect(items[0].quality).toBe(13);
    expect(items[1].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[1].sellIn).toBe(1);
    expect(items[1].quality).toBe(8);
  })

  it("the quality should increase by 2 when it remains 10 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 31), new Item("Backstage passes to a TAFKAL80ETC concert", 6, 27)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 33));
    expect(items[1]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 29));
  })

  it("the quality should increase by one when it remains 11 or more days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 13, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 20, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 12, 11));
    expect(items[1]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 19, 6));
  })

  it("the quality should be at 0 after the concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 42)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0));
  })

// Sulfuras test

  it("Sulfuras should never has to be sold or decreases in Quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  })

// Once the sell by date has passed test

  it ("Once the sell by date has passed, the quality should degrades twice as fast", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 7), new Item("Elixir of the Cobra", 0, 5), new Item("Elixir of the Leopard", -1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Elixir of the Mongoose", 4, 6));
    expect(items[1]).toEqual(new Item("Elixir of the Cobra", -1, 3));
    expect(items[2]).toEqual(new Item("Elixir of the Leopard", -2, 1));
  })

// The quality can never be less than 0 test

  it ("The quality should never be less than 0", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 7), new Item("Elixir of the Cobra", 0, 1), new Item("Elixir of the Leopard", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Elixir of the Mongoose", 4, 6));
    expect(items[1]).toEqual(new Item("Elixir of the Cobra", -1, 0));
    expect(items[2]).toEqual(new Item("Elixir of the Leopard", -2, 0));
  })

// "Aged Brie" test

  it ("Aged Brie should increases in Quality the older it gets but it gets to 0 after the concert", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 16, 9), new Item("Aged Brie", 0, 29)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 15, 10));
    expect(items[1]).toEqual(new Item("Aged Brie", -1, 0));
  })

// The quality of the product shouldn't be more than 50 

it ("The quality of the product shouldn't be more than 50 ", function() {
  const gildedRose = new Shop([new Item("Aged Brie", 5, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 3, 47), new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49)]);
  const items = gildedRose.updateQuality();
  expect(items[0]).toEqual(new Item("Aged Brie", 4, 50));
  expect(items[1]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50));
  expect(items[2]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50));
})

// Conjured Test

it ("Conjured items degrade in Quality twice as fast as normal items", function() {
  const gildedRose = new Shop([new Item("Conjured lolipop", 5, 50), new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 1, 15), new Item("Conjured symfony", 0, 6)]);
  const items = gildedRose.updateQuality();
  expect(items[0]).toEqual(new Item("Conjured lolipop", 4, 48));
  expect(items[1]).toEqual(new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 0, 13));
  expect(items[2]).toEqual(new Item("Conjured symfony", -1, 2));
})

});




