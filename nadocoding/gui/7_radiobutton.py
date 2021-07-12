#checkbox와는 다르게 여러가지를 (하나)선택할 수 있다.

from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

label1 = Label(root, text="메뉴를 선택하시오")
label1.pack()

burger_var = IntVar()  #int형으로 값을 저장
btn_burger1 = Radiobutton(root, text="햄버거", value=1, variable=burger_var)
btn_burger1.select()   #미리선택
btn_burger2 = Radiobutton(root, text="치즈버거", value=2, variable=burger_var)
btn_burger3 = Radiobutton(root, text="치킨버거", value=3, variable=burger_var)

btn_burger1.pack()
btn_burger2.pack()
btn_burger3.pack()


label2 = Label(root, text="음료를 선택하시오")

drink_var = StringVar()
btn_drink1 = Radiobutton(root, text="콜라", value="콜라", variable=drink_var)
btn_drink1.select()   #기본값 선택
btn_drink2 = Radiobutton(root, text="사이다", value="사이다", variable=drink_var)

btn_drink1.pack()
btn_drink2.pack()


def btncmd():
    print(burger_var.get())   #햄버거 중에서 선택된 라디오 항목 값(value). ex) 치즈버거 선택시, 3이 출력
    print(drink_var.get())    #음료 중에서 선택된 라디오 항목 값(value). ex)콜라 선택시, 콜라 출력


btn = Button(root, text="order", command=btncmd)
btn.pack()


root.mainloop()