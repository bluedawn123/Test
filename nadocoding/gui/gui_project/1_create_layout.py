from tkinter import *
import tkinter.ttk as ttk

root = Tk()
#제목 설정
root.title("준호의 gui")   

#크기설정
#root.geometry("640x580")  #가로크기x세로크기

#그리드가 아닌 팩을 통한 영역 구성
#파일 프레임 => (파일추가, 선택삭제 등등)
file_frame = Frame(root)
file_frame.pack()

#파일추가 버튼
btn_add_file = Button(file_frame, padx=5, pady=5, width=12, text="파일 추가")#일부러 좀 다르게함. 차이 확인하려고
btn_add_file.pack(side="left")
#파일삭제버튼
btn_del_file = Button(file_frame, text="선택삭제")
btn_del_file.pack(side="right")

#리스트 프레임
list_frame = Frame(root)
list_frame.pack(fill="both")      #pack으로 화면에 집어넣기 + 꽉 채우기

scrollbar = Scrollbar(list_frame)
scrollbar.pack(side="right", fill="y")   #y축

list_file = Listbox(list_frame, selectmode="extended", height=15, yscrollcommand=scrollbar.set)
list_file.pack(side="left", fill="both", expand=True)   #채우기 + 확장
scrollbar.config(command=list_file.yview)

#저장 경로 프레임
path_frame = LabelFrame(root, text="저장 경로")
path_frame.pack()

txt_dest_path = Entry(path_frame)
txt_dest_path.pack(side="left", fill="x", expand=True, ipady=4)   #x로 해서 좌우로하고 확장, ipady=입력창 세로로 크게

#버튼넣기
btn_dest_path = Button(path_frame, text="찾아보기", width=10)
btn_dest_path.pack(side="right")

#옵션 프레임
frame_option = LabelFrame(root, text="옵션")
frame_option.pack()

# 1.가로 넓이 옵션
# 1-1.가로 넓이 옵션
lbl_witdh = Label(frame_option, text="가로넓이", width=8)
lbl_witdh.pack(side="left")   #왼쪽 정렬

# 1-2. 가로 넓이 콤보
opt_width = ["원본유지", "1024", "800", "640"]
cmb_width = ttk.Combobox(frame_option, state="readonly", values=opt_width, width=10)          #state값을 readonly해서 읽기 전용으로.
cmb_width.current(0)
cmb_width.pack()

# 2. 간격 옵션 
# 2-1. 간격 옵션 레이블
lbl_space = Label(frame_option, text="간격", width=8)
lbl_space.pack(side="left")   #왼쪽 정렬

# 2-2. 간격 옵션 콤보
opt_space = ["없음", "좁게", "보통", "넓게"]
cmb_space = ttk.Combobox(frame_option, state="readonly", values=opt_space, width=10)          #state값을 readonly해서 읽기 전용으로.
cmb_space.current(0)
cmb_space.pack()


# 3.파일 포맷 옵션
# 3-1. 파일 포맷 옵션 레이블
lbl_format = Label(frame_option, text="포맷", width=8)
lbl_format.pack(side="left")

# 3-2. 파일 포맷 옵션 콤보
opt_format = ["PNG", "JPG", "BMP"]
cmb_format = ttk.Combobox(frame_option, state="readonly", values=opt_format, width=10)          #state값을 readonly해서 읽기 전용으로.
cmb_format.current(0)
cmb_format.pack(side="left")


#크기변경 가능,불가능 여부
root.resizable(False, False)
root.mainloop()    #창 닫히지 않도록.