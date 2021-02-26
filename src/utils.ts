import { createWriteStream, ReadStream } from 'fs';
import { nanoid } from 'nanoid';

export const generateUuid = (size?: number): string => nanoid(size);

export const isEmptyObject = (obj = {}): boolean => {
  return !Object.keys(obj || {}).length;
};

export const addDaysToDate = (date: Date, days: number): Date => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};

export const createFileFromReadStream = (readStream: ReadStream, filePath: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    readStream.pipe(createWriteStream(filePath))
      .on('finish', () => {
        return resolve(true);
      })
      .on('error', (err) => reject(err));
  });
};
