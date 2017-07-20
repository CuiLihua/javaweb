package org.clh.test.Users;

import org.clh.test.Reward.Gift;

import java.util.List;

/**
 * Created by mcccr on 2017/5/24.
 */
public class Player {
    public int id;
    public String name;
    public List<Gift> getGiftAlready;

    public Player(int id, String name, List<Gift> getGiftAlready) {
        this.id = id;
        this.name = name;
        this.getGiftAlready = getGiftAlready;
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

    public List<Gift> getGetGiftAlready() {
        return getGiftAlready;
    }

    public void setGetGiftAlready(List<Gift> getGiftAlready) {
        this.getGiftAlready = getGiftAlready;
    }
}
