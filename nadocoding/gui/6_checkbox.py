from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

chkvar = IntVar()   #chkvar에 int 형으로 값을 저장한다. 
chkbox = Checkbutton(root, text="오늘 하루 보지 않기", variable=chkvar)
#chkbox.select() #자동선택
#chkbox.deselect()  #선택해제
chkbox.pack()

chkvar2 = IntVar()
chkbox2 = Checkbutton(root, text="일주일 동안 보지 않기", variable=chkvar2)  #달라야 한다.
chkbox2.pack()

def btncmd():
    print(chkvar.get())    #확인해보기 => 0:체크해제, 1:체크
    print(chkvar2.get())    #확인해보기 => 0:체크해제, 1:체크

btn = Button(root, text="클릭", command=btncmd)
btn.pack()


root.mainloop()