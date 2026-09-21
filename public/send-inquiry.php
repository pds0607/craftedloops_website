<?php
declare(strict_types=1);

const INQUIRY_RECIPIENT = 'inquiry@craftedloops.art';
const SITE_ORIGIN = 'https://craftedloops.art';

function clean_line(string $value, int $limit = 160): string
{
    $value = preg_replace('/[\r\n]+/', ' ', trim($value)) ?? '';
    return substr($value, 0, $limit);
}

function return_to_product(string $path, string $status): never
{
    if (!preg_match('#^/products/[a-z0-9-]+/$#', $path)) {
        $path = '/shop/';
    }
    header('Location: ' . SITE_ORIGIN . $path . '?inquiry=' . $status, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Method not allowed');
}

$productPath = clean_line((string) ($_POST['product_path'] ?? '/shop/'), 180);
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    return_to_product($productPath, 'sent');
}

$customerName = clean_line((string) ($_POST['customer_name'] ?? ''), 80);
$customerEmail = filter_var(trim((string) ($_POST['customer_email'] ?? '')), FILTER_VALIDATE_EMAIL);
$instagram = clean_line((string) ($_POST['instagram_handle'] ?? ''), 80);
$productCode = clean_line((string) ($_POST['product_code'] ?? ''), 30);
$productName = clean_line((string) ($_POST['product_name'] ?? ''), 120);
$selectedColor = clean_line((string) ($_POST['selected_color'] ?? ''), 120);
$purchaseOption = clean_line((string) ($_POST['purchase_option'] ?? ''), 100);
$price = clean_line((string) ($_POST['price'] ?? ''), 30);
$message = substr(trim((string) ($_POST['message'] ?? '')), 0, 1200);

if ($customerName === '' || $customerEmail === false || $productName === '') {
    return_to_product($productPath, 'error');
}

$subject = 'Crafted Loops inquiry: ' . $productCode . ' ' . $productName;
$body = implode("\n", [
    'New inquiry from craftedloops.art', '',
    'Customer: ' . $customerName,
    'Email: ' . $customerEmail,
    'Instagram: ' . ($instagram !== '' ? $instagram : 'Not provided'), '',
    'Product: ' . $productCode . ' — ' . $productName,
    'Color/design: ' . $selectedColor,
    'Purchase option: ' . $purchaseOption,
    'Price: ' . $price,
    'Product link: ' . SITE_ORIGIN . $productPath, '',
    'Message:', $message !== '' ? $message : 'No additional message.',
]);

$headers = implode("\r\n", [
    'From: Crafted Loops Website <inquiry@craftedloops.art>',
    'Reply-To: ' . $customerEmail,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
]);

$sent = mail(INQUIRY_RECIPIENT, $subject, $body, $headers);
return_to_product($productPath, $sent ? 'sent' : 'error');
