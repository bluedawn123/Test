import React from 'react';
import { createContext, useState} from "react";
import '../css/reset.css';
import '../css/Login.css';

function Login(){

    const [name, setName] = useState()

    return( 
        <body>
        <h1><a href></a></h1>
        <main>
          <form action="#" id="loginfrm">
            <fieldset>
              <p>MEMBER LogIn</p>
              <ul>

                <li>
                  <span class="id_bg"></span>
                  <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='아이디를 입력해주세요'/></span>
                </li>
                <li class="error id_error">아이디(이메일)을 입력해주세요</li>

                <li>
                  <span class="pw_bg"></span>
                  <span><input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='비밀번호를 입력해주세요'/></span>
                  <span class="pw_show_hide"></span>
                </li>
                <li class="error pw_error">비밀번호를 입력해주세요</li>
              </ul>
    
              <div class="btm">
                <p>
                  <label>
                    
                  </label>
                </p>
                <a href="#" class="idpw_search">아이디(이메일)/비밀번호 찾기</a>
              </div>
              <button type="submit" id="login_btn">로그인</button>
            </fieldset>
          </form>
    
          <a href="/join" class="join_link">회원가입</a>

    
        </main>

      </body>


    )
}

export default Login;