import mongoose from 'mongoose';

const brcSchema = new mongoose.Schema(
  {
    brc: {
      type: Number,
      required: true,
      index: { unique: true, dropDups: true }
    },
    date: {
      type: Date,
      required: true
    },
    dateCode: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L'],
      required: true
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoices'
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouses'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products'
    }
  },
  {
    timestamps: true
  }
);

brcSchema.pre('validate', async function handlePreBrcValidate() {
  if (!this.dateCode) {
    // this long ass chain is to get the enumvalues defined above.
    const dateArray = this.constructor.schema.path('dateCode').enumValues;
    const dateArraySpot = this.date.getMonth();
    this.dateCode = dateArray[dateArraySpot];
  }
});

export default mongoose.model('BRC', brcSchema);
