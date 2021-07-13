import time
import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

frame_buger = Frame(root, relief="solid", bd=1)  #relief=테두리 bd=외곽선
frame_buger.pack()

Button(frame_buger, text="햄버거").pack()
Button(frame_buger, text="치즈버거").pack()
Button(frame_buger, text="치킨버거").pack()

root.mainloop()