const mongoose = require("mongoose");
const SIZE_RULES = {
  // defines the size rules for each animal type 
  cat: [
    { weight: 0, size: 'small' },
    { weight: 10, size: 'medium' },
    { weight: 20, size: 'large' },
  ],
  dog: [
    { weight: 0, size: 'small' },
    { weight: 45, size: 'medium' },
    { weight: 75, size: 'large' },
    { weight: Infinity, size: 'extra-large' },
  ],
  // Add additional animal types and size rules as needed
};

function getSize(animal, weight){
  //sets the size property based on type of animal and their weight
  const rules = SIZE_RULES[animal.toLowerCase()];
  for(const { weight: maxWeight, size } of rules) {
    if(weight <= maxWeight){
      return size;
    }
  }
  //when size unknown leave an empty string
  return '';
}

const PetSchema = new mongoose.Schema({
  animal: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  // breed: {
  //   type: String,
  //   required: false,
  // },
  color: {
  type: String,
  required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    default: '',
  },
  dob: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PetSchema.pre('save', function(){
  //runs before saving a 'Pet' to the database, sets 'size' property
  this.size = getSize(this.animal, this.weight);
});

module.exports = mongoose.model("Pet", PetSchema);