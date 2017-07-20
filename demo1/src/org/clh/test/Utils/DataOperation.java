package org.clh.test.Utils;

import org.clh.test.Sellers.Seller;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Properties;

/**
 * @author clh
 * 以Properties存储客户信息，其属性依次为：username, phone, password,address
 */
public final class DataOperation {
    private final Properties database = new Properties();
    private final String fileName = "D://seller.data";
    private String SELLERNUM = "seller_num";
    private int sellerNum=0;
    // key-name, value-seller
    private HashMap<String, Seller> sellerMap;

    private static DataOperation ourInstance = new DataOperation();

    public static DataOperation getInstance() {
        return ourInstance;
    }

    //containskey方法返回布尔值
    public boolean contains(String name) {
        return sellerMap.containsKey(name);
    }

    public String getPassword(String name) {
        return sellerMap.get(name).getPassword();
    }

    private DataOperation() {
        try {
            File file = new File(fileName);
            if (!file.exists() || !file.isFile()) {
                file.createNewFile();
                sellerNum = 0;
                // load方法用于Properties实例加载具体的输入输出
                database.load(new FileReader(fileName));
                //database.setProperty(SELLERNUM, Integer.toString(0));
            } else {
                database.load(new FileReader(fileName));
                sellerNum = Integer.parseInt(database.getProperty(SELLERNUM));
            }
            sellerMap = parseSellers(sellerNum);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取商家对象
     * @param sellerName
     * @return
     */
    public Seller getSeller(String sellerName) {
        return sellerMap.get(sellerName);
    }

    /**
     * 把一个seller加进数据中
     * @return 是否增加成功，失败的主要原因是seller的name重复
     */
    public boolean addSeller(String name, String phone, String address, String password) throws IOException {
        if (sellerMap.containsKey(name)) {
            return false;
        } else {
            sellerNum++;
            String header = "seller_" + sellerNum + ".";
            database.setProperty(SELLERNUM, Integer.toString(sellerNum));
            database.setProperty(header+"name", name);
            database.setProperty(header+"address", address);
            database.setProperty(header+"phone", phone);
            database.setProperty(header+"password", password);

            FileWriter writer = new FileWriter(fileName);
            database.store(writer,"add user "+name);
            writer.flush();
            writer.close();

            sellerMap.put(name, new Seller(sellerNum, name, address, phone, password));

            return true;
        }
    }


    /**
     * 解析存储在properties文件里面的sellers，并将其转化为对象
     * @param num sellers的数目
     * @return sellers
     */
    private HashMap<String, Seller> parseSellers(int num) {
        if (num > 0) {
            HashMap<String, Seller> rtn = new HashMap<>(num);
            for (int i = 1; i <= num; i++) {
                String header = "seller_" + i + ".";
                String name = database.getProperty(header + "name");
                String address = database.getProperty(header + "address");
                String phone = database.getProperty(header + "phone");
                String password = database.getProperty(header + "password");
                // 解析gift的功能暂时没写
                rtn.put(name, new Seller(i, name, address, phone, password));
            }
            return rtn;
        } else {
            return new HashMap<>();
        }
    }
}
