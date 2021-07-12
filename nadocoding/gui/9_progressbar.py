import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

progressbar = ttk.Progressbar(root, maximum=100, mode="indeterminate")
progressbar.start(5)  #
progressbar.pack()


def btncmd():
    pass

btn = Button(root, text="선택", command=btncmd)
btn.pack()


root.mainloop()