import time
import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

btn1 = Button(root, text="버튼1")
btn2 = Button(root, text="버튼2")

#btn1.pack()
#btn2.pack()

#btn1.pack(side="left")
#btn2.pack(side="right")

btn1.grid(row=0, column=0)    #0, 0
btn2.grid(row=1, column=1)    #0, 0


root.mainloop()