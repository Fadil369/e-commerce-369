const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    ar: {
      type: String,
      required: [true, 'Arabic product name is required'],
      trim: true,
    },
    en: {
      type: String,
      required: [true, 'English product name is required'],
      trim: true,
    },
  },
  description: {
    ar: {
      type: String,
      required: [true, 'Arabic description is required'],
    },
    en: {
      type: String,
      required: [true, 'English description is required'],
    },
  },
  shortDescription: {
    ar: String,
    en: String,
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'abayas',
      'dresses', 
      'tops',
      'hijabs',
      'accessories',
      'shoes',
      'bags',
      'jewelry',
      'traditional',
      'modest-wear'
    ],
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  compareAtPrice: {
    type: Number,
    min: [0, 'Compare at price cannot be negative'],
  },
  currency: {
    type: String,
    default: 'SAR',
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    alt: {
      ar: String,
      en: String,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  }],
  sizes: [{
    name: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    },
    measurements: {
      chest: Number,
      waist: Number,
      hips: Number,
      length: Number,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
    },
  }],
  colors: [{
    name: {
      ar: String,
      en: String,
    },
    hex: String,
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
    },
  }],
  materials: [{
    ar: String,
    en: String,
  }],
  careInstructions: {
    ar: [String],
    en: [String],
  },
  tags: [String],
  features: {
    ar: [String],
    en: [String],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  saleEndDate: Date,
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  seo: {
    metaTitle: {
      ar: String,
      en: String,
    },
    metaDescription: {
      ar: String,
      en: String,
    },
    keywords: [String],
  },
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  shippingClass: {
    type: String,
    enum: ['standard', 'express', 'free'],
    default: 'standard',
  },
  viewCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for better performance
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ 'name.ar': 'text', 'name.en': 'text', 'description.ar': 'text', 'description.en': 'text' });
productSchema.index({ price: 1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ isFeatured: 1, isActive: 1 });

// Calculate total stock
productSchema.virtual('totalStock').get(function() {
  if (!this.sizes || this.sizes.length === 0) return 0;
  return this.sizes.reduce((total, size) => total + size.stock, 0);
});

// Update product rating when reviews change
productSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.rating.count = this.reviews.length;
  }
};

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);