# TypeWriter Effect Library

`@omnedia/rxjs-typewriter` is a lightweight and easy-to-use npm library for creating typewriter effects in your web applications. <br>
It uses RxJS to manage the typewriting effect, ensuring smooth and customizable animations. <br>

## Installation

You can install the library via npm:

```bash
npm install @omnedia/rxjs-typewriter
```

## Usage

First, import the TypeWriter class from the library:

```typescript
import { TypeWriter } from '@omnedia/rxjs-typewriter';
```

Then, create an instance of the TypeWriter class and use the typeWriteEffect method to start the typewriter effect:

```typescript

const typewriter = new TypeWriter();

typewriter.typeWriteEffect(['Hello', 'World'])
  .subscribe((text) => {
    console.log(text); // Output the current state of the typewriter effect
  });
```

## API

```typescript
typeWriteEffect(words: string[], loop?: boolean, writeSpeed?: number, deleteDelay?: number, writeDelay?: number): Observable<string>
```

Starts the typewriter effect.

- `words`: An array of strings to be typed.
- `loop`: (optional): If set to false, the last word in the words array will stay.
- `writeSpeed` (optional): The speed of typing each character in milliseconds. Default is 40.
- `deleteDelay` (optional): The delay before starting to delete the typed word in milliseconds. Default is 3500.
- `writeDelay` (optional): The delay before starting to type the next word after deleting the current word in milliseconds. Default is 50.

## Example

```typescript

const typewriter = new TypeWriter();

typewriter.typeWriteEffect(
  ['Hello', 'World'],
  true,     // loop (default true)
  100,      // write speed
  2000,     // delete delay
  100       // write delay
).subscribe((text) => {
  document.getElementById('output').innerText = text;
});
```

## Customization

You can customize the typing speed, delay after typing a word, and delay after deleting a word by passing optional parameters to the typeWriteEffect method.

```typescript

const typewriter = new TypeWriter();

typewriter.typeWriteEffect(
  ['Hello', 'World'],
  true,     // loop (default true)
  100,      // Custom write speed
  2000,     // Custom delete delay
  100       // Custom write delay
).subscribe((text) => {
  document.getElementById('output').innerText = text;
});
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- RxJS for providing powerful reactive programming tools.
- All the contributors who have helped in improving this project.

## Contact

For any questions or suggestions, please open an issue or reach out to me at [markus.block@omnedia.com](mailto:markus.block@omnedia.com).