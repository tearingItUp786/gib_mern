import mongoose from 'mongoose';
import { deleteModel } from '../../../db';
const modelName = 'BRC';
deleteModel(modelName);

const brcSchema = new mongoose.Schema(
  {
    brc: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    dateCode: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    volume: {
      type: String,
      required: true
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductType',
      required: true
    }
  },
  {
    timestamps: true
  }
);

brcSchema.pre('validate', async function handlePreBrcValidate() {
  if (!this.dateCode) {
    // this long ass chain is to get the enumvalues defined above.
    // it's handy
    const dateArray = this.constructor.schema.path('dateCode').enumValues;
    const dateArraySpot = this.date.getMonth();
    this.dateCode = dateArray[dateArraySpot];
  }
});

brcSchema.pre('update', async function handlePreUpdate() {
  console.log('Pre update');
  console.log(this.productType);
});

brcSchema.index({ brc: 1 }, { unique: true });

export default mongoose.model(modelName, brcSchema);
