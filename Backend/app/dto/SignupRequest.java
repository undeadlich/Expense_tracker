package dto;

public class SignupRequest {

    public String name;

    public String email;

    public String password;

    public void validate() {

        if (name == null || name.trim().isEmpty()) {

            throw new RuntimeException("Name is required");
        }
        if (email == null || email.trim().isEmpty()) {

            throw new RuntimeException("Email is required");
        }

        if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {

            throw new RuntimeException("Invalid email format");
        }

        if (password == null || password.length() < 6) {

            throw new RuntimeException("Password must be at least 6 characters");
        }
    }
}