from tkinter import *

root = Tk()
#제목 설정
root.title("준호의 gui")   

#크기설정
root.geometry("640x580")  #가로크기x세로크기

#크기변경 가능,불가능 여부
#root.resizable(False, False)

btn1 = Button(root, text="버튼1")
btn1.pack()  #실제로 보이게

btn2 = Button(root, padx=5, pady=10, text="버튼2")
btn2.pack()

btn3 = Button(root, padx=10, pady=5, text="버튼2")
btn3.pack()

btn4 = Button(root, width=10, height=5, text="버튼4")
btn4.pack()

btn5 = Button(root, fg="red", bg="yellow", width=10, height=5, text="버튼5")
btn5.pack()

photo = PhotoImage(file="nadocoding/gui/img.png")   #파일에 해당하는 것을 불러와서 이미지로 저장 file에는 경로 설정
btn6 = Button(root, image=photo)      #button에는 텍스트가 아닌, photo가 들어간다.
btn6.pack()

def btncmd():
    print("버튼이 클릭되었어요.")
btn7 = Button(root, text="동작하는 버튼", command=btncmd)      #button에는 텍스트가 아닌, photo가 들어간다.
btn7.pack()


root.mainloop()    #창 닫히지 않도록.