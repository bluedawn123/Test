import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

progressbar = ttk.Progressbar(root, maximum=100, mode="indeterminate")  #in~~~ => 결정되지 않음.  determinate => 차는 것
progressbar.start(5)  #움직이는 속도
progressbar.pack()


def btncmd():
    progressbar.stop()

btn = Button(root, text="STOP", command=btncmd)
btn.pack()


root.mainloop()