declare class StringChangeDetector {

  constructor(options: {
    value: string;
    onInsert: (index: number, value: string) => void;
    onRemove: (index: number, length: number) => void;
  });

  public insertText(index: number, value: string): void;

  public removeText(index: number, length: number): void;

  public setValue(value: string): void;

  public getValue(): string;

  public processNewValue(newValue: string): void;
}

export = StringChangeDetector;
