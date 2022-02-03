# Ndjson_to_png_converter
A simple tool for converting Googles [*QuickDraw*](https://quickdraw.withgoogle.com/) Ndjson dataset into useable png images. The Ndjson dataset can be found [here](https://console.cloud.google.com/storage/quickdraw_dataset/full/simplified). The resulting png will be 255x255 with a white background and black drawing, similar to the original image.

This tool was made for our own little project and designed to convert only a subset of the whole dataset. If you want to convert all 345 categories, you might want to make some changes.



## Installation

Simply clone the repository and run `npm install`.



## Usage

1. Create a directory named `data` at the root of the project folder. 
2. Paste all your ndjson-files into `data`
3. Create a subdirectory in `data` for each category you want to convert. The subdirectories should be named according to the category name, for example `apple`.
4. Add your categories to  `dataList` in the `parser.ts` file.
5. Run `parser.ts` . In the console you'll get ask witch category and how many files you want to convert.

The png images will be saved to their according subdirectories.



