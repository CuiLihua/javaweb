package org.clh.test;

import org.clh.test.Utils.DataOperation;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

/**
 * Created by Mcccr on 2017/5/26.
 */
public class Login extends HttpServlet {

    private final int COOKIE_EXPIRE = 10*60;

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //todo  用户登陆，先要解析前边发过来的数据，然后检测是否已经有该用户，核对密码是否正确
        req.setCharacterEncoding("UTF-8");
//        BufferedReader reader = new BufferedReader(req.getReader());
//        String content = "";
//        String line = null;
//        while((line = reader.readLine()) != null) {
//            content += line;
//        }
//        String[] np = content.split("&");
        String name = req.getParameter("name");
        String password = req.getParameter("passwd");

        if (name.equals("") || password.equals("")) {
            resp.getWriter().write("Please enter the information.");
        } else if (DataOperation.getInstance().contains(name)
                && DataOperation.getInstance().getPassword(name).equals(password)) {
            // 用户存在且密码正确，说明登录成功{

                // 写入cookie，记录session
                Cookie cookie = new Cookie("user", name);
                //设置cookie的生存期 10分钟
                cookie.setMaxAge(COOKIE_EXPIRE);
                resp.addCookie(cookie);

                resp.sendRedirect("/submit-gift.html");
                // TODO Cookie and Session management
            } else {
                // 登录失败返回信息
                resp.getWriter().write("No such user or password is incorrect.");
            }


//        System.out.print(req.getReader().toString());
//        BufferedReader reader =  req.getReader();
//        StringBuilder builder = new StringBuilder(reader.readLine());
//        for (;;) {
//            String str = reader.readLine();
//            if (str == null) {
//                break;
//            } else {
//                builder.append(str);
//            }
//        }
//        String content = builder.toString();
//        System.out.println(content);

//        PrintWriter writer = resp.getWriter();
//        String rtn = "1";
//        writer.write(rtn);
//        writer.flush();
//        resp.sendRedirect("/submit-gift.html");

    }
}
