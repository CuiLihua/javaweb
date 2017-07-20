package org.clh.test.Utils;

import org.clh.test.Login;
import org.clh.test.Reward.Gift;
import org.clh.test.RewardInfo;
import org.clh.test.Sellers.Seller;
import org.clh.test.SubmitGift;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by mcccr on 2017/5/24.
 */
public class LuckyDraw extends HttpServlet {

    private String prizeList = "prizeList.data";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String type = req.getParameter("type");
        if (type!= null) {
            // 随机选取一个奖品
            double random = Math.random();
            List<String> array;
            // 在以下的if条件判断中，给array赋值。
            if (random < 0.05) {
                // 表明抽取价格大于500块的奖品
                array = selectGiftsByPrice(500, Float.MAX_VALUE);
            } else if (random < 0.3) {
                // 表明抽取价格不大于500块，并且大于100块的奖品
                array = selectGiftsByPrice(100, 500);
            } else {
                // 表明抽取价格不大于100块的奖品
                array = selectGiftsByPrice(0, 100);
            }


            // 抽奖
            if (array.isEmpty()) {
                resp.getWriter().write("444");
            } else {
                int index = (int) Math.floor(Math.random() * array.size());
                String desc = SubmitGift.giftDesc.get(array.get(index)).fileDesc;
                //抽中奖之后，先删除抽中的奖品
                deleteOne(array.get(index));

                // 存储中的奖品描述和奖品文件名称
                Cookie fileNameCookie = new Cookie("fileName", array.get(index));
                Cookie fileDescCookie = new Cookie("fileDesc", desc);
                fileNameCookie.setMaxAge(10*60);
                fileDescCookie.setMaxAge(10*60);
                resp.addCookie(fileNameCookie);
                resp.addCookie(fileDescCookie);

                //传商家名称和奖品描述
                if (type.equals("text")) {
                    resp.setHeader("Content-Type","text/html; charset=utf-8");
                    GiftInfo info = SubmitGift.giftDesc.get(array.get(index));
                    Seller seller = DataOperation.getInstance().getSeller(info.fileName.split("_")[0]);
                    resp.getWriter().write( desc + "_" + seller.getName() + "_" +
                                            seller.getAddress() +"_" +
                                            seller.getPhone());
                }
            }
        } else {

            //传图片
            String rtnFile = retrieveFileName(req.getParameter("text"));
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


    private String retrieveFileName(String desc) {
        for (GiftInfo info : SubmitGift.giftDesc.values()) {
            if (info.fileDesc.equals(desc)) {
                return info.fileName;
            }
        }
        return null;

//        for (Map.Entry<String, GiftInfo> entry : SubmitGift.giftDesc.entrySet()) {
//            if (entry.getValue().fileDesc.equals(desc)) {
//                return entry.getKey();
//            }
//        }
    }


    private void deleteOne(String fileName) {
        if (SubmitGift.giftDesc.get(fileName).decrease() == 0) {
            // 删除图片文件
            SubmitGift.giftDesc.remove(fileName);
            File file = new File(SubmitGift.filePath + "\\" + fileName);
            if (file.exists()) {
                file.delete();
            }
        }

        try {
            ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(SubmitGift.descPath));
            outputStream.writeObject(SubmitGift.giftDesc);
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }



    /**
     * 左开右闭
     * @param floor
     * @param top
     * @return
     */
    private List<String> selectGiftsByPrice(float floor, float top) {
        List<String> rtn = new ArrayList<>();
        for (GiftInfo info : SubmitGift.giftDesc.values()) {
            if (info.price > floor && info.price <= top) {
                rtn.add(info.fileName);
            }
        }
        return rtn;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String phone = req.getParameter("number");
        if (phone == null) {
            // TODO
        } else {
            String fileName=null, fileDesc=null;
            for (Cookie cookie : req.getCookies()) {
                if (cookie.getName().equals("fileName")) {
                    fileName = cookie.getValue();
                } else if (cookie.getName().equals("fileDesc")) {
                    fileDesc = cookie.getValue();
                }
            }
            if (fileName==null || fileDesc== null) {
                // 异常
                resp.getWriter().write("Exception!");
            } else {
                StringBuilder builder = new StringBuilder(""); //?
                builder.append(fileDesc)
                        .append("\t")
                        .append(fileName)
                        .append("\t")
                        .append(phone)
                        .append("\n");

                File file = new File(SubmitGift.filePath + "\\" + prizeList);
                if (!file.exists()) {
                    file.createNewFile();
                }
                FileOutputStream outputStream = new FileOutputStream(file, true);
                outputStream.write(builder.toString().getBytes());
                outputStream.flush();
                outputStream.close();
            }
        }
    }
}



