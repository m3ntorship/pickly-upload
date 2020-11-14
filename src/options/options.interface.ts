import { Document, Types } from 'mongoose';

interface Option {
	name: String;
	url: String;
	provider: String;
	postId: Types.ObjectId;
	votes?: Types.ObjectId;
}

export interface OptionBaseDocument extends Option, Document {
	votedByUser?: boolean;
}
