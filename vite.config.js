import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production"
  const basename = isProduction ? "/study-streak" : "/"

  return {
    base: basename,
    plugins: [react()],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "src/components"),
        },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        {
          find: "@reducer",
          replacement: path.resolve(__dirname, "src/reducer"),
        },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
      ],
    },
  }
})
