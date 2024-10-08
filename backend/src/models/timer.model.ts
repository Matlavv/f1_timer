import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface ITimer extends Document {
  user_id: ObjectId;
  time: number;
}

const TimerSchema: Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time: { type: Number, required: true },
});

export default mongoose.model<ITimer>('Timer', TimerSchema);
