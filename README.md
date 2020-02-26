# Telegram MUD Engine
MUD/TRPG 게임을 Telegram을 통해 할 수 있습니다.  
  
![akalibreak](https://user-images.githubusercontent.com/27724108/75397507-5fe46400-593a-11ea-887a-82bb8511e623.jpeg)

## MUD 게임이 뭐죠?
이 [영상](https://youtu.be/4vypQ23slXc)을 참고하세요.  

## 사용 법
game.json 을 수정하여 JSON 형태의 스크립트를 수정하면 MUD/TRPG 게임을 제작할 수 있습니다.  

## 스크립트 문법 예제
```json
{
  "go_to_ski": {
    "type": "selection",
    "message": "아칼리 마스크를 쓴놈이 여자화장실로 들어가고 있습니다.\n어떻게 하시겠습니까?\n남자같긴한데 증거는 없습니다.",
    "options": [
      {
        "name": "막는다",
        "to": "block"
      },
      {
        "name": "따라가서 진짜 저새끼가 화장실가나 본다",
        "to": "police"
      },
      {
        "name": "같이 따라 들어간다",
        "to": "police"
      }
    ]
  },
}
```
(c) Ryueumi, All rights reserved.

오브젝트의 키: 현재 선택의 키를 지정합니다. (중복되어서는 안됨)  
  
Type: 현재 선택의 종류를 지정합니다.  
Message: 현재 선택에서 제시해야 하는 메세지를 제시합니다.  
Options: 옵션을 적습니다.  
  
해당 소스코드에 포함되어있는 game.json 파일은 [이 영상을 바탕으로 제작되었습니다.](https://youtu.be/4vypQ23slXc?t=339)  

