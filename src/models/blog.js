import mongoose, { Schema } from 'mongoose'

const BlogSchema = new Schema({
  abstract: String,
  content: String,
}, {
	timestamps: true
});

export default mongoose.model('Blog', BlogSchema);