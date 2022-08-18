const SEMVER_REGEX =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const bumpMap = {
  major: 0,
  minor: 1,
  patch: 2,
};

const bumpVersion = (currentVersion, bump, suffix) => {
  const newVersionArr = [...currentVersion];
  newVersionArr[bumpMap[bump]]++;

  const newVersion = `v${newVersionArr.join(".")}`;

  if (suffix) {
    return `${newVersion}-${suffix}`;
  }
  return newVersion;
};
/**
 * @param {import('@actions/github/lib/context').Context} context
 * @param {typeof import('@actions/core')} core
 * @param {import('octokit').Octokit} github
 */
export default async function determineNextVersion({ context, core, github }) {
  const { bump, suffix } = context.payload.inputs;
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
    }
  );
  if (response.status !== 200) {
    console.log("No previous release found, going to v1.0.0");
    return "v1.0.0";
  }

  const currentVersion = tag_name
    .match(SEMVER_REGEX)
    .slice(1, 4)
    .map((v) => parseInt(v, 10));

  const newVersion = bumpVersion(currentVersion, bump, suffix);

  core.setOutput("tag", newVersion);
  core.setOutput("name", `Release ${newVersion}`);
}
