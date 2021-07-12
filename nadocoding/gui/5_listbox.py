from tkinter import *

root = Tk()
root.title("Junho gui")
root.geometry("640x580")

listbox = Listbox(root, selectmode="extended", height=0)    #selecmode = 선택옵션(다중선택, 하나선택), height => 높이에 따라 선택수
listbox.insert(0, "사과")     #위치, 대상
listbox.insert(1, "딸기")     #위치, 대상
listbox.insert(2, "바나나")   #위치, 대상
listbox.insert(END, "수박")     #위치, 대상 END는 그냥 맨 뒤에 값을 넣어준다
listbox.insert(END, "포도")     #위치, 대상
listbox.pack()

def btncmd():
    #listbox.delete(END)  #맨 뒤에서 삭제
    
    #print("리스트에는", listbox.size(), "개 존재")
    
    #항목 확인 (시작 idx, 끝 idx)
    #print("1번째부터 3번째 항목 : ", listbox.get(0, 2))

    #선택 항목 확인
    print("선택된 항목 : ", listbox.curselection())  #=> 인덱스 값으로 출력된다.


btn = Button(root, text="클릭", command=btncmd)
btn.pack()




root.mainloop()