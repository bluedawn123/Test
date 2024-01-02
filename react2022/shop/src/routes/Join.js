import React from 'react';
import { createContext, useState} from "react";
import '../css/reset.css';
import '../css/join.css';

function Login(){

  const [name, setName] = useState()

  return( 
      <body>
      <h1><a href></a></h1>
      <main>
        <form action="#" id="loginfrm">
          <fieldset>
            <p>MEMBER Join</p>
            <ul>
              <p>Your ID</p>
              <li>
                <span class="id_bg"></span>
                <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='아이디(영문소문자/숫자,6-16자)'/></span>
              </li>
              <li class="error id_error">아이디(이메일)는 공란이면 안됩니다.</li>

              <p>Your Password</p>
              <li>
                <span class="pw_bg"></span>
                <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='비밀번호(영문 대소문자/숫자/특수문자 중 2가지 이상 조합)'/></span>
                <span class="pw_show_hide"></span>
              </li>
              <li class="error pw_error">비밀번호를 입력해주세요</li>
              <li>
                <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='비밀번호를 한번 더 입력해주세요'/></span>
                <span class="pw_show_hide"></span>
              </li>
              <li class="error pw_error">비밀번호를 입력 안 할수는 없습니다.</li>
              
              <p>Your Name</p>
              <li>
                <span class="pw_bg"></span>
                <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='이름을 입력해주세요'/></span>
                <span class="pw_show_hide"></span>
              </li>

              <p>Your Phone_Number</p>
              <li>
                <span class="pw_bg"></span>
                <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='휴대번호를 입력해주세요'/></span>
                <span class="pw_show_hide"></span>
              </li>

              <p>Your E-Mail</p>
              <li>
                <span class="pw_bg"></span>
                <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='비밀번호를 입력해주세요'/></span>
                <span class="pw_show_hide"></span>
              </li>
              <li class="error pw_error">비밀번호를 입력해주세요</li>
            </ul>

          </fieldset>
        </form>
  
        <a href="#" class="join_link">회원가입 완료</a>

  
      </main>

    </body>


  )
}

export default Login;