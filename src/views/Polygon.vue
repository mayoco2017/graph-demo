<template>
  <div>
    <h5>canvas</h5>
      <canvas  id="canvas"></canvas>
      <h5>webgl</h5>
      <canvas  id="webgl"></canvas>
  </div>
</template>
<script>
  export default {
    name: 'Polygon',
    methods:{
      createProgram(gl) {
        //create webgl program object
        //create Vertex Shader
        //声明一个定点着色器，attribute声明变量，vec2：类型：二维向量；position变量名称
        const vertex = ` attribute vec2 position;
        varying vec3 color;

        void main() { gl_PointSize = 1.0;color = vec3(0.5 + position * 0.5, 0.0); gl_Position = vec4(position*0.5, 1.0, 1.0); } `;
        //create fragment Shader
        const fragment = `
        precision mediump float;
        varying vec3 color;

        void main(){
          gl_FragColor = vec4(color,1.0);
        }
        `;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertex);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragment);
        gl.compileShader(fragmentShader);
        //create webgl program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        //写入缓冲区
        const points = new Float32Array([-1, -1, 0, 1, 1, -1]);
        //创建buffer对象
        const bufferId = gl.createBuffer();
        //绑定为当前操作对象
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        //写入数据
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
        this.setProgram(gl,program)
      },
      //渲染
      setProgram(gl,program) {
        //1、将缓冲区读取到gpu
        //获取顶点着色器中的position变量
        const vPosition = gl.getAttribLocation(program, 'position');
        //给变量设置长度和类型
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        //激活这个变量
        gl.enableVertexAttribArray(vPosition);

        //2、运行着色
        //清空当前画布的内容清除
        gl.clear(gl.COLOR_BUFFER_BIT);
        //传入绘制模式:gl.TRIANGLES 表示以三角形为图元绘制
        //https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/drawArrays
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

    },
    mounted() {
      //create context
      const canvas= document.querySelector(".canvas");
      const gl = canvas.getContext("webgl");
      this.createProgram(gl)
    }

  }
</script>
