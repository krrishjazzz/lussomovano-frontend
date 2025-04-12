import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import postcssimport from 'postcss-import';

/** @type {import('postcss').ProcessOptions} */
export default {
  plugins: [postcssimport(), tailwindcss(), autoprefixer()],
};
