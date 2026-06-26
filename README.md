# Bilibili Subtitles Converter
Parses JSON subtitles used on bilibili.com and converts it to SRT format.

### JSON example:
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

0:00:34.270,0:00:35.710
This is where it begins

0:00:37.270,0:00:37.849
Hello everyone
```
