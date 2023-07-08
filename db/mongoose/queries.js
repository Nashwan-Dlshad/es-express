const mongoose = require("mongoose");
class Queries {
  #model = null;
  #result = null;

  // get model function
  model(model) {
    this.#model = model;
    console.log(this.#model);
    if (!mongoose.models[this.#model]) {
      throw new Error(
        `Model "${this.#model}" is not registered with Mongoose.`
      );
    }
    return this;
  }

  // select all without trashed
  async all() {
    this.#result = await mongoose.models[this.#model].find({
      // if isDeleted false || null || undefined
      isDeleted: false || undefined || null,
    });
    return this;
  }

  // select all with trashed
  async WithTrashed() {
    this.#result = await mongoose.models[this.#model].find();
    return this;
  }

  // find by id
  async findId(id) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model].findOne({
        id: id,
        isDeleted: false || undefined || null,
      });
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].findOne({
        id: id,
      });
    }

    return this;
  }

  // sort
  async sort(sort) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model]
        .find({
          isDeleted: false || undefined || null,
        })
        .sort(sort);
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find().sort(sort);
    }
    return this;
  }

  // limit
  async limit(limit) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model]
        .find({
          isDeleted: false || undefined || null,
        })
        .limit(limit);
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find().limit(limit);
    }
    return this;
  }

  // skip
  async skip(skip) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model]
        .find({
          isDeleted: false || undefined || null,
        })
        .skip(skip);
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find().skip(skip);
    }
    return this;
  }

  // where
  async where(where = {}) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model].find({
        isDeleted: false || undefined || null,
        where,
      });
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find(where);
    }
    return this;
  }

  // where in
  async whereIn(field, $inn) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model].find({
        isDeleted: false || undefined || null,
        [field]: { $in: $inn },
      });
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find({
        [field]: { $in: $inn },
      });
    }
  }

  // where not in
  async whereNotIn(field, $inn) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model].find({
        isDeleted: false || undefined || null,
        [field]: { $nin: $inn },
      });
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find({
        [field]: { $nin: $inn },
      });
    }
  }

  // where between
  async whereBetween(field, $between = []) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model].find({
        isDeleted: false || undefined || null,
        [field]: { $gte: $between[0], $lte: $between[1] },
      });
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find({
        [field]: { $gte: $between[0], $lte: $between[1] },
      });
    }
  }

  // where not between
  async whereNotBetween(field, $between = []) {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      this.#result = await mongoose.models[this.#model].find({
        isDeleted: false || undefined || null,
        [field]: { $not: { $gte: $between[0], $lte: $between[1] } },
      });
    } else {
      // get all
      this.#result = await mongoose.models[this.#model].find({
        [field]: { $not: { $gte: $between[0], $lte: $between[1] } },
      });
    }
  }

  // where like
  async whereLike(field, $like = "") {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      let regex = new RegExp($like, "i");
      this.#result = await mongoose.models[this.#model].find({
        isDeleted: false || undefined || null,
        [field]: regex,
      });
    } else {
      // get all
      let regex = new RegExp($like, "i");
      this.#result = await mongoose.models[this.#model].find({
        [field]: regex,
      });
    }
  }

  // where not like
  async whereNotLike(field, $like = "") {
    // check if it is chained on with trashed or not
    if (this.#result == null) {
      let regex = new RegExp($like, "i");
      this.#result = await mongoose.models[this.#model].find({
        isDeleted: false || undefined || null,
        [field]: { $not: regex },
      });
    } else {
      // get all
      let regex = new RegExp($like, "i");
      this.#result = await mongoose.models[this.#model].find({
        [field]: { $not: regex },
      });
    }
  }

  // with relations and nested relations
  async with(relations = []) {
    // check if it is null or nut
    if (this.#result != null) {
      // check if it is 1 item or not
      if (!Array.isArray(this.#result)) {
        // get the first item
        this.#result = await mongoose.models[this.#model]
          .findOne({
            // id
            id: this.#result.id,
          })
          .populate(relations);
      } else {
        // get all
        this.#result = await mongoose.models[this.#model]
          .find()
          .populate(relations);
      }
    } else {
      // get all
      this.#result = await mongoose.models[this.#model]
        .find()
        .populate(relations);
    }

    return this;
  }

  // create
  async create(data) {
    // create
    this.#result = await mongoose.models[this.#model].create(data);
    // save
    await this.#result.save();
    return this.#result;
  }

  //update
  async update(_id, data) {
    // update
    this.#result = await mongoose.models[this.#model].updateOne(
      {
        _id: _id,
      },
      data
    );
    return this.#result
  }

  // softDelete
  async softDelete(_id) {
    // soft delete
    this.#result = await mongoose.models[this.#model].updateOne(
      {
        _id: id,
      },
      {
        isDeleted: true,
      }
    );
    return true;
  }

  // restore
    async restore(_id) {
    // restore
    this.#result = await mongoose.models[this.#model].updateOne(
        {
            _id: id,
        },
        {
            isDeleted: false,
        }
    );
    return true;
    }

  // forceDelete
  async forceDelete(_id) {
    // force delete
    this.#result = await mongoose.models[this.#model].deleteOne({
      _id: id,
    });
    return true;
  }

  // get
  async get() {
    return await this.#result;
  }
}

module.exports = Queries;
