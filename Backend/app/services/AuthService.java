package services;

import models.User;
import com.avaje.ebean.Ebean;
import org.mindrot.jbcrypt.BCrypt;
import repositories.UserRepository;
import utils.JwtUtil;
import dto.SignupRequest;
import dto.LoginRequest;
import dto.LoginResponse;

import javax.inject.Inject;
import javax.inject.Singleton;

import play.libs.Json;

import java.util.UUID;
import java.time.LocalDateTime;

import dto.RefreshTokenRequest;

@Singleton
public class AuthService {

    private final UserRepository userRepository;

    @Inject
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse signup(SignupRequest request) {

        User existingUser = userRepository.findByEmail(request.email);

        if (existingUser != null) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();

        user.name = request.name;
        user.email = request.email;

        user.password = BCrypt.hashpw(request.password, BCrypt.gensalt());

        String refreshToken = UUID.randomUUID().toString();

        user.refreshToken = refreshToken;
        user.refreshTokenExpiry = LocalDateTime.now().plusDays(7);
        userRepository.save(user);
        String accessToken = JwtUtil.generateAccessToken(user.id);

        LoginResponse response = new LoginResponse();
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;


        return response;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email);

        if (user == null) {

            throw new RuntimeException("Invalid email or password");
        }

        boolean valid = BCrypt.checkpw(request.password, user.password);

        if (!valid) {

            throw new RuntimeException("Invalid email or password");
        }
        //if(userRepository.findRefreshToken(request.))
        String accessToken = JwtUtil.generateAccessToken(user.id);
        String refreshToken = UUID.randomUUID().toString();

        user.refreshToken = refreshToken;
        user.refreshTokenExpiry = LocalDateTime.now().plusDays(7);
        LoginResponse response = new LoginResponse();
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;
        userRepository.update(user);
        return response;
    }

    public void Logout(Long userId) {
        User user = userRepository.findById(userId);

        if (user == null) {

            throw new RuntimeException("User not found");
        }


        user.refreshToken = null;

        user.refreshTokenExpiry = null;


        userRepository.update(user);

    }

    public String refresh(String refreshToken) {
        User user = userRepository.findRefreshToken(refreshToken);
        if (user == null) {
            throw new RuntimeException("Invalid refresh token");
        }
        if (user.refreshTokenExpiry == null) {

            throw new RuntimeException("Invalid refresh token");
        }
        if (user.refreshTokenExpiry.isBefore(LocalDateTime.now())) {

            throw new RuntimeException("Refresh token expired");
        }
        return JwtUtil.generateAccessToken(user.id);
    }
}