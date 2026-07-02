package models;

import com.avaje.ebean.Model;
import com.avaje.ebean.Model.Finder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

@Entity
public class User extends Model {

    @Id
    public Long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false, unique = true)
    public String email;

    @Column(nullable = false)
    public String password;

    public String refreshToken;

    public LocalDateTime refreshTokenExpiry;

    public static Finder<Long, User> find = new Finder<Long, User>(User.class);
}