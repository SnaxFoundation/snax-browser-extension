import snaxDomains from 'config/snaxDomains';

const isSnaxDomain = url => {
  if (!url) return false;

  const match = url.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
  );

  if (match) {
    return snaxDomains.includes(match[2]);
  }

  return false;
};

module.exports = {
  isSnaxDomain,
};
