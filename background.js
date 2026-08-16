
const canvas = document.getElementById("chaosBackground");
const ctx = canvas.getContext("2d");

let width;
let height;
let time = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


function drawBackground() {

    const image = ctx.createImageData(width, height);
    const pixels = image.data;

    for (let y = 0; y < height; y += 4) {

        for (let x = 0; x < width; x += 4) {

            const nx = x - width / 2;
            const ny = y - height / 2;

            const distance =
                Math.sqrt(nx * nx + ny * ny);

            /*
             * Main psychedelic waves
             */

            const wave1 =
                Math.sin(
                    y * 0.025 +
                    time
                );

            const wave2 =
                Math.cos(
                    x * 0.018 -
                    time * 1.2
                );

            const wave3 =
                Math.sin(
                    distance * 0.025 -
                    time * 2
                );

            /*
             * Combine the waves
             */

            const value =
                (wave1 + wave2 + wave3) / 3;

            const amount =
                (value + 1) / 2;


            /*
             * EarthBound-ish colors
             */

            let r =
                20 +
                amount * 150;

            let g =
                10 +
                amount * 60;

            let b =
                80 +
                amount * 150;


            /*
             * Extra color shifting
             */

            r += Math.sin(time + distance * 0.01) * 35;

            g += Math.sin(time * 1.4 + x * 0.01) * 25;

            b += Math.cos(time + y * 0.012) * 35;


            r = Math.max(0, Math.min(255, r));
            g = Math.max(0, Math.min(255, g));
            b = Math.max(0, Math.min(255, b));


            /*
             * Fill a 4x4 block.
             */

            for (let py = 0; py < 4; py++) {

                for (let px = 0; px < 4; px++) {

                    if (
                        x + px >= width ||
                        y + py >= height
                    ) {
                        continue;
                    }

                    const index =
                        ((y + py) * width +
                        (x + px)) * 4;

                    pixels[index] = r;
                    pixels[index + 1] = g;
                    pixels[index + 2] = b;
                    pixels[index + 3] = 255;
                }
            }
        }
    }

    ctx.putImageData(image, 0, 0);

    time += 0.025;

    requestAnimationFrame(drawBackground);
}

drawBackground();

