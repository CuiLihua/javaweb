package org.clh.test.Sellers;

import org.clh.test.Reward.Gift;

import java.util.HashSet;

/**
 * Created by mcccr on 2017/5/24.
 */
public class  Seller {
    public int id;
    public String name;
    public String address;
    public String phone;
    private String password;
    public HashSet<Gift> itsProvides;
    public int GiftNum = 0;

    public Seller(int id, String name, String address, String phone, String password) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public HashSet<Gift> getItsProvides() {
        return itsProvides;
    }

    public void setItsProvides(HashSet<Gift> itsProvides) {
        this.itsProvides = itsProvides;
    }

    public int getGiftNum() {
        return GiftNum;
    }

    public void setGiftNum(int giftNum) {
        GiftNum = giftNum;
    }


}
