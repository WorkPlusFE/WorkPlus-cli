require('colors');

const execa = require('execa');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('@w6s/cli-shared-utils');

const getGitSha = () => {
  let hash = '';
  try {
    hash = execa.shellSync('git rev-parse HEAD').stdout;
  } catch (err) {
    hash = uuidv4();
    logger.warn('Have not commit, will use random uuid as release', 'Sentry');
  };
  return hash.substr(0, 7);
};

/**
 * Sentry options are required
 * 1、organization
 * 2、project
 * 3、apiKey
 * 4、release (auto)
 */ 
const isLegalOptions = (options) => {
  const requiredOptions = ['organization', 'project', 'apiKey', 'baseSentryURL'];
  for (let i = 0; i < requiredOptions.length; i += 1) {
    const key = requiredOptions[i];
    if (options[key] === '') {
      logger.error(`[${key}] is required`);
      return false;
    }
  }
  return true;
};

module.exports = {
  getGitSha,
  isLegalOptions,
};
