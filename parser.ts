const fs = require('fs');
const ndjson = require('ndjson');
const sharp = require('sharp');

import * as readline from 'readline';


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

main()

function main(){
    let maxFiles:number;

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    rl.question("Type the maximum images per category you want to convert. \n", answer => {
        maxFiles = +answer;
        rl.question("Type the name of the data you want to convert. Type 'all' to convert all data \n", async answer => {
            if(answer.toLocaleLowerCase() == "all" ){
                console.log("Converting all data with " + maxFiles + " per dataset.");
                await convertAll(maxFiles);
                rl.close();
            }
            else{
                console.log(`Converting ${maxFiles} ${answer} images.`);
                await convertSpecific(maxFiles,answer);
                rl.close();
            }
        })
    })
}

async function convertAll(maxFiles: number) {
    for (let j = 0; j < dataList.length; j++) {
        await parseSimplifiedDrawings(`data/full_simplified_${dataList[j]}.ndjson`, async function (err, drawings) {
            if (err) return console.error(err);
            let res;

            for (let i = 0; i < maxFiles; i++) {

                let d = drawings[i];
                res = generate_svg(d.drawing);

                //Handles progress console output
                let percent = Math.round((j*maxFiles+i)/(dataList.length*maxFiles)*1000)/1000;
                console.clear();
                console.log(d.word + ": " + i + "/" + maxFiles + "    (" + (percent*100).toFixed(1)  + "%)")


                //Converts svg to png and saves it to the according directory
                await sharp(Buffer.from(res))
                    .png()
                    .flatten({background: "#FFFFFF"})
                    .toFile(__dirname + `/data/40k/${d.word}/${d.word}_${d.key_id}.png`);
            }
        })
    }
    console.log('Finished parsing');
}

async function convertSpecific(maxFiles: number, data:string) {

        await parseSimplifiedDrawings(`data/full_simplified_${data}.ndjson`, async function (err, drawings) {
            if (err) return console.error(err);
            let res;
            for (let i = 0; i < maxFiles; i++) {

                let d = drawings[i];
                res = generate_svg(d.drawing);

                //Handles progress console output
                let percent = Math.round((i)/(maxFiles)*1000)/1000;
                console.clear();
                console.log(d.word + ": " + i + "/" + maxFiles + "    (" + (percent*100).toFixed(1)  + "%)")


                //Converts svg to png and saves it to the according directory
                await sharp(Buffer.from(res))
                    .png()
                    .flatten({background: "#FFFFFF"})
                    .toFile(__dirname + `/data/images/${d.word}/${d.word}_${d.key_id}.png`);
            }
        })
    console.log('Finished parsing');
}



function parseSimplifiedDrawings(fileName, callback): Promise<number> {
    return new Promise(resolve => {
        let drawings = [];
        let fileStream = fs.createReadStream(fileName)
        fileStream
            .pipe(ndjson.parse())
            .on('data', function (obj) {
                drawings.push(obj)
            })
            .on("error", callback)
            .on("end", async function () {
                await callback(null, drawings)
                resolve(null);
            });
    });
}


/***
 * Converts the ndjson.drawing data into a svg-file.
 * @param data The drawing data of a single image.
 * @return returns a svg of the given image
 */
function generate_svg(data: any) {
    var svg = '';
    svg += '<svg width="255px" height="255px" version="1.1" xmlns="http://www.w3.org/2000/svg">\n';
    for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < data[j][0].length - 1; i++) {
            let path = '';
            path += 'M' + data[j][0][i] + ' ' + data[j][1][i];   // moveTo
            path += ' L ' + data[j][0][i + 1] + ' ' + data[j][1][i + 1]; // lineTo
            path += ' Z';                                    // closePath
            svg += '<path d="' + path + '" stroke="black" stroke-width="2"/>\n';
        }
    }
    svg += '</svg>\n';
    return svg;
}