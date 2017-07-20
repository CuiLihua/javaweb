package org.clh.test;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.servlet.*;
import org.apache.commons.fileupload.disk.*;
import org.clh.test.Utils.GiftInfo;

import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Mcccr on 2017/5/27.
 */
public class SubmitGift extends HttpServlet {
    // key - fileName, value - description
    public static final HashMap<String,GiftInfo> giftDesc = initGifts();

    public static final String filePath="D:\\gifts";    // 文件存放目录
    private final String tempPath="D:\\temp";    // 临时文件目录
    public static final String descPath=filePath + "\\desc.data"; // 奖品描述文件路径

    /**
     *
     * @return
     */
    private static HashMap<String, GiftInfo> initGifts() {
        try {
            File file = new File(descPath);
            if (!file.exists()) {
                file.createNewFile();
                return new HashMap<>();
            }
            ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(descPath));
            HashMap<String, GiftInfo> rtn = (HashMap<String, GiftInfo>)inputStream.readObject();
            inputStream.close();
            return rtn;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // added by boer
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/plain;charset=utf-8");
        try{
            // 取名为user的cookie
            String name = req.getCookies()[0].getValue();

            DiskFileItemFactory diskFactory = new DiskFileItemFactory();
            // threshold 极限、临界值，即硬盘缓存 1M
            diskFactory.setSizeThreshold(4 * 1024);
            // repository 贮藏室，即临时文件目录
            checkDir(tempPath);
            diskFactory.setRepository(new File(tempPath));

            ServletFileUpload upload = new ServletFileUpload(diskFactory);
            // 设置允许上传的最大文件大小 4M
            upload.setSizeMax(4 * 1024 * 1024);
            // 解析HTTP请求消息头
            List fileItems = upload.parseRequest(req);
            Iterator iter = fileItems.iterator();

            String fileName=null, fileDesc=null;
            float price=0,num=0;

            while(iter.hasNext())
            {
                FileItem item = (FileItem)iter.next();
                if(item.isFormField())
                {
                    System.out.println("处理表单内容 ...");
                    switch (item.getFieldName()) {
                        case "desc":
                            fileDesc = item.getString("UTF-8");
                            break;
                        case "price":
                            price = Float.parseFloat(item.getString());
                            break;
                        case "number":
                            num = Float.parseFloat(item.getString());
                            break;
                        default:
                            // do nothing
                            break;
                    }
                }else{
                    System.out.println("处理上传的文件 ...");
                    fileName = processUploadFile(item, name);
                }
            }// end while()

            // 存储文件与描述的对应关系
            GiftInfo giftInfo = new GiftInfo(fileName,fileDesc,price,num);

            if (fileName != null) {
                if (giftDesc.containsKey(fileName)) {
                    giftInfo.num = giftInfo.num + giftDesc.get(fileName).num;
                }
                giftDesc.put(fileName, giftInfo);
                ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(descPath));
                outputStream.writeObject(giftDesc);
                outputStream.flush();
                outputStream.close();
            }

        }catch(Exception e){
            System.out.println("使用 fileupload 包时发生异常 ...");
            e.printStackTrace();
        }// end try ... catch ...

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
//
//        PrintWriter writer = resp.getWriter();
//        String rtn = "OK";
//        writer.write(rtn);
//        writer.flush();
        resp.sendRedirect("/success.html");
    }

    // 处理表单内容
    private String processFormField(FileItem item)
            throws Exception
    {
        String name = item.getFieldName();
        if (name.equals("desc")) {
            String value = item.getString();
            return value;
        }
        return null;
    }

    // 处理上传的文件
    private String processUploadFile(FileItem item, String name)
            throws Exception
    {
        // 此时的文件名包含了完整的路径，得注意加工一下
        String filename = item.getName();
        System.out.println("完整的文件名：" + filename);
        int index = filename.lastIndexOf("\\");
        filename = filename.substring(index + 1, filename.length());

        long fileSize = item.getSize();

        if("".equals(filename) && fileSize == 0)
        {
            System.out.println("文件名为空 ...");
            return null;
        }
        checkDir(filePath);
        File uploadFile = new File(filePath + "/" + name + "_" + filename);
        item.write(uploadFile);
        return name + "_" + filename;
    }


    private void checkDir(String dir) {
        File tmpFile = new File(dir);
        if (!tmpFile.exists() || !tmpFile.isDirectory()) {
            tmpFile.mkdirs();
        }
    }
}
