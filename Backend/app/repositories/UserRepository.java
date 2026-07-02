package repositories;

import models.User;

import javax.inject.Singleton;

@Singleton
public class UserRepository {

    public User findByEmail(String email) {

        return User.find.where().eq("email", email).findUnique();
    }

    public User findById(Long id) {

        return User.find.byId(id);
    }

    public void save(User user) {

        user.save();
    }

    public void update(User user) {
        user.update();

    }

    public User findRefreshToken(String refreshToken) {
        return User.find.where().eq("refreshToken", refreshToken).findUnique();
    }
}