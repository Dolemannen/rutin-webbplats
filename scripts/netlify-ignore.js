const branch = process.env.BRANCH || "";
const context = process.env.CONTEXT || "";
const siteRole = process.env.SITE_ROLE || "";

const expectedProductionBranchByRole = {
  qa: "qa",
  prod: "main",
};

function stopBuild(message) {
  console.log(`[netlify-ignore] ${message}`);
  process.exit(0);
}

function continueBuild(message) {
  console.log(`[netlify-ignore] ${message}`);
  process.exit(1);
}

if (!siteRole || !expectedProductionBranchByRole[siteRole]) {
  stopBuild("SITE_ROLE must be set to either qa or prod.");
}

if (context !== "production") {
  stopBuild(`Skipping non-production context: ${context || "unknown"}.`);
}

const expectedBranch = expectedProductionBranchByRole[siteRole];

if (branch !== expectedBranch) {
  stopBuild(
    `Skipping build for branch "${branch}" on ${siteRole} site. Expected "${expectedBranch}".`
  );
}

continueBuild(`Building ${siteRole} site from branch "${branch}".`);
