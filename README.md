# Bilibili Subtitles Converter
Converts JSON subtitles used on bilibili.com to SRT format. **Works offline** after installing as a PWA app.

[Open in browser or install PWA app](https://self-related.github.io/json-to-srt-converter-pwa/)

[JSON example](/subs-example.json)

### Screenshots:
<img width="519"  alt="Screenshot From 2026-06-26 15-57-24" src="https://github.com/user-attachments/assets/bd85e116-b8ac-438b-b271-bef1ae01e3fa" />

### JSON input example:
```
{
  "body": [
    {
      "from": 34.27,
      "to": 35.71,
      "content": "This is where it begins"
    },
    {
      "from": 37.27,
      "to": 37.849,
      "location": 2,
      "content": "Hello everyone"
    }
  ]
}

```

### Output example:
```
WEBVTT
Kind: captions
Language: en

00:00:34.270 --> 00:00:35.710
This is where it begins

00:00:37.270 --> 00:00:37.849
Hello everyone
```
