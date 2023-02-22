class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (this.isConjured(item)) {
        this.decreaseQuality(item);
      }
      if (this.isAgedBrie(item)) {
        this.increaseQuality(item, 1);
      } 
      else if (this.isBackstagePass(item)) {
        this.updateBackstagePass(item);
      }
      else if (this.isNormalItem(item)) {
        this.decreaseQuality(item);
      }
      else if (this.isSulfuras(item)) {
        this.legendaryItem(item);
      }
      this.updateSellIn(item);
      if (this.isExpired(item)) {
        if (this.isAgedBrie(item)) {
          this.resetQuality(item);
        } 
        else if (this.isBackstagePass(item)) {
          this.resetQuality(item);
        } 
        else if (this.isSulfuras(item)) {
          item.quality === 80;
        }
      }
    });

    return this.items;

  }

  isAgedBrie(item) {
    return item.name === 'Aged Brie';
  }

  isBackstagePass(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  isNormalItem(item) {
    return !this.isAgedBrie(item) && !this.isBackstagePass(item) && !this.isSulfuras(item) && !this.isConjured(item) && item.quality > 0;
  }

  isSulfuras(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  isConjured(item) {
    return item.name.startsWith('Conjured');
  }

  decreaseQuality(item) { 
    if (item.name.startsWith('Conjured')) {
      item.quality = item.sellIn < 1 ? item.quality - 4 : item.quality - 2;
      item.quality = item.quality < 0 ? 0 : item.quality
    } else {
    item.quality = item.sellIn < 1 ? item.quality - 2 : item.quality - 1;
    item.quality = item.quality < 0 ? 0 : item.quality
    }
  }

  increaseQuality(item, value) {
    item.quality = item.quality <= (50 - value) ? item.quality + value : 50;
  }

  resetQuality(item) {
    item.quality = 0;
  }

  updateBackstagePass(item) {
    if (item.sellIn < 1) {
      this.resetQuality(item);
    } else if (item.sellIn < 6) {
      this.increaseQuality(item, 3);
    } else if (item.sellIn < 11) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item, 1);
    }
  }

  updateSellIn(item) {
    if (!this.isSulfuras(item)) {
      item.sellIn--;
    } else {
      item.sellIn = 0;
    }
  }

  isExpired(item) {
    return item.sellIn <= 0;
  }

  legendaryItem(item) {
    return item.quality = 80;
  }

}  

module.exports = {
  Item,
  Shop
}
