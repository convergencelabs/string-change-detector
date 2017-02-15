export as namespace StringChangeDetector;

export default class StringChangeDetector {

  public insertText(index, value): void

  public removeText(index, length): void;

  public setValue(value): void;

  public getValue(): string;

  public processNewValue(newValue): void;
}