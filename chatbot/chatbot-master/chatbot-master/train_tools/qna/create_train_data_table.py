#챗봇 데이터 학습용 테이블 생성.


import pymysql
import sys
#sys.path.insert(0, r'C:\Users\YOONJUNHO\Documents\Test\chatbot\chatbot-master\chatbot-master\config')
from DatabaseConfig import *   # DB 접속 정보 불러오기

''' => config 폴더 안에 있으니 굳이 안쳐도 된다.
DB_HOST = '127.0.0.1'
PORT =3306
DB_USER = 'root'
DB_PASSWORD = '123123'
DB_NAME = 'chatbottest'

def DatabaseConfig():
    global DB_HOST, PORT, DB_USER, DB_PASSWORD, DB_NAME
'''

db = None
try:
    db = pymysql.connect(
        host=DB_HOST,
        port=PORT,
        user=DB_USER,
        passwd=DB_PASSWORD,
        db=DB_NAME,
        charset='utf8'
    )
    print("DB 연결 성공")

    # 테이블 생성 sql 정의
    sql = '''
      CREATE TABLE IF NOT EXISTS `chatbot_train_data` (
      `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      `intent` VARCHAR(45) NULL,
      `ner` VARCHAR(1024) NULL,
      `query` TEXT NULL,
      `answer` TEXT NOT NULL,
      `answer_image` VARCHAR(2048) NULL,
      PRIMARY KEY (`id`))
    ENGINE = InnoDB DEFAULT CHARSET=utf8
    '''

    # 테이블 생성
    with db.cursor() as cursor:
        cursor.execute(sql)
    print("테이블 생성 성공")

except Exception as e:
    print(e)

finally:
    if db is not None:
        db.close()
    print("DB 닫기 성공")

