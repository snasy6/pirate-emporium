<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OS95 Battle Background</title>

    <style>
        html, body {
            margin: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: black;
            font-family: monospace;
        }

        canvas {
            width: 100%;
            height: 100%;
            display: block;
        }

        #controls {
            position: fixed;
            top: 30px;
            left: 30px;

            width: 320px;
            padding: 20px;

            background: rgba(10, 5, 20, 0.92);
            border: 2px solid white;

            color: white;

            display: none;

            user-select: none;
        }

        #controls h2 {
            margin-top: 0;
        }

        #speed {
            width: 100%;
        }

        .value {
            margin-top: 8px;
        }
    </style>
</head>

<body>

<canvas id="screen"></canvas>

<div id="controls">

    <h2>OS95 SCREENSAVER</h2>

    <p>
        Layer 1:
        <span id="layer1">0</span>
    </p>

    <p>
        Layer 2:
        <span id="layer2">1</span>
    </p>

    <label>
        Speed
    </label>

    <input
        id="speed"
        type="range"
        min="0.005"
        max="0.15"
        step="0.001"
        value="0.035"
    >

    <div class="value">
        Speed:
        <span id="speedValue">0.035</span>
    </div>

    <p>
        R = Randomize
    </p>

    <p>
        ← → = Layer 1
    </p>

    <p>
        ↑ ↓ = Layer 2
    </p>

    <p>
        TAB = Close
    </p>

</div>

<script>

const canvas =
    document.getElementById("screen");

const ctx =
    canvas.getContext("2d");

const controls =
    document.getElementById("controls");

const speedSlider =
    document.getElementById("speed");

const speedValue =
    document.getElementById("speedValue");

const layer1Text =
    document.getElementById("layer1");

const layer2Text =
    document.getElementById("layer2");


/* ==========================
   Canvas
   ========================== */

function resize()
{
    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

window.addEventListener(
    "resize",
    resize
);

resize();


/* ==========================
   Layer system
   ========================== */

const LAYER_COUNT = 327;

const layers = [];


function random(min, max)
{
    return (
        min +
        Math.random() *
        (max - min)
    );
}


for (
    let i = 0;
    i < LAYER_COUNT;
    i++
)
{
    layers.push({

        speed:
            random(
                0.15,
                1.5
            ),

        scale:
            random(
                0.008,
                0.08
            ),

        amplitude:
            random(
                3,
                55
            ),

        phase:
            random(
                0,
                Math.PI * 2
            ),

        distortion:
            Math.floor(
                Math.random() * 6
            ),

        colorMode:
            Math.floor(
                Math.random() * 6
            )
    });
}


let layer1 = 0;
let layer2 = 1;

let time = 0;

let animationSpeed =
    0.035;

let nextRandom =
    10;


/* ==========================
   Randomize
   ========================== */

function randomize()
{
    layer1 =
        Math.floor(
            Math.random() *
            LAYER_COUNT
        );

    layer2 =
        Math.floor(
            Math.random() *
            LAYER_COUNT
        );

    nextRandom =
        time +
        random(
            8,
            20
        );

    updateLabels();
}


/* ==========================
   Distortion
   ========================== */

function distort(
    layer,
    x,
    y
)
{
    const a =
        layer.amplitude;

    const s =
        layer.scale;

    const p =
        layer.phase;

    const speed =
        layer.speed;

    let dx = 0;
    let dy = 0;


    switch (
        layer.distortion
    )
    {
        case 0:

            dx =
                Math.sin(
                    y * s +
                    time * speed +
                    p
                ) * a;

            break;


        case 1:

            dy =
                Math.sin(
                    x * s +
                    time * speed +
                    p
                ) * a;

            break;


        case 2:

            dx =
                Math.sin(
                    y * s +
                    time * speed +
                    p
                ) * a;

            dy =
                Math.cos(
                    x * s +
                    time * speed
                ) * a;

            break;


        case 3:

            const distance =
                Math.sqrt(
                    x * x +
                    y * y
                );

            dx =
                Math.sin(
                    distance * s -
                    time * speed +
                    p
                ) * a;

            dy =
                Math.cos(
                    distance * s -
                    time * speed
                ) * a;

            break;


        case 4:

            dx =
                Math.sin(
                    y * s +
                    Math.sin(
                        time * speed
                    ) * 3
                ) * a;

            dy =
                Math.sin(
                    x * s +
                    Math.cos(
                        time * speed
                    ) * 3
                ) * a;

            break;


        default:

            dx =
                Math.sin(
                    (x + y) * s +
                    time * speed +
                    p
                ) * a;

            dy =
                Math.cos(
                    (x - y) * s +
                    time * speed
                ) * a;

            break;
    }


    return [
        x + dx,
        y + dy
    ];
}


/* ==========================
   Colors
   ========================== */

function getColor(
    layer,
    x,
    y
)
{
    const v1 =
        Math.sin(
            x * layer.scale +
            time * layer.speed +
            layer.phase
        );

    const v2 =
        Math.cos(
            y * layer.scale -
            time * layer.speed
        );

    const v =
        (v1 + v2) / 2;

    const c =
        (v + 1) / 2;


    let r, g, b;


    switch (
        layer.colorMode
    )
    {
        case 0:

            r =
                30 + 90 * c;

            g =
                15 + 55 * c;

            b =
                70 + 170 * c;

            break;


        case 1:

            r =
                20 + 70 * c;

            g =
                80 + 160 * c;

            b =
                100 + 120 * c;

            break;


        case 2:

            r =
                100 + 155 * c;

            g =
                20 + 80 * c;

            b =
                70 + 150 * c;

            break;


        case 3:

            r =
                120 + 135 * c;

            g =
                45 + 130 * c;

            b =
                20 + 80 * c;

            break;


        case 4:

            r =
                30 + 100 * c;

            g =
                100 + 150 * c;

            b =
                40 + 80 * c;

            break;


        default:

            r =
                127 +
                127 *
                Math.sin(
                    v * Math.PI
                );

            g =
                127 +
                127 *
                Math.sin(
                    v * Math.PI + 2
                );

            b =
                127 +
                127 *
                Math.sin(
                    v * Math.PI + 4
                );

            break;
    }


    return [
        Math.floor(r),
        Math.floor(g),
        Math.floor(b)
    ];
}


/* ==========================
   Rendering
   ========================== */

function draw()
{
    const w =
        canvas.width;

    const h =
        canvas.height;


    const image =
        ctx.createImageData(
            w,
            h
        );

    const pixels =
        image.data;


    const a =
        layers[layer1];

    const b =
        layers[layer2];


    /*
     * Lower resolution internally.
     * This makes the psychedelic
     * effect much faster.
     */

    const step = 4;


    for (
        let y = 0;
        y < h;
        y += step
    )
    {
        for (
            let x = 0;
            x < w;
            x += step
        )
        {
            const ax =
                distort(
                    a,
                    x - w / 2,
                    y - h / 2
                );

            const bx =
                distort(
                    b,
                    x - w / 2,
                    y - h / 2
                );


            const c1 =
                getColor(
                    a,
                    ax[0],
                    ax[1]
                );

            const c2 =
                getColor(
                    b,
                    bx[0],
                    bx[1]
                );


            const r =
                Math.floor(
                    c1[0] * 0.55 +
                    c2[0] * 0.45
                );

            const g =
                Math.floor(
                    c1[1] * 0.55 +
                    c2[1] * 0.45
                );

            const bcol =
                Math.floor(
                    c1[2] * 0.55 +
                    c2[2] * 0.45
                );


            /*
             * Fill a 4x4 block.
             */

            for (
                let yy = 0;
                yy < step &&
                y + yy < h;
                yy++
            )
            {
                for (
                    let xx = 0;
                    xx < step &&
                    x + xx < w;
                    xx++
                )
                {
                    const index =
                        (
                            (y + yy) * w +
                            (x + xx)
                        ) * 4;

                    pixels[index] =
                        r;

                    pixels[index + 1] =
                        g;

                    pixels[index + 2] =
                        bcol;

                    pixels[index + 3] =
                        255;
                }
            }
        }
    }


    ctx.putImageData(
        image,
        0,
        0
    );


    time +=
        animationSpeed;


    if (
        time >=
        nextRandom
    )
    {
        randomize();
    }


    requestAnimationFrame(
        draw
    );
}


/* ==========================
   UI
   ========================== */

function updateLabels()
{
    layer1Text.textContent =
        layer1;

    layer2Text.textContent =
        layer2;

    speedValue.textContent =
        animationSpeed.toFixed(3);
}


speedSlider.addEventListener(
    "input",
    () =>
    {
        animationSpeed =
            Number(
                speedSlider.value
            );

        updateLabels();
    }
);


/* ==========================
   Keyboard
   ========================== */

document.addEventListener(
    "keydown",
    event =>
    {
        if (
            event.key ===
            "Tab"
        )
        {
            event.preventDefault();

            if (
                controls.style.display ===
                "block"
            )
            {
                controls.style.display =
                    "none";
            }
            else
            {
                controls.style.display =
                    "block";
            }
        }


        if (
            event.key ===
            "r"
        )
        {
            randomize();
        }


        if (
            event.key ===
            "ArrowLeft"
        )
        {
            layer1--;

            if (
                layer1 < 0
            )
            {
                layer1 =
                    LAYER_COUNT - 1;
            }

            updateLabels();
        }


        if (
            event.key ===
            "ArrowRight"
        )
        {
            layer1++;

            if (
                layer1 >=
                LAYER_COUNT
            )
            {
                layer1 = 0;
            }

            updateLabels();
        }


        if (
            event.key ===
            "ArrowUp"
        )
        {
            layer2++;

            if (
                layer2 >=
                LAYER_COUNT
            )
            {
                layer2 = 0;
            }

            updateLabels();
        }


        if (
            event.key ===
            "ArrowDown"
        )
        {
            layer2--;

            if (
                layer2 < 0
            )
            {
                layer2 =
                    LAYER_COUNT - 1;
            }

            updateLabels();
        }
    }
);


/* ==========================
   Start
   ========================== */

updateLabels();

draw();

</script>

</body>
</html>
