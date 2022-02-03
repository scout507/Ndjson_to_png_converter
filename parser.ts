const fs = require('fs');
const ndjson = require('ndjson');
const sharp = require('sharp');
import * as readline from 'readline';


/**
 * Contains the categories you want to convert.
 * Categories must be in alphabetical order.
 */
const dataList = [
    "apple",
    //"baseball",
    //"bicycle",
    "campfire",
    //"car",
    //"cup",
    "diamond",
    "donut",
    //"elephant",
    "face",
    "fish",
    //"foot",
    "hand",
    "house",
    //"key",
    //"mountain",
    //"pants",
    "pizza",
    //"snowman",
    "t-shirt",
    //"tree"
]

/**
 *  Converts all ndjson from the data directory to png files.
 * @param maxFiles specifies how many drawings are to be created from a category.
 */
async function convertAll(maxFiles: number) {
    for (let j = 0; j < dataList.length; j++) {
        await parseSimplifiedDrawings(`data/full_simplified_${dataList[j]}.ndjson`, async function (err, drawings) {
            if (err) return console.error(err);

            for (let i = 0; i < maxFiles; i++) {
                // Progress for output
                let percent = Math.round((j * maxFiles + i) / (dataList.length * maxFiles) * 1000) / 1000;

                await convertOneDrawing(drawings[i], maxFiles, i, percent);
            }
        })
    }

    console.log('Finished parsing');
}

/**
 *  Converts one ndjson to many png files.
 * @param maxFiles specifies how many drawings are to be created from a category.
 * @param categoryName name of the category to be converted.
 */
async function convertSpecific(maxFiles: number, categoryName: string) {
    await parseSimplifiedDrawings(`data/full_simplified_${categoryName}.ndjson`, async function (err, drawings) {
        if (err) return console.error(err);

        for (let i = 0; i < maxFiles; i++) {
            // Progress for output
            let percent = Math.round((i) / (maxFiles) * 1000) / 1000;

            await convertOneDrawing(drawings[i], maxFiles, i, percent);
        }
    })

    console.log('Finished parsing');
}

/**
 * Converts one drawing to one png file.
 * These are saved on the system at the end under the path: [dirname]/data/images/[category]/[category]_[imageId].png`
 * @param drawing contains the drawing to convert
 * @param maxFiles specifies how many drawings are to be created from a category.
 * @param iterator
 * @param percent contains the progress percentage.
 */
async function convertOneDrawing(drawing: any, maxFiles: number, iterator: number, percent: number) {
    let res = generate_svg(drawing.drawing);

    // Handles progress console output
    console.clear();
    console.log(drawing.word + ": " + iterator + "/" + maxFiles + "    (" + (percent * 100).toFixed(1) + "%)")

    // Converts svg to png and saves it to the according directory
    await sharp(Buffer.from(res))
        .png()
        .flatten({background: "#FFFFFF"})
        .toFile(__dirname + `/data/images/${drawing.word}/${drawing.word}_${drawing.key_id}.png`);
}


/**
 * Parse the ndjson files from quick draw dataset to single objects.
 * After parsing, the objects are added to the "drawings" array.
 * At the end, the callback is executed, waited for and the drawings are transferred with it.
 * @param path path to the ndjson file.
 * @param callback contains the function which runs after the parsing of the ndsjon to a object.
 */
function parseSimplifiedDrawings(path, callback): Promise<number> {
    return new Promise(resolve => {
        let drawings = []
        let fileStream = fs.createReadStream(path)
        fileStream
            .pipe(ndjson.parse())
            .on('data', function (obj) {
                drawings.push(obj)
            })
            .on("error", callback)
            .on("end", async () => {
                await callback(null, drawings)
                resolve(null)
            })
    })
}


/**
 * Converts the ndjson.drawing data into a svg-file.
 * @param data the drawing data of a single image.
 * @return returns a string containing the svg of the given image.
 */
function generate_svg(data: any): string {
    var svg: string = ''
    svg += '<svg width="255px" height="255px" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'

    // Iterates over the "x", "y" values and creates a line between these points.
    for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < data[j][0].length - 1; i++) {
            let path = ''
            path += 'M' + data[j][0][i] + ' ' + data[j][1][i]             // moveTo
            path += ' L ' + data[j][0][i + 1] + ' ' + data[j][1][i + 1]  // lineTo
            path += ' Z'                                                // closePath
            svg += '<path d="' + path + '" stroke="black" stroke-width="2"/>\n'
        }
    }

    svg += '</svg>\n'
    return svg
}

/**
 * Entry point of the program.
 * Manages the user input.
 */
function main() {
    let maxFiles: number;

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    rl.question("Type the maximum images per category you want to convert. \n", answer => {
        maxFiles = +answer;
        rl.question("Type the name of the data you want to convert. Type 'all' to convert all data \n", async answer => {
            if (answer.toLocaleLowerCase() == "all") {
                console.log("Converting all data with " + maxFiles + " per dataset.");
                await convertAll(maxFiles);
                rl.close();
            } else {
                console.log(`Converting ${maxFiles} ${answer} images.`);
                await convertSpecific(maxFiles, answer);
                rl.close();
            }
        })
    })
}

/**
 * Starts the program.
 */
main()
