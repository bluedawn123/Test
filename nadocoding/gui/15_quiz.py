#tkinter를 이용한 메모장 프로그램 만들기
'''
[gui 조건]
1. title : 제목 없음 - windows메모장
2. 메뉴 : 파일, 편집, 서식, 보기, 도움말
3. 실제 메뉴 구현 : 파일 메뉴 내에서 열기, 저장, 끝내기 3개만 처리
3-1. 열기 : mynote.txt 파일 내용 열어서 보여주기
3-2. 저장 : mynote.txt 파일에 현재 내용 저장하기
3-3. 끝내기 : 프로그램 종료
4. 프로그램 시작 시 본문은 비어있는 상태
5. 하단 status 바는 필요 없음
6 프로그램 크기, 위치는 자유롭게 하되 크기 조정 가능해야함
7. 본문 우측에 상하 스크롤 바 넣기
'''

import os
from tkinter import *

root = Tk()
root.title("제목 없음 - windows메모장")   

#크기설정
root.geometry("640x580")  #가로크기x세로크기


#열기, 저장 파일 이름 => mynote.txt
filename = "mynote.txt"

#함수 기능 만들기
def open_file():
    if os.path.isfile(filename):   #os의 경로에 (대상파일)이 있으면 True, 없으면 False
        with open(filename, "r", encoding="utf8") as file:   #읽기니깐 r
            txt.delete("1.0", END)                   #텍스트 위젯 본문 전체 삭제
            txt.insert(END, file.read())             #txt위젯에 넣는 것

            #즉 지웠다 썼다.

def save_file():
    with open(filename, "w", encoding="utf8") as file:   #쓰기니깐 w
        file.write(txt.get("1.0", END))             #모든 내용을 가져와서 저장

#메뉴만들기
menu = Menu(root)

#첫메뉴파일
menu_file = Menu(menu, tearoff=0)
menu_file.add_command(label="열기", command=open_file)
menu_file.add_command(label="저장", command=save_file)
menu_file.add_separator()
menu_file.add_command(label="끝내기", command=root.quit)
menu.add_cascade(label="파일", menu=menu_file)


#편집 서식 보기 도움말 추가
menu.add_cascade(label="편집", menu=menu_file)
menu.add_cascade(label="서식", menu=menu_file)
menu.add_cascade(label="보기", menu=menu_file)
menu.add_cascade(label="도움말", menu=menu_file)


#스크롤바 => 같은 프레임 안에 넣으면 된다.(12참조).
#근데 여긴 위젯이 없고 text만 있으니 바로 root에 집어넣어보자(rootf를 하나의 프레임으로 인식)
scrollbar = Scrollbar(root)
scrollbar.pack(side="right", fill="y")  #이후 매핑 필요



#본문 영역(스크롤바 추가)
txt = Text(root, yscrollcommand=scrollbar.set)           #text이므로 글자가 입력이 되는 것
                                                         #매핑

txt.pack(side="left", fill="both", expand=True)   #왼쪽배치, 채우기, 확장=트루

scrollbar.config(command=txt.yview)  ##스크롤바 매핑2   
root.config(menu=menu)    #config를 통해서 menu에 우리 menu를 집어 넣어 준다.
root.mainloop()    #창 닫히지 않도록.