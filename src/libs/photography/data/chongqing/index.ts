import { StaticImageData } from 'next/image';

import * as preview from './preview/images';
import * as hiRes from './hi-res/images';

export const chongqingPhotos: Record<
  string,
  { preview: StaticImageData; hiRes: StaticImageData }
> = {
  'chongqing-01': {
    preview: preview['Chongqing01'],
    hiRes: hiRes['Chongqing01'],
  },
  'chongqing-02': {
    preview: preview['Chongqing02'],
    hiRes: hiRes['Chongqing02'],
  },
  'chongqing-03': {
    preview: preview['Chongqing03'],
    hiRes: hiRes['Chongqing03'],
  },
  'chongqing-04': {
    preview: preview['Chongqing04'],
    hiRes: hiRes['Chongqing04'],
  },
  'chongqing-05': {
    preview: preview['Chongqing05'],
    hiRes: hiRes['Chongqing05'],
  },
  'chongqing-06': {
    preview: preview['Chongqing06'],
    hiRes: hiRes['Chongqing06'],
  },
  'chongqing-07': {
    preview: preview['Chongqing07'],
    hiRes: hiRes['Chongqing07'],
  },
  'chongqing-08': {
    preview: preview['Chongqing08'],
    hiRes: hiRes['Chongqing08'],
  },
  'chongqing-09': {
    preview: preview['Chongqing09'],
    hiRes: hiRes['Chongqing09'],
  },
  'chongqing-10': {
    preview: preview['Chongqing10'],
    hiRes: hiRes['Chongqing10'],
  },
  'chongqing-11': {
    preview: preview['Chongqing11'],
    hiRes: hiRes['Chongqing11'],
  },
  'chongqing-12': {
    preview: preview['Chongqing12'],
    hiRes: hiRes['Chongqing12'],
  },
};
