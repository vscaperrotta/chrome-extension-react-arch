import Browser from 'webextension-polyfill';

let isEnabled = false;

Browser.action.onClicked.addListener(async (tab) => {
  isEnabled = !isEnabled;

  if (tab.id) {
    Browser.tabs.sendMessage(tab.id, {
      action: "INIT",
      value: isEnabled,
    });
  }

  const iconPath = isEnabled ? "../icon-enabled.png" : "../icon-disabled.png";
  Browser.action.setIcon({ path: iconPath });
});
