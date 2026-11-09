# Chinese Word Learner

An extension-only experiment for mapping lyric taps to word timestamps in Myspoti. It does not modify or fork Myspoti.

## Current experiment

When you tap a timed lyric word, Myspoti seeks to its timestamp. This extension listens for seek events, reads Spotify's word-timed lyrics for that track, and logs the nearest timed word as `LYRIC_TAP_GUESS`.

It also keeps the separate six-word sample lookup page, but that page is not the feature we are testing now.

## Try it

1. Install this ZIP from file. Accept the added **spotify.catalog** action; the extension uses it to read Spotify's lyrics and word timings.
2. Play a song with word-by-word lyrics and tap a word.
3. Open the extension's logs. Find `LYRIC_TAP_GUESS` and check whether `word=` matches the word you tapped. Send me a few entries, including `deltaMs=`.
4. If the log says `LYRIC_TAP_NO_WORD_TIMING`, Spotify did not return word timings for that track. If it says `LYRIC_TAP_LOOKUP_ERROR`, send that entry too.

Myspoti documents seek events for jumps over three seconds, so use a word more than three seconds away from the current playback position for this test. The nearest-word match is only a hypothesis until we compare it with your taps.

## What comes next

If the guessed words match, the next version can look up meanings and show them in a short on-screen message. If the current screen's lyrics do not match Spotify's lyrics or the seek position is not close to the word time, we will adjust the matching approach first.

## References

- [Myspoti extension template](https://github.com/kota-zo/myspoti-extension-template)
- [Myspoti extension API](https://github.com/kota-zo/myspoti/blob/main/docs/extensions/API.md)
