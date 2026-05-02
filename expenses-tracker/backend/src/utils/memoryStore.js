// Simple in-memory data store for development/testing
class MemoryStore {
  constructor() {
    this.collections = {};
  }

  getCollection(name) {
    if (!this.collections[name]) {
      this.collections[name] = [];
    }
    return this.collections[name];
  }

  async create(collection, data) {
    const col = this.getCollection(collection);
    const doc = {
      _id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    col.push(doc);
    return doc;
  }

  async findOne(collection, query) {
    const col = this.getCollection(collection);
    return col.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async find(collection, query = {}) {
    const col = this.getCollection(collection);
    if (Object.keys(query).length === 0) {
      return col;
    }
    return col.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async findOneAndUpdate(collection, query, update) {
    const col = this.getCollection(collection);
    const index = col.findIndex(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
    if (index > -1) {
      col[index] = { ...col[index], ...update, updatedAt: new Date() };
      return col[index];
    }
    return null;
  }

  async deleteOne(collection, query) {
    const col = this.getCollection(collection);
    const index = col.findIndex(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
    if (index > -1) {
      const deleted = col[index];
      col.splice(index, 1);
      return { deletedCount: 1, deleted };
    }
    return { deletedCount: 0 };
  }

  clear() {
    this.collections = {};
  }
}

// Export singleton instance
module.exports = new MemoryStore();
