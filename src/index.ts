import {
  Observable,
  concat,
  concatMap,
  delay,
  from,
  ignoreElements,
  interval,
  map,
  of,
  repeat,
  take,
} from "rxjs";

export class TypeWriter {
  private writeSpeed = 40;
  private waitAfterTyped = 3500;
  private waitAfterDeleted = 50;

  typeWriteEffect(
    words: string[],
    writeSpeed?: number,
    deleteDelay?: number,
    writeDelay?: number
  ): Observable<string> {
    this.writeSpeed = writeSpeed ?? this.writeSpeed;
    this.waitAfterTyped = deleteDelay ?? this.waitAfterTyped;
    this.waitAfterDeleted = writeDelay ?? this.waitAfterDeleted;

    return this.startTypewriter(words);
  }

  private startTypewriter(words: string[]): Observable<string> {
    return from(words).pipe(
      concatMap((word) => this.typeEffect(word)),
      repeat()
    );
  }

  private typeEffect(word: string): Observable<string> {
    return concat(
      this.typeWord(word),
      of("").pipe(delay(this.waitAfterTyped), ignoreElements()),
      this.typeWord(word, true),
      of("").pipe(delay(this.waitAfterDeleted), ignoreElements())
    );
  }

  private typeWord(word: string, backwards?: boolean): Observable<string> {
    return interval(this.writeSpeed).pipe(
      map((x) =>
        backwards
          ? word.substring(0, word.length - x)
          : word.substring(0, x + 1)
      ),
      take(word.length + 1)
    );
  }
}
