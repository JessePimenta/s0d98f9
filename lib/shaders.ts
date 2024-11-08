"use client";

export const shaderPresets = {
  neonPulse: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 pos = uv * 2.0 - 1.0;
      pos.x *= resolution.x / resolution.y;
      
      float d = length(pos);
      float pulse = sin(time * 2.0 + d * 5.0) * 0.5 + 0.5;
      
      vec3 color = vec3(0.8, 0.2, 0.5) * (1.0 - d);
      color *= pulse;
      
      gl_FragColor = vec4(color, 0.6);
    }
  `,
  waveform: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 pos = uv * 2.0 - 1.0;
      pos.x *= resolution.x / resolution.y;
      
      float wave = sin(pos.x * 5.0 + time) * 0.5;
      float d = abs(pos.y - wave);
      
      vec3 color = vec3(0.2, 0.5, 1.0) * (1.0 - smoothstep(0.0, 0.1, d));
      
      gl_FragColor = vec4(color, 0.6);
    }
  `,
  fractalnoise: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      float noise = random(uv + time * 0.1);
      
      vec3 color = vec3(noise * 0.5);
      gl_FragColor = vec4(color, 0.6);
    }
  `,
  waterDrops: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    vec2 hash(vec2 p) {
      p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
      return -1.0 + 2.0*fract(sin(p)*43758.5453123);
    }

    float noise(vec2 p) {
      const float K1 = 0.366025404;
      const float K2 = 0.211324865;
      
      vec2 i = floor(p + (p.x+p.y)*K1);
      vec2 a = p - i + (i.x+i.y)*K2;
      vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
      vec2 b = a - o + K2;
      vec2 c = a - 1.0 + 2.0*K2;
      
      vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
      vec3 n = h*h*h*h*vec3(dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
      
      return dot(n, vec3(70.0));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 p = uv * 6.0;
      float t = time * 0.5;
      
      float nx = noise(p + t);
      float ny = noise(p - t);
      
      vec2 drop = vec2(nx, ny) * 0.3;
      vec2 finalUV = uv + drop;
      
      float brightness = noise(finalUV * 8.0 + t);
      vec3 color = vec3(0.2, 0.4, 0.6);
      color += brightness * 0.3;
      color *= 1.0 - length(uv - 0.5) * 0.5;
      
      gl_FragColor = vec4(color, 0.6);
    }
  `,
  glitchRiver: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    vec2 hash22(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
      p3 += dot(p3, p3.yzx+33.33);
      return fract((p3.xx+p3.yz)*p3.zy);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      float t = time * 0.5;
      float glitchStrength = (sin(time) * 0.5 + 0.5) * 0.3;
      float blockSize = 32.0;
      vec2 blockUV = floor(uv * blockSize) / blockSize;
      float verticalShift = step(0.99, random(vec2(t, blockUV.x))) * 
                           random(vec2(t, blockUV.y)) * 0.3;
      float rgbShift = glitchStrength * (random(blockUV + t) * 2.0 - 1.0) * 0.015;
      vec2 distort = vec2(
        sin(uv.y * 20.0 + t) * rgbShift,
        cos(uv.x * 20.0 + t) * rgbShift
      );
      vec2 finalUV = uv + distort;
      finalUV.y += verticalShift * step(0.5, random(vec2(blockUV.x, t)));
      vec3 color;
      color.r = noise(finalUV * 1.9 + vec2(t * 0.5, 0.0));
      color.g = noise(finalUV * 2.0 + vec2(t * 0.5 + 0.2, 0.1));
      color.b = noise(finalUV * 2.1 + vec2(t * 0.5 + 0.4, 0.2));
      float scanLine = sin(uv.y * 800.0 + time * 10.0) * 0.04;
      color += scanLine;
      float bleed = noise(finalUV * 4.0 + t) * glitchStrength;
      color += vec3(bleed * 0.5, bleed * 0.2, bleed * 0.3);
      float intensity = 1.0 - length(uv - 0.5) * 0.5;
      color *= intensity;
      gl_FragColor = vec4(color, 0.6);
    }
  `,
  kaleidoscope: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;

    vec2 rotate2D(vec2 p, float a) {
      float s = sin(a);
      float c = cos(a);
      return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
      float t = time * 0.2;
      
      vec2 p = uv;
      float angle = atan(p.y, p.x);
      float radius = length(p);
      
      float segments = 8.0;
      angle = mod(angle, 3.14159 * 2.0 / segments);
      angle = abs(angle - 3.14159 / segments);
      
      p = vec2(cos(angle), sin(angle)) * radius;
      p = rotate2D(p, t);
      
      vec3 color = vec3(0.0);
      float r = length(p);
      float a = atan(p.y, p.x);
      
      color += 0.5 + 0.5 * cos(time + a * 3.0 + vec3(0,2,4));
      color *= smoothstep(1.0, 0.2, r);
      
      gl_FragColor = vec4(color, 0.6);
    }
  `,
  feedback: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      float t = time * 0.5;
      
      // Create feedback effect
      vec2 center = vec2(0.5);
      vec2 toCenter = center - uv;
      float dist = length(toCenter);
      
      // Spiral movement
      float angle = atan(toCenter.y, toCenter.x) + sin(t) * 0.5;
      float spiral = sin(dist * 10.0 - t * 2.0) * 0.5 + 0.5;
      
      // Color layers
      vec3 color;
      color.r = spiral * sin(angle * 3.0 + t) * 0.5 + 0.5;
      color.g = spiral * sin(angle * 2.0 + t * 1.2) * 0.5 + 0.5;
      color.b = spiral * sin(angle * 4.0 + t * 0.8) * 0.5 + 0.5;
      
      // Add noise
      float noise = random(uv + t) * 0.1;
      color += noise;
      
      // Fade edges
      color *= smoothstep(1.0, 0.2, dist);
      
      gl_FragColor = vec4(color, 0.6);
    }
  `,
  oilSlick: `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;

    vec3 rgb2hsv(vec3 c) {
      vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
      float d = q.x - min(q.w, q.y);
      float e = 1.0e-10;
      return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
    }

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      float t = time * 0.2;
      
      // Create iridescent pattern
      vec2 p = uv * 2.0 - 1.0;
      float len = length(p);
      float angle = atan(p.y, p.x);
      
      // Rainbow wave pattern
      float hue = sin(len * 5.0 - t) * 0.5 + 
                 cos(angle * 2.0 + t) * 0.5 +
                 sin(dot(p, vec2(cos(t), sin(t))) * 4.0) * 0.5;
      
      vec3 color = hsv2rgb(vec3(
        fract(hue),
        0.6 + sin(len * 4.0 - t) * 0.2,
        0.8 + sin(angle + t) * 0.1
      ));
      
      // Add shimmer
      float shimmer = sin(len * 20.0 - t * 3.0) * 0.1 + 0.1;
      color += shimmer;
      
      // Fade edges
      color *= smoothstep(1.2, 0.3, len);
      
      gl_FragColor = vec4(color, 0.6);
    }
  `
};