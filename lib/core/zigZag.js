#! /usr/bin/env node
/**
 * 此文件是echarts的编码算法
 */

const path = require('path');

 function quantize(val) {
	return Math.ceil(val * 1024);
}

// 加密算法
function encode(val, prev) {
	val = quantize(val);
	val -= prev;
	if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
		val--;
	}
	val = (val << 1) ^ (val >> 15);
	return String.fromCharCode(val + 64);
}

// 编码Polygon
function encodePolygon(coordinate, encodeOffsets) {
	let result = '';
    if (!Array.isArray(coordinate)) return coordinate;
	let prevX = quantize(coordinate[0][0]);
	let prevY = quantize(coordinate[0][1]);
	// Store the origin offset
	encodeOffsets[0] = prevX;
	encodeOffsets[1] = prevY;

	for (let i = 0; i < coordinate.length; i++) {
		const point = coordinate[i];
		result += encode(point[0], prevX);
		result += encode(point[1], prevY);

		prevX = quantize(point[0]);
		prevY = quantize(point[1]);
	}

	return result;
}

// 解码
function decodePolygon (coordinate, encodeOffsets) {
    const result = [];
    const prevX = encodeOffsets[0];
    const prevY = encodeOffsets[1];

    for (let i = 0; i < coordinate.length; i += 2) {
        let x = coordinate.charCodeAt(i) - 64;
        let y = coordinate.charCodeAt(i + 1) - 64;
        x = (x >> 1) ^ (-(x & 1));
        y = (y >> 1) ^ (-(y & 1));

        x += prevX;
        y += prevY;

        prevX = x;
        prevY = y;

        result.push([ x / 1024, y / 1024 ]);
    }
    return result;
};

// 加密 geo json
const encodeGeo = function (json) {
    const { features } = json;
    json.UTF8Encoding = true;
    features.forEach(function(feature) {
        const encodeOffsets = (feature.geometry.encodeOffsets = []);
        const { coordinates } = feature.geometry;
        if (feature.geometry.type === 'Polygon') {
            coordinates.forEach(function(coordinate, idx) {
                coordinates[idx] = encodePolygon(
                    coordinate,
                    (encodeOffsets[idx] = [])
                );
            });
        } else if (feature.geometry.type === 'MultiPolygon') {
            coordinates.forEach(function(polygon, idx1) {
                encodeOffsets[idx1] = [];
                polygon.forEach(function(coordinate, idx2) {
                    coordinates[idx1][idx2] = encodePolygon(
                        coordinate,
                        (encodeOffsets[idx1][idx2] = [])
                    );
                });
            });
        }
    });
    return json;
};

module.exports = encodeGeo;
