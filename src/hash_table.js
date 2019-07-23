const { KEYS_VALUES_ENUM } = require('./constants');

class HashTable {
  constructor(size){
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let i =0; i < key.length; i++){
        hash = (hash + key.charCodeAt(i) * i) % this.data.length
    }
    return hash;
  }

  set(key, val) {
    const index = this._hash(key)
    if(!this.data[index]) {
      this.data[index] = []
    }
    this.data[index].push([key,val])
  }

  get(key) {
    const index = this._hash(key)
    const currentBucket = this.data[index]
    if(currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if(currentBucket[i][0] === key) {
          return currentBucket[i][1]
        }
      }
    }
    return undefined 
  }

  list(keys_or_values) {
    if(this.data) {
      const items = []
      for(let i = 0; i < this.data.length; i++) {
        const currentBucket = this.data[i]
        if(currentBucket) {
          for(let j = 0; j < currentBucket.length; j++) {
            items.push(currentBucket[j][KEYS_VALUES_ENUM[keys_or_values]])
          }
        }
      }
      return items
    }
    return undefined
  }
}

const myHashTable = new HashTable(2);
myHashTable.set('grapes', 10000)
myHashTable.set('lucas', 10)
console.log(myHashTable.list("values"))
