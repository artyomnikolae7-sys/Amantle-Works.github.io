declare module 'ogl' {
  export class Renderer {
    constructor(options?: any);
    gl: any;
    setSize(w: number, h: number): void;
    render(options: { scene: any }): void;
    dpr: number;
  }
  export class Program {
    constructor(gl: any, options?: any);
    uniforms: any;
    remove(): void;
  }
  export class Mesh {
    constructor(gl: any, options?: any);
  }
  export class Triangle {
    constructor(gl: any);
    attributes: any;
    remove(): void;
  }
  export class Texture {
    constructor(gl: any, options?: any);
    image: any;
    needsUpdate: boolean;
    texture: any;
  }
  export class Color {
    constructor(color?: any);
    r: number;
    g: number;
    b: number;
    set(color: any): this;
  }
  export type OGLRenderingContext = any;
}
