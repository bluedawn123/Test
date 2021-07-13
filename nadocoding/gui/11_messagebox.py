import tkinter


import tkinter.messagebox as msgbox
import time
import tkinter.ttk as ttk
from tkinter import *

root = Tk()
root.title("Junho GUI")
root.geometry("640x580")

#기차 얘매 시스템이라고 가정.
def info():
    msgbox.showinfo("알림",  "정상적으로 예매 완료.")

def warn():
    msgbox.showwarning("경고", "해당 좌석은 매진되었습니다.")

def error():
    msgbox.showerror("에러", "결제 오류가 발생하였습니다.")

def okcancel():
    msgbox.askokcancel("확인 / 취소", "해당 좌석은 유아 동반석입니다.")

def retrycancel():
    response = msgbox.askretrycancel("재시도 / 취소", "일시적인 오류입니다. 다시 시도하겠습니까?")
    print("응답 : ", response)   #True, False, None => 예1 아니오0, 그 외 
    if response ==  1:  #재시도
        print("재시도")

    elif response == 0:  #취소
        print("취소")
    

def yesno():
    msgbox.askyesno("재시도 /  취소", "해당좌석은 역방향입니다. 예매 하시겠습니가?")

def yesnocancel():
    response = msgbox.askyesnocancel(title="주의", message="예매 내역이 저장되지 않았습니다. \n 프로그램을 종료하시겠습니까?")
    #아래서 실행해보면 알 수 있듯이 response는 총 True, False, None 값을 지닌다.

    #네 : 저장 후 종료
    #아니요오 : 저장 하지 않고 종료
    #취소 : 프로그램 종료 취소 ( 현대 화면에서 계속 작업 )
    print("응답 : ", response)   #True, False, None => 예1 아니오0, 그 외 
    if response ==  1:   #네, ok
        print("예")

    elif response == 0:  #아니오, no
        print("아니오")
    
    else:                #그 외
        print("취소")


Button(root, command=info, text="Alarm").pack()
Button(root, command=warn, text="Warn").pack()
Button(root, command=error, text="Error").pack()
Button(root, command=okcancel, text="확인 취소").pack()
Button(root, command=retrycancel, text="재시도 취소").pack()
Button(root, command=yesno, text="예 아니오").pack()
Button(root, command=yesnocancel, text="예 아니요오 취소").pack()   #3개의 경우

root.mainloop()