import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { isCustomElement } from "@vaguevoid/design-system/vite";
import { Plugin } from "vite";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { glob } from "glob";

export default defineConfig({
  plugins: [
    flatbuffersPlugin(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
  ],
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
  },
  build: {
    sourcemap: true,
  },
});

const execAsync = promisify(exec);

export function flatbuffersPlugin(): Plugin {
  return {
    name: "vite-plugin-flatbuffers",
    async buildStart() {
      await generateFlatbuffers();
    },
    async handleHotUpdate({ file }) {
      if (file.includes("src/schema/editor_messages.fbs")) {
        await generateFlatbuffers();
      }
    },
  };
}

async function generateFlatbuffers() {
  console.log("Generating FlatBuffer TypeScript files...");
  try {
    // Ensure the generated directory exists
    const generatedDir = path.resolve(process.cwd(), "src/generated");
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
    }
    // Run the flatc compiler
    const schemaPath = path.resolve(
      process.cwd(),
      "src/schema/editor_messages.fbs"
    );
    const { stdout, stderr } = await execAsync(
      `flatc --ts -o src/generated ${schemaPath}`
    );
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    console.log("FlatBuffer generation complete");

    // Add @ts-nocheck directive to all generated TypeScript files
    console.log("Adding @ts-nocheck directive to generated files...");
    const generatedFiles = await glob(path.join(generatedDir, "**/*.ts"));
    for (const filePath of generatedFiles) {
      const DIRECTIVE = "// @ts-nocheck";
      const fileContent = fs.readFileSync(filePath, "utf-8");

      if (!fileContent.includes(DIRECTIVE)) {
        const updatedContent = `${DIRECTIVE}\n${fileContent}`;
        fs.writeFileSync(filePath, updatedContent);
      }
    }
  } catch (error) {
    console.error("Error generating FlatBuffers:", error);
  }
}
