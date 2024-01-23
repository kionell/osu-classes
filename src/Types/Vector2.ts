/**
 * A float32 2D Vector.
 */
export class Vector2 {
  private _values = new Float32Array(2);

  /**
   * Creates a new instance of a Vector2.
   * @param x The X-position.
   * @param y The Y-position.
   */
  constructor(x = 0, y?: number) {
    this.x = x;
    this.y = isFinite(y as number) ? (y as number) : x;
  }

  /**
   * The X-position.
   */
  get x(): number {
    return this._values[0];
  }

  set x(value: number) {
    this._values[0] = value;
  }

  /**
   * The Y-position.
   */
  get y(): number {
    return this._values[1];
  }

  set y(value: number) {
    this._values[1] = value;
  }

  /**
   * A single precision version of X-position.
   * Use {@link x} instead.
   * @deprecated
   */
  get floatX(): number {
    return this.x;
  }

  /**
   * A single precision version of Y-position.
   * Use {@link y} instead.
   * @deprecated
   */
  get floatY(): number {
    return this.y;
  }

  /**
   * Adds a vector to the current.
   * @param vec Vector to add.
   * @returns A new instance.
   */
  add(vec: Vector2): Vector2 {
    return new Vector2(this.x + vec.x, this.y + vec.y);
  }

  /**
   * Adds a vector to the current.
   * Use {@link add} instead.
   * @param vec Vector to add.
   * @returns A new instance with single precision.
   * @deprecated
   */
  fadd(vec: Vector2): Vector2 {
    return this.add(vec);
  }

  /**
   * Subtracts a vector from the current.
   * @param vec Vector to substract.
   * @returns A new instance.
   */
  subtract(vec: Vector2): Vector2 {
    return new Vector2(this.x - vec.x, this.y - vec.y);
  }

  /**
   * Subtracts a vector from the current. 
   * Use {@link substract} instead.
   * @param vec Vector to substract.
   * @returns A new instance with single precision.
   * @deprecated
   */
  fsubtract(vec: Vector2): Vector2 {
    return this.subtract(vec);
  }

  /**
   * Scales the current vector.
   * @param multiplier Vector multiplier.
   * @returns A new instance.
   */
  scale(multiplier: number): Vector2 {
    const floatMultiplier = Math.fround(multiplier);

    return new Vector2(this.x * floatMultiplier, this.y * floatMultiplier);
  }

  /**
   * Scales the current vector. 
   * Use {@link scale} instead.
   * @param vec Vector to substract.
   * @returns A new instance with single precision.
   * @deprecated
   */
  fscale(multiplier: number): Vector2 {
    return this.scale(multiplier);
  }

  /**
   * Divides the current vector.
   * @param divisor Vector divisor.
   * @returns A new instance.
   */
  divide(divisor: number): Vector2 {
    const floatDivisor = Math.fround(divisor);

    return new Vector2(this.x / floatDivisor, this.y / floatDivisor);
  }

  /**
   * Divides the current vector.
   * Use {@link divide} instead.
   * @param vec Vector to substract.
   * @returns A new instance with single precision.
   * @deprecated
   */
  fdivide(divisor: number): Vector2 {
    return this.divide(divisor);
  }

  /**
   * @param vec Second vector.
   * @returns A dot product of two vectors.
   */
  dot(vec: Vector2): number {
    const x = Math.fround(this.x * vec.x);
    const y = Math.fround(this.y * vec.y);

    return Math.fround(x + y);
  }

  /**
   * Use {@link dot} instead.
   * @param vec Second vector.
   * @returns A dot product of two vectors with single precision.
   * @deprecated
   */
  fdot(vec: Vector2): number {
    return this.dot(vec);
  }

  /**
   * @returns A length of two points in a vector.
   */
  length(): number {
    const x = Math.fround(this.x * this.x);
    const y = Math.fround(this.y * this.y);

    return Math.fround(Math.sqrt(Math.fround(x + y)));
  }

  /**
   * Use {@link length} instead.
   * @returns A single precision length of two points in a vector.
   * @deprecated
   */
  flength(): number {
    return this.length();
  }

  /**
   * @param vec Second vector.
   * @returns A distance between two vectors.
   */
  distance(vec: Vector2): number {
    const x = Math.fround(this.x - vec.x);
    const y = Math.fround(this.y - vec.y);

    const squareX = Math.fround(x * x);
    const squareY = Math.fround(y * y);

    return Math.fround(Math.sqrt(Math.fround(squareX + squareY)));
  }

  /**
   * Use {@link distance} instead.
   * @param vec Second vector.
   * @returns A single precision distance between two vectors.
   * @deprecated
   */
  fdistance(vec: Vector2): number {
    return this.distance(vec);
  }

  /**
   * @returns A normalized vector.
   */
  normalize(): Vector2 {
    const scale = Math.fround(1 / this.length());

    return new Vector2(this.x * scale, this.y * scale);
  }

  /**
   * Use {@link normalize} instead.
   * @returns A normalized vector with single precision.
   * @deprecated
   */
  fnormalize(): Vector2 {
    return this.normalize();
  }

  /**
   * @param vec Second vector.
   * @returns If two vectors are equal.
   */
  equals(vec: Vector2): boolean {
    return this.x === vec.x && this.y === vec.y;
  }

  /**
   * Clones the current vector.
   * @returns A cloned vector.
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * @returns A string representation of this vector.
   */
  toString(): string {
    return `${this.x},${this.y}`;
  }
}
