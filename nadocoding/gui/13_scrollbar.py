import time
import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

#위젯과 스크롤바를 하나에 넣는게 낫다.

frame = Frame(root)
frame.pack()

scrollbar = Scrollbar(frame)
scrollbar.pack(side="right", fill="y")    #y축 설정

#리스트박스 생성. set이 없으면 스크롤을 내려도 다시 올라온다. 
listbox = Listbox(frame, selectmode="extended", height=8, yscrollcommand=scrollbar.set)  #스크롤바 매핑1
for i in range(32):  #1~31
    listbox.insert(END, str(i) + "일")

listbox.pack(side="left")

scrollbar.config(command=listbox.yview)  ##스크롤바 매핑2                    #서로를 매핑 해줘야 한다. 

#

root.mainloop()