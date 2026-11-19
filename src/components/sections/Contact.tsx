"use client";

import { useState, type FormEvent } from "react";
import {
  Camera,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  company,
  directionsHref,
  mapEmbedSrc,
} from "@/data/company";
import { whatsappHref } from "@/lib/whatsapp";

const fieldClasses =
  "w-full border border-white/20 bg-white/[0.04] px-4 text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#ff3b3b] focus-visible:ring-2 focus-visible:ring-[#ff3b3b]/50";

const labelClasses =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-white/75";

/** Builds the WhatsApp text from the form. Nothing is stored or sent to us. */
function enquiryMessage(name: string, phone: string, message: string) {
  return [
    `Hi XFIT, my name is ${name.trim()}.`,
    `Phone: ${phone.trim()}`,
    "",
    message.trim(),
  ].join("\n");
}

export function Contact() {
  const [showMap, setShowMap] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.open(
      whatsappHref(enquiryMessage(name, phone, message)),
      "_blank",
      "noopener,noreferrer"
    );

    setOpened(true);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-[#111111] text-white"
    >
      <Container className="py-20 md:py-28 lg:py-36">
        <SectionHeader
          titleId="contact-title"
          label="Contact"
          title={
            <>
              Come train
              <br />
              with us.
            </>
          }
          intro="Call, WhatsApp or just walk in. We're on Tambo Street in Nkowankowa."
        />

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          {/* Details, actions and map */}
          <div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className={labelClasses}>
                  <MapPin
                    className="mr-2 inline size-3.5 -translate-y-px text-[#ff3b3b]"
                    aria-hidden="true"
                  />
                  Address
                </p>
                <address className="text-[clamp(1.5rem,6.5vw,2rem)] font-black uppercase not-italic leading-[0.95] tracking-[-0.045em]">
                  {company.address.street}
                  <br />
                  {company.address.suburb}, {company.address.postalCode}
                </address>
              </div>

              <div>
                <p className={labelClasses}>
                  <Clock
                    className="mr-2 inline size-3.5 -translate-y-px text-[#ff3b3b]"
                    aria-hidden="true"
                  />
                  Hours
                </p>
                <p className="text-[clamp(1.5rem,6.5vw,2rem)] font-black uppercase leading-[0.95] tracking-[-0.045em]">
                  {company.hours.closes}
                </p>
                {!company.hours.confirmed && (
                  <p className="mt-3 inline-block border border-dashed border-white/30 px-2.5 py-1.5 text-[12px] font-semibold text-white/75">
                    {company.hours.placeholder}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-2">
              <Button
                href={company.contact.telHref}
                icon={Phone}
                ariaLabel={`Call XFIT on ${company.contact.displayPhone}`}
              >
                Call
              </Button>
              <Button
                href={whatsappHref()}
                newTab
                variant="outline"
                icon={MessageCircle}
              >
                WhatsApp
              </Button>
              <Button
                href={directionsHref}
                newTab
                variant="outline"
                icon={Navigation}
              >
                Directions
              </Button>
              <Button
                href={company.social.instagram}
                newTab
                variant="outline"
                icon={Camera}
                ariaLabel={`Instagram ${company.social.instagramHandle}`}
              >
                Instagram
              </Button>
              <Button
                href={company.google.listing}
                newTab
                variant="white"
                icon={Star}
                showArrow
                className="col-span-2"
              >
                Review us on Google
              </Button>
            </div>

            <p className="mt-4 text-[13px] text-white/70">
              <a
                href={company.contact.telHref}
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {company.contact.displayPhone}
              </a>
              {" · "}
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {company.social.instagramHandle}
              </a>
            </p>

            {/* Map: Google is only contacted after the visitor taps "Show map" */}
            <div className="relative mt-10 aspect-[4/3] overflow-hidden border border-white/12 bg-[#161616] md:aspect-[16/10]">
              {showMap ? (
                <iframe
                  src={mapEmbedSrc}
                  title={`Map showing XFIT at ${company.address.formatted}`}
                  className="absolute inset-0 size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <div>
                    <MapPin
                      className="mx-auto size-7 text-[#ff3b3b]"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMap(true)}
                      className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 border border-white/25 px-5 text-[11px] font-black uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff3b3b]"
                    >
                      Show map
                    </button>
                    <p className="mt-3 text-[12px] text-white/60">
                      The map loads from Google Maps when you tap.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enquiry form: opens WhatsApp, stores nothing */}
          <div className="border border-white/12 bg-[#161616] p-5 md:p-7">
            <h3 className="text-[clamp(2rem,9vw,2.6rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]">
              Send us a message
            </h3>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div>
                <label
                  htmlFor="enquiry-name"
                  className={labelClasses}
                >
                  Name
                </label>
                <input
                  id="enquiry-name"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  className={`${fieldClasses} h-13`}
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-phone"
                  className={labelClasses}
                >
                  Phone
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                  className={`${fieldClasses} h-13`}
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-message"
                  className={labelClasses}
                >
                  Message
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  className={`${fieldClasses} resize-y py-3`}
                />
              </div>

              <button
                type="submit"
                className="flex min-h-13 w-full items-center justify-between bg-[#d3131b] px-5 text-[12px] font-black uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#e3161f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Send via WhatsApp
                <Send
                  className="size-4"
                  aria-hidden="true"
                />
              </button>

              <p
                role="status"
                className="text-[13px] text-white/80"
              >
                {opened
                  ? "WhatsApp opened with your message. Tap send there to reach us."
                  : ""}
              </p>
            </form>

            <p className="mt-2 border-t border-white/10 pt-4 text-[12px] leading-[1.5] text-white/65">
              Your message is sent via WhatsApp. We don&apos;t store your
              details.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
