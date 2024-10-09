import timerModel from '../models/timer.model';

export const getAllTimers = async (
  user_id: string,
  sort?: string,
  minTime?: number,
  maxTime?: number,
) => {
  const filter: any = { user_id };

  // Ajouter des filtres si des valeurs sont fournies
  if (minTime !== undefined) {
    filter.time = { ...filter.time, $gte: minTime };
  }
  if (maxTime !== undefined) {
    filter.time = { ...filter.time, $lte: maxTime };
  }

  // Gérer le tri
  const sortOption: { [key: string]: 1 | -1 } =
    sort === 'asc' ? { time: 1 } : sort === 'desc' ? { time: -1 } : {};

  return timerModel.find(filter).sort(sortOption);
};

export const getTimer = async (id: string) => {
  return timerModel.findOne({ _id: id });
};

export const createTimer = async (timerData: {
  user_id: string;
  time: number;
}) => {
  const timer = new timerModel(timerData);
  return timer.save();
};
