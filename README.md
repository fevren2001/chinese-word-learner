# Chinese Word Learner

An extension-only experiment for Myspoti. It keeps the vocabulary demo page and adds a diagnostic listener to find out whether tapping timed lyric words produces a playback seek event. It does not modify or fork Myspoti.

## What this version does

- Keeps the built-in six-word lookup page: 你好, 谢谢, 学习, 朋友, 音乐, 喜欢.
- Logs playback seek events as `LYRIC_SEEK_TEST`, including the song and target position.
- Makes no network requests and does not read or change your Spotify account.

The seek listener is an experiment. Myspoti's current API documents seek events only when playback moves by more than three seconds. A lyric tap may move less than that, and the API does not directly tell extensions which lyric word was tapped.

## Run the lyric-tap experiment

1. Install the updated ZIP from file. Myspoti may ask you to accept the added **playback.events** action.
2. Play a song with word-by-word lyrics. Tap a word whose timestamp is more than three seconds from the current playback position.
3. Open this extension's log/details and look for a `LYRIC_SEEK_TEST` entry.
4. Tap another word less than three seconds from the current position and check whether it produces an entry.
5. Send me the entries—or tell me that none appeared. The result will show whether we can use seek position as a practical signal for a future word-meaning popup.

## Existing lookup page

Open the extension's own page, enter `学习`, and tap **Look up**. It should show `xué xí — to study; to learn`. This checks the extension page bridge only; it does not add lookups to the lyrics screen.

## What would be needed next

If lyric taps produce usable seek events, the extension would still need word timings for the exact lyrics shown to identify the selected word. If not, the current extension API has no direct callback for taps on lyric words. Either way, this diagnostic will tell us before we build further.

## References

- [Myspoti extension template](https://github.com/kota-zo/myspoti-extension-template)
- [Myspoti extension API](https://github.com/kota-zo/myspoti/blob/main/docs/extensions/API.md)
- [Myspoti extension guide](https://github.com/kota-zo/myspoti/blob/main/docs/extensions/GUIDE.md)
