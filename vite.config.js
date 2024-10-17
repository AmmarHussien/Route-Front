import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(
  {
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 3000, // Increase limit to 1000 kB
    },
  },
  ({ mode }) => {
    const { GOOGLE_MAPS_API_KEY = "AIzaSyDRjZmZOxz5nP-ZIrZZqs1NJlQ2-XeH3R8" } =
      loadEnv(mode, process.cwd("./env"), "");

    return {
      define: {
        "process.env.GOOGLE_MAPS_API_KEY": JSON.stringify(GOOGLE_MAPS_API_KEY),
      },
      resolve: {
        alias: {
          "@vis.gl/react-google-maps/examples.js":
            "https://visgl.github.io/react-google-maps/scripts/examples.js",
        },
      },
    };
  }
);

// export default defineConfig(({mode}) => {
//   const {GOOGLE_MAPS_API_KEY = ''} = loadEnv(mode, process.cwd(), '');

//   return {
//     define: {
//       'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY)
//     },
//     resolve: {
//       alias: {
//         '@vis.gl/react-google-maps/examples.js':
//           'https://visgl.github.io/react-google-maps/scripts/examples.js'
//       }
//     }
//   };
// });
