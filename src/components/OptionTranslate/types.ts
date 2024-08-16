export type TextTranslateType = 'text' | 'dot';

export type LabelValueOptions = {
    label: string;
    value: any;
    [key: string]: string | number | boolean | LabelValueOptions;
  }[];
  