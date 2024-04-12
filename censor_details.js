function censorEmail(email) {
    let parts = email.split("@"); // Split the email into local part and domain part
    if (parts.length > 1) {
        let localPart = parts[0];
        let censoredPart = '';

        // Check if the local part is longer than 3 characters
        if (localPart.length > 3) {
            // Replace the first three characters with asterisks
            censoredPart = '***' + localPart.substring(3);
        } else {
            // If the local part is 3 characters or shorter, censor the entire local part
            for (let i = 0; i < localPart.length; i++) {
                censoredPart += '*';
            }
        }

        // Reconstruct the email with the domain part
        return censoredPart + "@" + parts[1];
    }
    return email; // Return the original email if it doesn't contain "@"
}

function censorPassword(password) {
    return '*'.repeat(password.length);
}