export enum HitResult {
  /**
   * Indicates that the object has not been judged yet.
   */
  None,

  /**
   * Indicates that the object has been judged as a miss.
   * This miss window should determine how early a hit can be before it is considered 
   * for judgement (as opposed to being ignored as "too far in the future"). 
   * It should also define when a forced miss should be triggered (as a result of no user input in time).
   */
  Miss,
  Meh,
  Ok,
  Good,
  Great,
  Perfect,

  /**
   * Indicates small tick miss.
   */
  SmallTickMiss,

  /**
   * Indicates a small tick hit.
   */
  SmallTickHit,

  /**
   * Indicates a large tick miss.
   */
  LargeTickMiss,

  /**
   * Indicates a large tick hit.
   */
  LargeTickHit,

  /**
   * Indicates a small bonus.
   */
  SmallBonus,

  /**
   * Indicates a large bonus.
   */
  LargeBonus,

  /**
   * Indicates a miss that should be ignored for scoring purposes.
   */
  IgnoreMiss,

  /**
   * Indicates a hit that should be ignored for scoring purposes.
   */
  IgnoreHit,

  /**
   * Indicates that a combo break should occur, but does not otherwise affect score.
   * May be paired with {@link IgnoreHit}.
   */
  ComboBreak,

  /**
   * A special tick judgement to increase the valuation of the final tick of a slider.
   * The default minimum result is {@link IgnoreMiss}, but may be overridden to {@link LargeTickMiss}.
   */
  SliderTailHit,

  /**
   * A special result used as a padding value for legacy rulesets. 
   * It is a hit type and affects combo, but does not affect the base score (does not affect accuracy).
   * 
   * DO NOT USE FOR ANYTHING EVER.
   * 
   * This is used when dealing with legacy scores, 
   * which historically only have counts stored for 300/100/50/miss.
   * For these scores, we pad the hit statistics with 
   * `LegacyComboIncrease` to meet the correct max combo for the score.
   */
  LegacyComboIncrease,
}
