import time
import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

#메뉴 위 레이블 만들기
Label(root, text="메뉴를 선택해주세요").pack(side="top")

Button(root, text="주문하기").pack(side="bottom")

#메뉴 프레임
frame_buger = Frame(root, relief="solid", bd=1)  #relief=테두리 bd=외곽선
frame_buger.pack(side="left")                    #side=위치

Button(frame_buger, text="햄버거").pack()
Button(frame_buger, text="치즈버거").pack()
Button(frame_buger, text="치킨버거").pack()

#음료 프레임
frame_drink = LabelFrame(root, text="음료")
frame_drink.pack(side="right", fill="both", expand=True)       #side=위치, fill=채우기, expand=길게 퍼지게

Button(frame_drink, text="콜라").pack()
Button(frame_drink, text="사이다").pack()

root.mainloop()