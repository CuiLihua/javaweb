package org.clh.test;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by clh on 2017/5/22.
 */
public class Hello extends HttpServlet {
/*    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.write("<h1>Hello!</h1>");
    }*/

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        StackTraceElement[] tst = Thread.currentThread().getStackTrace();
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();
        String name = req.getParameter("USERNAME");
        //todo 这里返回ADD函数求得的值

        out.println("Your Name : " + name);
        tst[0].toString();
    }
}
