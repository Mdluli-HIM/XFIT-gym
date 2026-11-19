import { company } from "@/data/company";

/** wa.me link that opens WhatsApp with `message` already typed in. */
export function whatsappHref(message: string = company.whatsapp.defaultMessage) {
  return `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
