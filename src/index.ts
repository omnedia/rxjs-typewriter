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
  private loop = true;
  private wordsCount = 0;

  typeWriteEffect(
    words: string[],
    loop?: boolean,
    writeSpeed?: number,
    deleteDelay?: number,
    writeDelay?: number
  ): Observable<string> {
    this.writeSpeed = writeSpeed ?? this.writeSpeed;
    this.waitAfterTyped = deleteDelay ?? this.waitAfterTyped;
    this.waitAfterDeleted = writeDelay ?? this.waitAfterDeleted;
    this.loop = loop ?? this.loop;

    this.wordsCount = words.length;

    return this.startTypewriter(words);
  }

  private startTypewriter(words: string[]): Observable<string> {
    if (this.loop === false) {
      return from(words).pipe(concatMap((word) => this.typeEffect(word)));
    }

    return from(words).pipe(
      concatMap((word) => this.typeEffect(word)),
      repeat()
    );
  }

  private typeEffect(word: string): Observable<string> {
    if (this.loop === false) {
      this.wordsCount -= 1;
    }

    return concat(
      this.typeWord(word),
      of("").pipe(delay(this.waitAfterTyped), ignoreElements()),
      this.typeWord(word, true),
      of("").pipe(delay(this.waitAfterDeleted), ignoreElements())
    );
  }

  private typeWord(word: string, backwards?: boolean): Observable<string> {
    if (this.loop === false && this.wordsCount <= 0 && backwards) {
      return of(word);
    }

    return interval(this.writeSpeed).pipe(
      map((x) => {
        return backwards
          ? word.substring(0, word.length - x)
          : word.substring(0, x + 1);
      }),
      take(word.length + 1)
    );
  }
}
