import {vec3, vec4} from 'gl-matrix';
import Drawable from './rendering/gl/Drawable';
import {gl} from './globals';

class Cube extends Drawable {
    customColor: number[];

    indices: Uint32Array;
    positions: Float32Array;
    normals: Float32Array;

    // Simplistic constructor. Note to future self: The call to super() is required!
    constructor() {
        super();
    }

    // Pass the cube's data to the GPU
    create() {
        // Need 36 indices overall, since surface normals are done per vertex (6 verts/face * 6 faces)
        this.indices = new Uint32Array([0, 1, 2,
                                        0, 2, 3,
                                        4, 5, 6,
                                        4, 6, 7,
                                        8, 9, 10,
                                        8, 10, 11,
                                        12, 13, 14,
                                        12, 14, 15,
                                        16, 17, 18,
                                        16, 18, 19,
                                        20, 21, 22,
                                        20, 22, 23]);
        this.normals = new Float32Array([0, 0, 1, 0,
                                         0, 0, 1, 0,
                                         0, 0, 1, 0,
                                         0, 0, 1, 0,
                                         0, 1, 0, 0,
                                         0, 1, 0, 0,
                                         0, 1, 0, 0,
                                         0, 1, 0, 0,
                                         1, 0, 0, 0,
                                         1, 0, 0, 0,
                                         1, 0, 0, 0,
                                         1, 0, 0, 0,
                                         1, 0, 0, 0,
                                         1, 0, 0, 0,
                                         1, 0, 0, 0,
                                         1, 0, 0, 0,
                                         0, 0, 1, 0,
                                         0, 0, 1, 0,
                                         0, 0, 1, 0,
                                         0, 0, 1, 0,
                                         0, 1, 0, 0,
                                         0, 1, 0, 0,
                                         0, 1, 0, 0,
                                         0, 1, 0, 0]);
        this.positions = new Float32Array([1, 1, 0, 1,
                                           -1, 1, 0, 1,
                                           -1, -1, 0, 1,
                                           1, -1, 0, 1,
                                           1, 1, 0, 1,
                                           1, 1, -2, 1,
                                           -1, 1, -2, 1,
                                           -1, 1, 0, 1,
                                           1, 1, -2, 1,
                                           1, 1, 0, 1,
                                           1, -1, 0, 1,
                                           1, -1, -2, 1,
                                           -1, 1, 0, 1,
                                           -1, 1, -2, 1,
                                           -1, -1, -2, 1,
                                           -1, -1, 0, 1,
                                           -1, 1, -2, 1,
                                           1, 1, -2, 1,
                                           1, -1, -2, 1,
                                           -1, -1, -2, 1,
                                           1, -1, 0, 1,
                                           -1, -1, 0, 1,
                                           -1, -1, -2, 1,
                                           1, -1, -2, 1]);

        this.generateIdx();
        this.generateNor();
        this.generatePos();

        this.count = this.indices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);
    
        console.log(`Created cube`);
    }
};

export default Cube;