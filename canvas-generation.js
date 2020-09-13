const fs = require("fs");
const { createCanvas } = require("canvas");

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke === "undefined") {
		stroke = true;
	}
	if (typeof radius === "undefined") {
		radius = 5;
	}
	if (typeof radius === "number") {
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
	} else {
		var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(
		x + width,
		y + height,
		x + width - radius.br,
		y + height
	);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
}

// define canvas size
let width = 1200;
let height = 630;

// draw canvas
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

// Fill the background
context.fillStyle = "#0077ff";
context.fillRect(0, 0, width, height);

// re-adjust width and height
width = width - 50;
height = height - 50;

// fill an inner container to simulate a border
context.shadowOffsetX = 0;
context.shadowOffsetY = 0;
context.shadowBlur = 25;
context.shadowColor = "rgba(0,0,0,1)";
context.fillStyle = "#222";
roundRect(context, 25, 25, width, height, 15, true, false);

// set the copy style
context.font = "bold 82pt Montserrat";
context.textAlign = "left";
context.textBaseline = "top";
context.fillStyle = "#fff";

// re-adjust width and height again
width -= 50;
height -= 50;

// redraw the title over multiple lines
const title = "Baran's ";
const words = title.split(" ");
let line = "";
let fromTop = 70;
words.forEach((word) => {
	let testLine = line + word + " ";
	if (context.measureText(testLine).width > width) {
		context.fillText(line.trim(), 60, fromTop);
		line = word + " ";
		fromTop = fromTop + 125;
	} else {
		line = line + word + " ";
	}
});
context.fillText(line.trim(), 60, fromTop);

// // *********************
// // Create gradient
// var grd = context.createRadialGradient(0, 0, 5, 600, 315, 100);
// grd.addColorStop(0, 'red');
// grd.addColorStop(1, 'black');

// // Fill with gradient
// context.fillStyle = grd;
// context.fillRect(0, 0, 1200, 630);
// // *********************

// insert domain
context.fillStyle = "#ccc";
context.font = "bold 24pt JetBrains Mono";
context.fillText("baranbabur.me", 60, 540);

// insert handle
context.fillStyle = "#ccc";
context.font = "bold 24pt JetBrains Mono";
context.textAlign = "right";
context.fillText("@8aran_", 1140, 540);

// export image
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(`social-image.png`, buffer);
