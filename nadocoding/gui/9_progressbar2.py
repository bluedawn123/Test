import time
import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

p_var2 = DoubleVar()   #실수 반영을 위해서
progressbar2 = ttk.Progressbar(root, maximum=100, length=150, variable=p_var2)  #길이 수정
progressbar2.pack()

def btncmd2():
    for i in range(101):         #0 ~ 100 값 반영
        time.sleep(0.01)         #0.01 초 대기

        p_var2.set(i)            #0 ~ 100 증가 하는 걸 볼 수 있다. 매번 gui에 반영 안 하기 때문에 한번에 된다
        progressbar2.update()    #실시간 진행 확인을 위해서
        print(p_var2.get())    #진행상황 확인

btn = Button(root, text="start", command=btncmd2)
btn.pack()


root.mainloop()