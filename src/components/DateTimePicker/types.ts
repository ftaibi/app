export type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';

export type DateTimePickerProps = {
  value: Date;
  setValue: (_date?: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  showTime?: boolean;
  showDate?: boolean;
  mode?: IOSMode;
  display?: 'spinner' | 'default' | 'inline';
};
