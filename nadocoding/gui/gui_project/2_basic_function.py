from tkinter import *
import tkinter.ttk as ttk
from tkinter import filedialog  #서브 모듈이므로 별도의 import 필요

root = Tk()
#제목 설정
root.title("준호의 gui")   

#크기설정
#root.geometry("640x580")  #가로크기x세로크기

#그리드가 아닌 팩을 통한 영역 구성
#파일 프레임 => (파일추가, 선택삭제)---------------------------------------------------------------------------------------------
file_frame = Frame(root)
file_frame.pack(fill="x", padx=5, pady=5)    #가로로 펼쳐지게. padx, pady 를 통해 간격조정


#파일 추가 함수  => 버튼 선택 시 어디에 있는 파일을 선택할 것인지? (file dialog도 떠야한다.)
def add_file():
    files = filedialog.askopenfilenames(title="이미지 파일을 선택하세요", \
        filetypes=(("PNG파일", "*.png"), ("모든 파일", "*.*")), \
        initialdir=r"C:\Users\YOONJUNHO\Documents\Test\nadocoding\gui")  
    #"C:/" 라면, 최초에 C:/ 경로를 보여줌
    #r이라 적으면 그대로 쓰겠다라는 뜻
    #창이 닫히면 실제로 파일을 선택해서 확인버튼을 누르면 files에 그 목록이 들어가게 된다. 아래는 print로 확인
    
    #사용자가 선택한 파일 목록 (확인 가능하게)
    for file in files:
        #print("file : ", file)
        list_file.insert(END, file)  #맨뒤에 집어 넣는다, 파일을
#askopenfilenames => 사용자에게 복수개의 파일을 선택하도록
#filetypes=("PNG파일", "*.png")) => 이름은 PNG파일이고, 모든 파일명의 png로 끝나는 파일명의 목록을 보여준다. 튜플형으로 다항가능
#initialdir  => 최초 디렉토리 명시. 여기서는, 최초에 C:/ 경로를 보여준다.


#선택 삭제 함수
#★★★주의 사항 ★★★ => 앞에 있는 걸 지우면 인덱스가 밀린다. 예를들어, 0번째인덱스(첫번째)를 지우면 그 다음이 0번째로 바뀜
#그렇기 때문에 뒷번호에서 앞번호를 지우는 방식을 사용한다.
def del_file():
    #print(list_file.curselection())  
    for index in reversed(list_file.curselection()): #reversed이므로, list_file의 원래 리스트에는 영향 x. 즉 선택된 것들만 순서를 바꿈
        list_file.delete(index)                      #index위치의 리스트 파일을 삭제!



#저장 경로 (폴더) 함수
def browse_dest_path():
    folder_selected = filedialog.askdirectory()      #askopenfiles와 유사. 폴더를 열때 사용
    if folder_selected == "":                        #폴더 선택창에서 사용자가 취소를 누를 때
        return                                      
    #print(folder_selected)
    
    #실제로 선택한 것을 textbox에 넣기
    txt_dest_path.delete(0, END)           #만약 값이 있었다면 지우기. (0부터 끝까지) ★★★entry이므로 0부터 END, text였다면, 1.0부터 END
    txt_dest_path.insert(0, folder_selected)

#파일추가 버튼
btn_add_file = Button(file_frame, padx=5, pady=5, width=12, text="파일추가", command=add_file) #일부러 좀 다르게함. 차이 확인하려고
btn_add_file.pack(side="left")
#파일삭제 버튼
btn_del_file = Button(file_frame, padx=5, pady=5, width=12, text="선택삭제", command=del_file)
btn_del_file.pack(side="right")


#리스트 프레임----------------------------------------------------------------------------------------------------------
list_frame = Frame(root)
list_frame.pack(fill="both",padx=5, pady=5)      #pack으로 화면에 집어넣기 + 꽉 채우기

scrollbar = Scrollbar(list_frame)
scrollbar.pack(side="right", fill="y")   #y축

list_file = Listbox(list_frame, selectmode="extended", height=15, yscrollcommand=scrollbar.set)
list_file.pack(side="left", fill="both", expand=True)   #채우기 + 확장
scrollbar.config(command=list_file.yview)

#저장 경로 프레임-------------------------------------------------------------------------------------------------------------
path_frame = LabelFrame(root, text="저장 경로")
path_frame.pack(fill="x", padx=5, pady=5, ipady=5)   

txt_dest_path = Entry(path_frame)
txt_dest_path.pack(side="left", fill="x", expand=True, padx=5, pady=5, ipady=4)   #x로 해서 좌우로하고 확장, ipady=입력창 세로로 크게

#버튼넣기
btn_dest_path = Button(path_frame, text="찾아보기", width=10, command=browse_dest_path)
btn_dest_path.pack(side="right", padx=5, pady=5)

#옵션 프레임----------------------------------------------------------------------------------------------------------
frame_option = LabelFrame(root, text="옵션", padx=5, pady=5)
frame_option.pack(padx=5, pady=5, ipady=5)

# 1.가로 넓이 옵션
# 1-1.가로 넓이 옵션
lbl_witdh = Label(frame_option, text="가로넓이", width=8)
lbl_witdh.pack(side="left", padx=5, pady=5)   #왼쪽 정렬

# 1-2. 가로 넓이 콤보
opt_width = ["원본유지", "1024", "800", "640"]
cmb_width = ttk.Combobox(frame_option, state="readonly", values=opt_width, width=10)          #state값을 readonly해서 읽기 전용으로.
cmb_width.current(0)
cmb_width.pack(side="left", padx=5, pady=5)

# 2. 간격 옵션 
# 2-1. 간격 옵션 레이블
lbl_space = Label(frame_option, text="간격", width=8)
lbl_space.pack(side="left", padx=5, pady=5)   #왼쪽 정렬

# 2-2. 간격 옵션 콤보
opt_space = ["없음", "좁게", "보통", "넓게"]
cmb_space = ttk.Combobox(frame_option, state="readonly", values=opt_space, width=10)          #state값을 readonly해서 읽기 전용으로.
cmb_space.current(0)
cmb_space.pack(side="left", padx=5, pady=5)


# 3.파일 포맷 옵션
# 3-1. 파일 포맷 옵션 레이블
lbl_format = Label(frame_option, text="포맷", width=8)
lbl_format.pack(side="left", padx=5, pady=5)

# 3-2. 파일 포맷 옵션 콤보
opt_format = ["PNG", "JPG", "BMP"]
cmb_format = ttk.Combobox(frame_option, state="readonly", values=opt_format, width=10)          #state값을 readonly해서 읽기 전용으로.
cmb_format.current(0)
cmb_format.pack(side="left", padx=5, pady=5)

#4. 진행 상황 Progress Bar--------------------------------------------------------------------------------------------------
frame_progress = LabelFrame(root, text="진행상황", padx=5, pady=5)
frame_progress.pack(fill="x", padx=5, pady=5, ipady=5)

p_var = DoubleVar()
progress_bar = ttk.Progressbar(frame_progress, maximum=100, variable=p_var)
progress_bar.pack(fill="x", padx=5, pady=5)

#5. 실행 프레임
frame_run = Frame(root, padx=5, pady=5)
frame_run.pack(fill="x", padx=5, pady=5)

#시작 버튼
btn_start = Button(frame_run, padx=5, pady=5, text="시작", width=12)
btn_start.pack(side="left", padx=5, pady=5)

#끄기 버튼
btn_close = Button(frame_run, padx=5, pady=5, text="닫기", width=12, command=root.quit)
btn_close.pack(side="right",padx=5, pady=5)

#크기변경 가능,불가능 여부
root.resizable(False, False)
root.mainloop()    #창 닫히지 않도록.