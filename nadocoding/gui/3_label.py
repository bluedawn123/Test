from tkinter import *

root = Tk()
root.title("Junho gui")

label1 = Label(root, text="hihihihihihihi")
label1.pack()

photo = PhotoImage(file="nadocoding/gui/img.png")
label2 = Label(root, image=photo)
label2.pack()

def change():
    label1.config(text="또 ㅇㅇㅇ만나용")   #config => label 변경시

    global photo2 #전역변수 설정해줘서 삭제해주지 않게.
    photo2 = PhotoImage(file="nadocoding/gui/img2.png")
    label2.config(image=photo2)

btn = Button(root, text="클릭", command=change)  #command는 change라는 함수로 정의
btn.pack()


root.mainloop()