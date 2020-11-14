import { Document, Types } from 'mongoose';

export interface Option extends Document {
	name: String;
	url: String;
	provider: String;
	postId: Types.ObjectId;
	votes: Types.ObjectId;
}
