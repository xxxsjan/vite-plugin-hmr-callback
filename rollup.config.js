import resolve from "rollup-plugin-node-resolve"; //—帮助 Rollup 查找外部模块，然后导入
import babel from "rollup-plugin-babel"; //— 让我们可以使用es6新特性来编写代码
import json from "rollup-plugin-json";
// import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      //   file: pkg.main,
      file: "lib/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      //   file: pkg.module,
      file: "lib/index.module.js",
      format: "esm",
      sourcemap: true,
    },
    // {
    //   file: "lib/index.umd.js",
    //   format: "umd",
    //   sourcemap: true,
    // },
  ],
  plugins: [
    resolve(), // 这样 Rollup 能找到 `ms`
    json(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
