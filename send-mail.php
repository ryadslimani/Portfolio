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

// En-têtes de l'e-mail (pour éviter que ça parte dans les spams et afficher le bon expéditeur)
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi de l'e-mail
if (mail($to, $email_subject, $email_content, $headers)) {
    http_response_code(200);
    // Redirection vers une page de succès ou retour au portfolio avec une ancre
    header("Location: portfolio.html?success=1#contact");
} else {
    http_response_code(500);
    echo "Une erreur est survenue lors de l'envoi du message.";
}
?>