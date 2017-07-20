package org.clh.test;

import org.clh.test.Utils.GiftInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yby on 2017/5/24.
 */
public class RewardInfo extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        int type = Integer.parseInt(req.getParameter("type"));
        if (type==1) {
            // map --> array
            Object[] names = SubmitGift.giftDesc.keySet().toArray();
            // 随机取三个
            if (names.length>=3) {
                int num1 = (int)Math.floor(Math.random()*names.length);
                int num2;
                int num3=(int)Math.floor(Math.random()*names.length);
                while ( (num2=(int)Math.floor(Math.random()*names.length)) == num1){}
                while ( num3 == num1 || num3 == num2){
                    num3=(int)Math.floor(Math.random()*names.length);
                }
                String desc1 = SubmitGift.giftDesc.get(names[num1]).fileDesc;
                String desc2 = SubmitGift.giftDesc.get(names[num2]).fileDesc;
                String desc3 = SubmitGift.giftDesc.get(names[num3]).fileDesc;

                resp.setContentType("text/plain; charset=utf-8");
                resp.getWriter().write(names[num1]+"="+desc1
                                        +"#"+names[num2]+"="+desc2
                                        +"#"+names[num3]+"="+desc3);

            }else {
                // 数量不足3，就全部上报。
                resp.setContentType("text/plain; charset=utf-8");
                StringBuilder builder = new StringBuilder("");
                for (Map.Entry<String, GiftInfo> entry : SubmitGift.giftDesc.entrySet()) {
                    builder.append(entry.getKey())
                            .append("=")
                            .append(entry.getValue().fileDesc)
                            .append("#");
                }
                resp.getWriter().write(builder.toString());
            }

        } else if (type == 2){
            String rtnFile = req.getParameter("fileName");
            resp.setContentType("image/jpeg");
            InputStream in = new FileInputStream(SubmitGift.filePath + "\\" + rtnFile);
            int len = 0;
            byte[] buffer = new byte[1024];

            OutputStream out = resp.getOutputStream();
            while ((len = in.read(buffer)) > 0) {
                out.write(buffer, 0, len);
            }
            out.close();

        }

    }


    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        PrintWriter writer = resp.getWriter();
//        String rtn = "{'first':'Macbook', 'second':'iphone 6s'}";
//        writer.write(rtn);
//        writer.flush();



    }
}
