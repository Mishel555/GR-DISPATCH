import { renderToStaticMarkup } from 'react-dom/server';
import { IRgb } from '@types';

export const countProps = (obj: object): number => {
  let count = 0;

  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      count++;
    }
  }
  return count;
};

export const exclude = <T extends object, key extends keyof T>(data: T, keys: key[]): Omit<T, key> => (
  Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key as key)),
  ) as Omit<T, key>
);

export const hexToRgb = (hex: string): IRgb => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  return { r: 0, g: 0, b: 0 };
};

export const hexToRgbString = (hex: string): string => {
  const rgb = hexToRgb(hex);

  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
};

export const copyTextToClipboard = async (text: string) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
};

export const generateURLFromSvgComponent = (jsx: JSX.Element): string => {
  // const dataUri = `url("data:image/svg+xml,${svgString}")`;
  const svgString = encodeURIComponent(renderToStaticMarkup(jsx));

  return `data:image/svg+xml,${svgString}`;
};

export const deepChangeValues = <T extends object>(obj: T, replacement: unknown, newValue: unknown): T => {
  Object
    .entries(obj)
    .forEach(([key, value]) => {
      if (!!value && (typeof value === 'object')) {
        deepChangeValues(value, replacement, newValue);
      } else if (value === replacement) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj[key] = newValue;
      }
    });
  return obj;
};

export const objectEquals = (v1: unknown, v2: unknown): boolean => {
  if (typeof (v1) !== typeof (v2)) {
    return false;
  }

  if (typeof (v1) === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return v1.toString() === v2.toString();
  }

  if (v1 instanceof Object && v2 instanceof Object) {
    if (countProps(v1) !== countProps(v2)) {
      return false;
    }
    let r = true;
    for (const k in v1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      r = objectEquals(v1[k], v2[k]);
      if (!r) {
        return false;
      }
    }
    return true;
  } else {
    return v1 === v2;
  }
};
