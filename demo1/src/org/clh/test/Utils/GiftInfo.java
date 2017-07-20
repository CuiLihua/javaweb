package org.clh.test.Utils;

import java.io.Serializable;

/**
 * Created by clh on 2017/7/6.
 */
public class GiftInfo implements Serializable {
    public String fileName;
    public String fileDesc;
    public float price;
    public float num;

    public GiftInfo(String fileName, String fileDesc, float price, float num) {
        this.fileName = fileName;
        this.fileDesc = fileDesc;
        this.price = price;
        this.num = num;
    }

    public float decrease() {
        return --num;
    }
}
