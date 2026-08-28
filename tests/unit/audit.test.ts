import { describe, expect, it } from 'vitest';
import { colorDistance, findAmbiguousPalette, rgbToHex, simulateColor } from '../../src/audit';

function imageOf(colors: Array<[number, number, number]>): ImageData {
  const pixels = new Uint8ClampedArray(colors.length * 4);
  colors.forEach((color, index) => {
    pixels.set([...color, 255], index * 4);
  });
  return { data: pixels, width: colors.length, height: 1, colorSpace: 'srgb' } as ImageData;
}

describe('local color comparison', () => {
  it('compresses a red/green pair under the deutan model', () => {
    const red: [number, number, number] = [192, 64, 64];
    const green: [number, number, number] = [64, 144, 96];
    expect(colorDistance(simulateColor(red, 'deutan'), simulateColor(green, 'deutan')))
      .toBeLessThan(colorDistance(red, green));
  });

  it('formats sampled colors without network or browser state', () => {
    expect(rgbToHex([32, 160, 255])).toBe('#20a0ff');
  });

  it('ignores grayscale-only screenshots', () => {
    const pixels = Array.from({ length: 160 }, (_, index) => {
      const value = index % 2 ? 96 : 224;
      return [value, value, value] as [number, number, number];
    });
    expect(findAmbiguousPalette(imageOf(pixels), 'deutan')).toEqual([]);
  });

  it('limits repeated palette findings', () => {
    const colors: Array<[number, number, number]> = [];
    for (let index = 0; index < 120; index += 1) colors.push(index % 2 ? [192, 64, 64] : [64, 144, 96]);
    expect(findAmbiguousPalette(imageOf(colors), 'deutan', 1).length).toBeLessThanOrEqual(1);
  });
});
