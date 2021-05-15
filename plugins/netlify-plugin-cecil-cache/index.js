const path = require('path');

const getCacheDirs = (constants, inputs) => [
  constants.PUBLISH_DIR,
  inputs.cacheDir || env.CECIL_CACHE_DIR || '.cache'
];

module.exports = {
  async onPreBuild({constants, inputs, utils}) {
    if (process.cwd() === constants.PUBLISH_DIR) {
      utils.build.failBuild(
        `Your site’s publish directory is not set correctly (“${constants.PUBLISH_DIR}”).`
      );
    }

    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.restore(cacheDirs)) {
      utils.status.show({
        title: 'Build cache',
        summary: 'Cecil cache restored from previous build.',
        text: (await utils.cache.list()).join("\n")
      })
      console.log('Found the Cecil cache (%s).', cacheDirs.join(', '));
    } else {
      console.log('Cecil cache not found.');
    }
  },
  async onPostBuild({constants, inputs, utils}) {
    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.save(cacheDirs)) {
      utils.status.show({
        title: 'Build cache',
        summary: 'Cecil cache stored for future builds.',
        text: (await utils.cache.list()).join("\n")
      })
      console.log('Stored the Cecil cache (%s) to speed up next builds.', cacheDirs.join(', '));
    } else {
      console.log('No Cecil build found.');
    }
  },
};
