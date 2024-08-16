export type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean | LabelValueOptions;
}[];

// 快速将数组转换为 LabelValueOptions 格式
export function toLabelValueOptions(arr: any[], params): LabelValueOptions {
  const { label = 'label', value = 'value' } = params;
  return arr.map((item) => ({ ...item, label: item[label], value: item[value] }));
}

export const statusOptions: LabelValueOptions = [
  {
    label: '',
    value: '0',
    // color: '#EDBD88',
  },
  {
    label: '',
    value: '1',
    color: '#FF5260FF',
  },
  {
    label: '',
    value: '2',
    color: '#20B26CFF',
  },
];
