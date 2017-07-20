package org.clh.test.Users;

import java.util.HashSet;

/**
 * Created by mcccr on 2017/5/24.
 */
public final class PlayerList {
    public static HashSet<Player> players;
    public static HashSet<Integer> playeridset;

    public static HashSet<Player> getPlayers() {
        return players;
    }

    public static HashSet<Integer> getPlayeridset() {
        return playeridset;
    }

    public static void addUser(Player a) {
        if (!playeridset.contains(a.id)) {
            playeridset.add(a.id);
            players.add(a);
        }
    }
}
