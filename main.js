// Chinese Word Learner: a self-contained Myspoti page and message-bridge example.
// The page uses only its built-in sample dictionary; it makes no network requests.

var WORDS = {
  "你好": { pinyin: "nǐ hǎo", meaning: "hello; hi" },
  "谢谢": { pinyin: "xiè xie", meaning: "thank you" },
  "学习": { pinyin: "xué xí", meaning: "to study; to learn" },
  "朋友": { pinyin: "péng you", meaning: "friend" },
  "音乐": { pinyin: "yīn yuè", meaning: "music" },
  "喜欢": { pinyin: "xǐ huan", meaning: "to like; to enjoy" }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

myspoti.provide("page", function () {
  return {
    title: "Chinese Word Learner",
    html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Chinese Word Learner</title>
  <style>
    :root { color-scheme: light dark; font-family: system-ui, sans-serif; }
    body { max-width: 36rem; margin: 0 auto; padding: 1.25rem; line-height: 1.5; }
    h1 { font-size: 1.5rem; }
    p { color: #888; }
    .row { display: flex; gap: .5rem; }
    input, button { box-sizing: border-box; padding: .8rem; font: inherit; border-radius: .6rem; }
    input { min-width: 0; flex: 1; }
    button { cursor: pointer; }
    #result { margin-top: 1.25rem; padding: 1rem; border-radius: .75rem; background: rgba(127,127,127,.14); }
    #word { font-size: 2rem; }
    #status { min-height: 1.5em; }
  </style>
</head>
<body>
  <h1>Chinese Word Learner</h1>
  <p>Try one of the six built-in words. This demo works offline.</p>
  <div class="row">
    <input id="query" type="text" lang="zh" value="学习" aria-label="Chinese word">
    <button id="lookup" type="button">Look up</button>
  </div>
  <div id="result" aria-live="polite">
    <div id="word">学习</div>
    <div id="pinyin">xué xí</div>
    <div id="meaning">to study; to learn</div>
  </div>
  <p id="status" role="status">Ready.</p>
  <script>
    (function () {
      var query = document.getElementById("query");
      var status = document.getElementById("status");
      document.getElementById("lookup").addEventListener("click", function () {
        status.textContent = "Looking up…";
        MyspotiPage.postMessage(JSON.stringify({ type: "lookup", word: query.value.trim() }));
      });
      query.addEventListener("keydown", function (event) {
        if (event.key === "Enter") document.getElementById("lookup").click();
      });
      window.addEventListener("message", function (event) {
        var reply = event.data;
        if (typeof reply === "string") {
          try { reply = JSON.parse(reply); } catch (_) {}
        }
        if (!reply || reply.type !== "lookup-result") return;
        if (!reply.found) {
          status.textContent = "No sample entry for “" + reply.word + "”.";
          return;
        }
        document.getElementById("word").textContent = reply.word;
        document.getElementById("pinyin").textContent = reply.pinyin;
        document.getElementById("meaning").textContent = reply.meaning;
        status.textContent = "Found in the sample dictionary.";
      });
    }());
  </script>
</body>
</html>`
  };
});

myspoti.provide("message", function (message) {
  if (!message || message.type !== "lookup") return null;
  var word = String(message.word || "").trim();
  var entry = WORDS[word];
  if (!entry) {
    return { type: "lookup-result", found: false, word: word };
  }
  return {
    type: "lookup-result",
    found: true,
    word: word,
    pinyin: entry.pinyin,
    meaning: entry.meaning
  };
});

myspoti.on("playback", function (event) {
  if (!event || event.type !== "seek") return;
  var track = event.track || {};
  myspoti.log(
    "LYRIC_SEEK_TEST",
    track.title || "unknown track",
    track.artist || "unknown artist",
    "positionMs=" + event.positionMs,
    "reason=" + event.reason
  );
});
