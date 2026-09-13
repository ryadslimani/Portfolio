<?php
// Empêcher l'accès direct au fichier sans soumission de formulaire
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    echo "Accès interdit.";
    exit;
}

// Récupération et nettoyage des données du formulaire
$name    = strip_tags(trim($_POST["name"] ?? ""));
$email   = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$subject = strip_tags(trim($_POST["subject"] ?? ""));
$message = trim($_POST["message"] ?? "");

// Vérification des champs obligatoires et de l'e-mail
if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Veuillez remplir tous les champs correctement.";
    exit;
}

// Paramètres de l'e-mail
$to = "slimanir.ryad@gmail.com";
$email_subject = "[Portfolio] " . $subject;

// Corps du message
$email_content = "Nom : $name\n";
$email_content .= "Email : $email\n\n";
$email_content .= "Message :\n$message\n";

// En-têtes sécurisés pour éviter le spoofing et réduire le risque de spam
// Utilisation d'une adresse de ton domaine ou du serveur comme expéditeur technique "From", 
// tout en plaçant l'e-mail de l'utilisateur dans "Reply-To" pour pouvoir lui répondre directement.
$domain = $_SERVER['SERVER_NAME'] ?? 'localhost';
$headers  = "From: no-reply@" . $domain . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi de l'e-mail
if (mail($to, $email_subject, $email_content, $headers)) {
    http_response_code(200);
    // Redirection vers une page de succès ou retour au portfolio avec une ancre
    header("Location: index.html?success=1#contact");
    exit;
} else {
    http_response_code(500);
    echo "Une erreur est survenue lors de l'envoi du message.";
}
?>