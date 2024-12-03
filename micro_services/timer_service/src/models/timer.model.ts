import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface ITimer extends Document {
  user_id: ObjectId;
  time: number;
  createdAt: Date;
}

const TimerSchema: Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITimer>('Timer', TimerSchema);
