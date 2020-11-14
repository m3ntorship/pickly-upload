import { Schema, model } from 'mongoose';
import { OptionBaseDocument } from './options.interface';

const optionSchema = new Schema<OptionBaseDocument>(
	{
		name: String,
		url: String,
		provider: String,
		postId: { type: Schema.Types.ObjectId, ref: 'Post' },
		votes: {
			type: Schema.Types.ObjectId,
			ref: 'Votes',
		},
	},
	{
		toJSON: {
			transform: function (doc, ret) {
				ret.id = undefined;
				ret.__v = undefined;
				return ret;
			},
			virtuals: true,
		},
		versionKey: false,
	}
);

optionSchema.virtual('votedByUser');

export const Options = model<OptionBaseDocument>('option', optionSchema);
