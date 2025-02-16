"use client";

import Link from "next/link";
import { Link as HeroLink } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { title, date } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { cards } from "@/data/cards";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("all");

  // Get unique counties from cards using Array.from()
  const counties = [
    "all",
    ...Array.from(new Set(cards.map((card) => card.county))),
  ];

  // Filter cards based on selected county
  const filteredCards =
    selectedCounty === "all"
      ? cards
      : cards.filter((card) => card.county === selectedCounty);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Upcoming&nbsp;</span>
        <span className={title({ color: "violet" })}>singles&nbsp;</span>
        <br />
        <span className={title()}>events near you</span>
        <div className={date({ class: "mt-4" })}>
          Singles events from all across the country.
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <Link
            key={index}
            className="cursor-pointer"
            href={`/events/${card.slug}`}
          >
            <Card className="pt-4 w-full max-w-[700px] hover:opacity-80 transition-opacity">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                  {card.description}
                </p>
                <small className="text-default-500">{card.date}</small>
                <h4 className="font-bold text-large">{card.title}</h4>
              </CardHeader>
              <CardBody className="overflow-visible p-0 pr-0 pt-2 w-full rounded-b-lg max-w-full">
                <Image
                  alt={card.imageAlt}
                  className="object-cover rounded-b-xl rounded-t-none w-full pr-0 max-h-[225px] md:max-h-[200px]"
                  src={card.imageUrl}
                  width="full"
                />
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Sticky buttons in their original position */}
      <div className="sticky bottom-0 z-30 w-full bg-background/70 py-4 flex justify-center gap-3 backdrop-blur-sm backdrop-saturate-150 backdrop-filter backdrop-brightness-150 ">
        <Button
          className={`${buttonStyles({
            radius: "full",
            variant: "shadow",
          })} bg-gradient-to-b from-[#FF1CF7] to-[#b249f8]`}
          onPress={() => setIsOpen(true)}
        >
          Filter Events
        </Button>
        <HeroLink
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </HeroLink>
      </div>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Filter Events
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Select County"
                  placeholder="Select a county"
                  selectedKeys={[selectedCounty]}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                >
                  {counties.map((county) => (
                    <SelectItem key={county} value={county}>
                      {county === "all" ? "All Counties" : county}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
