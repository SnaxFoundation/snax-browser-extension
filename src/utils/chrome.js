import theme from 'src/styles/style-constants';

export const setBadge = (text = '1') => {
  chrome.browserAction.setBadgeText({ text });
};

export const setBadgeColor = (active = true) => {
  const badgeColor = active ? theme.color.error : theme.paletteBlueGrey[400];
  chrome.browserAction.setBadgeBackgroundColor({ color: badgeColor });
};

export const clearBadge = () => {
  chrome.browserAction.setBadgeText({ text: '' });
};

export const getActiveTabUrlAsync = async () => {
  return new Promise(resolve => {
    window.chrome.tabs.query({ active: true }, tabs => {
      resolve(tabs[0].url);
    });
  });
};
