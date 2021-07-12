from tkinter import *

root = Tk()
root.title("Junho gui")
root.geometry("640x580")

#빈 텍스트 공간 생성
txt = Text(root, width=30, height=5)
txt.pack()
#1. 
txt.insert(END, "글자를 입력하세요")  #end는 위치

#2. 
e = Entry(root, width=30)  #entry는 줄바꿈이 안된다. 
e.pack()
e.insert(0, "한 줄만 입력하세요")  #0위치는 기본값.(END와 동일)

def btncmd():
    print(txt.get("1.0", END))  #Text가져오기. txt에 있는 것 가져오기. 1.0 => 1은 라인1부터, 0은 컬럼0부터 가져와라. 끝(END)까지
    print(e.get())              #Entry가져오기. 간단하게 e.get()

    #글자를 출력하고 기존에 있던 것 삭제
    txt.delete("1.0", END)
    e.delete(0, END)       #o부터 끝까지

btn = Button(root, text="클릭", command=btncmd)
btn.pack()




root.mainloop()