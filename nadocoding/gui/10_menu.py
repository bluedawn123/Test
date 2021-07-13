import time
import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

def create_new_file():
    print("새 파일을 만듭니다.")

menu = Menu(root)  #root에 집어 넣겠다.

#file메뉴 만들기
menu_file = Menu(menu, tearoff=0)
menu_file.add_command(label="New file", command=create_new_file)
menu_file.add_command(label="New window")
menu_file.add_separator()  #구분자
menu_file.add_command(label="Open file...")
menu_file.add_separator()  #구분자
menu_file.add_command(label="Save all", state="disable")   #비활성화 
menu_file.add_separator()  #구분자
menu_file.add_command(label="Quit", command=root.quit)   #비활성화 

menu.add_cascade(label="File", menu=menu_file)  #(위에서 만든)메뉴파일 정보를 넣고, 그 이름이 file로 저장된다.

#edit 메뉴 만들기
menu.add_cascade(label="Edit", menu=menu_file)  

#language 메뉴 추가 (radio 버튼을 통해서 택1)
menu_lang = Menu(menu, tearoff=0)
menu_lang.add_radiobutton(label="python")
menu_lang.add_radiobutton(label="c++")
menu_lang.add_radiobutton(label="java")
menu_lang.add_radiobutton(label="dfsf")
menu.add_cascade(label="language", menu=menu_lang)

#View 메뉴 추가(체크 가능)
menu_view = Menu(menu, tearoff=0)
menu_view.add_checkbutton(label="Show Minimap")
menu.add_cascade(label="View", menu=menu_view)

root.config(menu=menu)
root.mainloop()