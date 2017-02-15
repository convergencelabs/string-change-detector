export default class StringChangeDetector {
  constructor(options) {
    if (!options) {
      throw new Error("options must be defined");
    }

    if (typeof options.onInsert !== "function") {
      throw new Error("options.onInsert must be a function");
    }

    if (typeof options.onRemove !== "function") {
      throw new Error("options.onRemove must be a function");
    }

    if (typeof options.value !== "string") {
      throw new Error("options.value must be a string");
    }

    this._onInsert = options.onInsert;
    this._onRemove = options.onRemove;
    this._value = options.value;
  }

  /**
   * Inserts a string into the current value at the specified index.
   *
   * @param index {number}
   *    The index in the string to insert into.
   * @param value {string}
   *   The value to insert into the string.
   */
  insertText(index, value) {
    const oldVal = this._input.value;
    const newVal =
      oldVal.substring(0, index) +
      value +
      oldVal.substring(index, oldVal.length);
    this.setValue(newVal);
  }

  /**
   * Removes a specified number of characters from the current string at
   * a specific location.
   *
   * @param index {number}
   *    The index in the string to remove characters.
   * @param length {number}
   *   The number of characters to remove.
   */
  removeText(index, length) {
    const oldVal = this._input.value;
    const newVal = oldVal.substring(0, index) +
      oldVal.substring(index + length, oldVal.length);
    this.setValue(newVal);
  }

  /**
   * Sets the current value of the string.
   *
   * @param value {string}
   *   The new value of the string.
   */
  setValue(value) {
    this._value = value;
  }

  /**
   * Gets the current value of the string.
   *
   * @returns {string}
   */
  getValue() {
    return this._value;
  }

  /**
   * Process the new value of the string after a single edit.
   *
   * @param newValue {string}
   *   The new value to process.
   */
  processNewValue(newValue) {
    let commonEnd = 0;
    let commonStart = 0;

    if (this._value === newValue) {
      return;
    }

    while (this._value.charAt(commonStart) === newValue.charAt(commonStart)) {
      commonStart++;
    }

    while (this._value.charAt(this._value.length - 1 - commonEnd) ===
        newValue.charAt(newValue.length - 1 - commonEnd) &&
        commonEnd + commonStart < this._value.length &&
        commonEnd + commonStart < newValue.length) {
      commonEnd++;
    }

    // Characters were removed.
    if (this._value.length !== commonStart + commonEnd) {
      if (this._onRemove) {
        this._onRemove(commonStart, this._value.length - commonStart - commonEnd);
      }
    }

    // Characters were added
    if (newValue.length !== commonStart + commonEnd) {
      if (this._onInsert) {
        this._onInsert(commonStart, newValue.slice(commonStart, (newValue.length - commonEnd)));
      }
    }

    this._value = newValue;
  }
}
