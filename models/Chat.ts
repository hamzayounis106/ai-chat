import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  sessionId: string;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    sessionId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

export default (mongoose.models.Chat as mongoose.Model<IChat>) || mongoose.model<IChat>('Chat', ChatSchema);
