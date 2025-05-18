function formatPhoneName(phone: string): string {
  // ลบช่องว่างและขีดก่อน
  const cleaned = phone.replace(/[\s-]/g, "");

  if (cleaned.startsWith("02") && cleaned.length === 9) {
    // เบอร์บ้าน: 02-xxx-xxxx
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
  }

  if (/^0[689]\d{8}$/.test(cleaned)) {
    // เบอร์มือถือ: 0xx-xxx-xxxx
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // ไม่ตรงรูปแบบที่รองรับ
  return phone;
}
export { formatPhoneName };
