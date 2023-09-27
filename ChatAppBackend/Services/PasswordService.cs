using System;
using System.Security.Cryptography;
using System.Text;

namespace ChatApp.Services
{
    public class PasswordService
    {
        public (string Hash, string Salt) HashPassword(string password)
        {
            // Generate a salt
            var saltBytes = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(saltBytes);
            }
            var salt = Convert.ToBase64String(saltBytes);

            // Hash the password with SHA-512
            using (var sha512 = SHA512.Create())
            {
                var combinedBytes = Encoding.UTF8.GetBytes(password + salt);
                var hash = sha512.ComputeHash(combinedBytes);
                var hashString = Convert.ToBase64String(hash);
                return (Hash: hashString, Salt: salt);
            }
        }
        public bool VerifyPassword(string password, string storedHashString, string storedSaltString)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));

            // Decode stored hash and salt from Base64
            byte[] storedHash = Convert.FromBase64String(storedHashString);
            byte[] storedSalt = Convert.FromBase64String(storedSaltString);

            // Ensure stored hash is the correct length
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));

            // Concatenate password and decoded salt, then hash the result using SHA-512
            using (var sha512 = SHA512.Create())
            {
                var combinedBytes = Encoding.UTF8.GetBytes(password + Convert.ToBase64String(storedSalt));
                var computedHash = sha512.ComputeHash(combinedBytes);

                // Compare computed hash with stored hash
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}