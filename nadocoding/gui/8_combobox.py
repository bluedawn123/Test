import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

values = [str(i) + "일" for i in range(1, 32)]  # 1 ~ 31 까지의 숫자

#1
combobox = ttk.Combobox(root, height=5, values=values)
combobox.pack()
combobox.set("카드 결제일")  #최조 목록 제목 + 버튼 클릭을 통한 값 설정 가능

#2
read_only_combobox = ttk.Combobox(root, height=10, values=values, state="readonly")  #readonly => 입력불가. 선택만 가능.
read_only_combobox.current(0)         #0번째 인덱스 값 선택
read_only_combobox.pack()

def btncmd():
    print(combobox.get())  #12일 선택 => 12일
    print(read_only_combobox.get())  #12일 선택 => 12일


btn = Button(root, text="선택", command=btncmd)
btn.pack()


root.mainloop()