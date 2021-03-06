import { Colour } from '../../Utils';

/**
 * A beatmap colours section.
 */
export class BeatmapColoursSection {
  /**
   * Additive combo colours.
   */
  comboColours: Colour[] = [];

  /**
   * Additive slider track colour.
   */
  sliderTrackColor?: Colour;

  /**
   * Slider border colour.
   */
  sliderBorderColor?: Colour;

  /**
   * Creates a copy of this beatmap colours section.
   * Non-primitive properties will be copied via their own clone() method.
   * @returns A copied information about control points.
   */
  clone(): BeatmapColoursSection {
    const cloned = new BeatmapColoursSection();

    cloned.comboColours = this.comboColours.map((c) => c.clone());

    if (this.sliderTrackColor) {
      cloned.sliderTrackColor = this.sliderTrackColor;
    }

    if (this.sliderBorderColor) {
      cloned.sliderBorderColor = this.sliderBorderColor;
    }

    return cloned;
  }
}
