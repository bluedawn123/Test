class Unit:
    def __init__(self, name, hp, speed):  #self는 뺴고 동일하게 해야한다.
        self.name = name
        self.hp = hp
        self.speed =  speed
        print("{0} 유닛이 생성되었습니다.".format(name))

    def move(self, location):
        print("[지상 유닛 이동]")
        print("{0} : {1} 방향으로 이동합니다. [속도{2}]".format(self.name, location, self.speed))

    def damaged(self, damage):
        print("{0} : {1} 데이미를 입었습니다.".format(self.name, damage))
        self.hp = self.hp - damage
        print("{0} : 현재 체력은 {1}입니다.".format(self.name, self.hp))

        if self.hp <= 0:
            print("{0} : 파괴되었습니다.".format(self.name))

#★★아래 unit을 상속한 AttackUnit에서도 speed를 추가해 줘야한다. 
class AttackUnit(Unit):                           #상속받고 싶은 Class. Unit을 상속받아 만들어 준다. 
    def __init__(self, name, hp, speed, damage):  #self는 뺴고 동일하게 해야한다.
        Unit.__init__(self, name, hp, speed)      #self.hp = hp, self.damage = damage 대신 이걸 써준다.
        self.damage =damage

    def attack(self, location):
        print("{0} : {1} 방향으로 적군을 공격한다. [공격력은 {2}]".format(self.name, location, self.damage))


#마린 클래스
class Marine(AttackUnit):  
    def __init__(self):
         AttackUnit.__init__(self, "마린", 40, 1, 5)
        
    #스팀팩 추가
    def stimpack(self):
        if self.hp > 10:
            self.hp = self.hp - 10
            print("{0} : 스팀팩을 사용합니다. (hp 10감소)".format(self.name))
        
        else:
            print("{0} : 체력이 부족하여 스팀팩을 사용할 수 없다.".format(self.name))

#탱크 클래스
class Tank(AttackUnit):
    #시즈모드. 이동불가  
    seize_developed = False

    def __init__(self):
        AttackUnit.__init__(self, "탱크", 150, 1, 35)
        self.seize_mode = False
    
    def set_seize_mode(self):
        if Tank.seize_developed == False : #모드 개발 안된 상태
            return
        
        #시즈모드 일 때
        if self.seize_mode == False:
            print("{0} : 시즈모드로 전환한다.".format(self.name))

            self.damage *= 2
            self.seize_mode = True

        #시즈모드 아닐때
        else:
            print("{0} : 시즈모드로 해제한다.".format(self.name))

            self.damage /= 2
            self.seize_mode = False 
        


#공중유닛 클래스
class Flyable:
    def __init__(self, flying_speed):
        self.flying_speed = flying_speed

    def fly(self, name, location):
        print("{0} : {1} 방향으로 날아갑니다. [속도 {2}]".format(name, location, self.flying_speed))
        
#공중 공격 유닛 클래스  => 그냥...공격 + 공중의 특징을 상속 받는다.

class FlyableAttackUnit(AttackUnit, Flyable): #AttackUnit, Flyable 상속
    def __init__(self, name, hp, damage, flying_speed):
        AttackUnit.__init__(self, name, hp, damage, 0)  #★★아래 unit을 상속한 AttackUnit에서도 speed를 추가해 줘야한다. 지상 속도를 0으로 하는 것.
        Flyable.__init__(self, flying_speed)

    #★★연산자 오버로딩 
    #즉, Unit의 move를 상속하는 것이 아니라 FlyableAttackUnit에서 move함수를 새롭게 정의한다.
    def move(self, location):
        print("[공중 유닛 이동]")
        self.fly(self.name, location)

#레이스 클래스
class Wraith(FlyableAttackUnit):
    def __init__(self):
        FlyableAttackUnit.__init__(self, "레이스", 80, 20, 5)
        self.clocked = False
    
    def clocking(self):
        if self.clocked == True:
            print("{0} : 클로킹 모드를 해제한다.".format(self.name))
            self.clocked = False
        else :
            print("{0} : 클로킹 모드를 설정한다.".format(self.name))
            self.clocked = True

def game_start():
    print("[알림] 게임시작")

def game_over():
    print("player : gg")
    print("[plyaer] 님이 게임에서 퇴장하셨습니다.")


#실제 게임 진행
game_start()

m1 = Marine()
m2 = Marine()
m3 = Marine()

t1 = Tank()
t2 = Tank()

w1 = Wraith()