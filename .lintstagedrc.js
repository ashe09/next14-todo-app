import path from "path";

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames.map(f => path.relative(process.cwd(), f)).join(" --file ")}`;

export const listStageConfig = {
  "*.{js,jsx,ts,tsx}": [() => "tsc --incremental false --noEmit", buildEslintCommand, "prettier --write"]
};
