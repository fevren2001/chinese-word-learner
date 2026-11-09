# Chinese Word Learner

A small, extension-only vocabulary lookup experiment for Myspoti. It adds its own page; it does not modify or fork the Myspoti app.

## What this prototype does

- Provides a page titled **Chinese Word Learner** with a built-in six-word sample dictionary.
- Sends a lookup request from the page through Myspoti's page bridge to the extension's `message` hook.
- Returns a matching pinyin and English gloss, or reports that the sample dictionary has no entry.
- Uses no network access, storage, account access, or extra permissions.

Sample entries: 你好, 谢谢, 学习, 朋友, 音乐, 喜欢.

This is a bridge and page-loading experiment, not yet a full dictionary. It does not detect or respond to taps on words in Myspoti's existing lyrics screen.

## Install and try

1. In Myspoti, open **Extensions** and choose **Install from an address**.
2. Enter `https://github.com/fevren2001/chinese-word-learner`.
3. Review and accept the requested **webview.page** action. Myspoti marks this capability as critical because it gives the extension its own page.
4. Open the extension's page, leave or enter `学习`, and tap **Look up**. The page should show `xué xí — to study; to learn`.
5. Try `你好` and an unknown word to check the other response paths.

The current GitHub integration can commit files but cannot edit repository topics. To make it discoverable in the Myspoti store, add the `myspoti-extension` topic in the repository's **About → Topics** settings. Store discovery may take up to six hours.

## Validation

The manifest follows the current Myspoti extension API shape: root `manifest.json`, `main.js`, an immutable reverse-domain id, `versionCode`, and an action with an install-visible reason. The page hook returns `{ title, html }`; the message hook receives the page's JSON request and returns the result through Myspoti's documented page bridge.

The extension has not yet been installed or run inside Myspoti. The next check is to run `myspoti-ext check .` from a local checkout, then install from the repository address and exercise the three lookups above.

## References

- [Myspoti extension template](https://github.com/kota-zo/myspoti-extension-template)
- [Myspoti extension API](https://github.com/kota-zo/myspoti/blob/main/docs/extensions/API.md)
- [Myspoti extension discovery and publishing](https://github.com/kota-zo/myspoti-extensions#how-extensions-are-found)

## License

No license file has been added yet. Add one before redistributing or publishing a release package.
