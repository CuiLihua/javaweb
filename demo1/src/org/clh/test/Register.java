package org.clh.test;

import org.clh.test.Sellers.Seller;
import org.clh.test.Utils.DataOperation;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Map;
import java.util.Properties;

/**
 * Created by Mcccr on 2017/5/26.
 */
public class Register extends HttpServlet{

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //todo  用户注册
        //todo 1.解析前台发过来的数据；2.存数据：分别存在磁盘和内存中
        req.setCharacterEncoding("UTF-8");
//        System.out.println(req.getParameter("username"));
        ArrayList<String> fill = new ArrayList<>(5);
        String[] match = {"username", "phone", "passwd", "psagain","address"};
        // parse content
        // username, phone, passwd, psagain,address
        fill.add(req.getParameter("username"));
        fill.add(req.getParameter("phone"));
        fill.add(req.getParameter("passwd"));
        fill.add(req.getParameter("psagain"));
        fill.add(req.getParameter("address"));



//        String[] inputs = content.split("&");
//
//        for (int index=0; index < inputs.length; index++) {
//            String[] li = inputs[index].split("=");
//            if (li.length == 2) {
//                String former = li[0];
//                String latter = li[1];
//                if (former.equals(match[index])) {
//                    fill.add(latter);
//                } else {
//                    //应该不会出现这种情况吧？
//
//                }
//            } else {
//                //异常情况处理,value值中本身带等号的情况。
//            }
//        }

        if (!fill.get(2).equals(fill.get(3))) {

            //两次密码输入不相同返回提示信息
          resp.getWriter().write("password not the same.");
        } else {
            fill.remove(3);
            boolean isSuccess = DataOperation.getInstance().addSeller(fill.get(0), fill.get(1), fill.get(3), fill.get(2));
            // 此处应有判断是否创建成功，并跳转到相应的界面。
            if (isSuccess) {
                resp.sendRedirect("/register-success.html");
            } else {
                //返回用户名重复的提示信息
                resp.getWriter().write("User name already exists.");
            }
        }


    }

}
