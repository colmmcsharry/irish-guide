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
  const [selectedMonth, setSelectedMonth] = useState("all");

  const counties = [
    "all",
    ...Array.from(new Set(cards.map((card) => card.county))),
  ];

  const months = [
    "all",
    ...Array.from(
      new Set(
        cards.map((card) => {
          const date = new Date(card.date);

          return date.toLocaleString("default", { month: "long" });
        }),
      ),
    ),
  ].sort((a, b) => {
    if (a === "all") return -1;
    if (b === "all") return 1;

    return new Date(`${a} 1`).getTime() - new Date(`${b} 1`).getTime();
  });

  const sortedAndFilteredCards = [...cards]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((card) => {
      const matchesCounty =
        selectedCounty === "all" || card.county === selectedCounty;
      const cardMonth = new Date(card.date).toLocaleString("default", {
        month: "long",
      });
      const matchesMonth =
        selectedMonth === "all" || cardMonth === selectedMonth;

      return matchesCounty && matchesMonth;
    });

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Upcoming&nbsp;</span>
        <span className={title({ color: "violet" })}>singles&nbsp;</span>
        <br />
        <span className={title()}>events in Ireland</span>
        <div className={date({ class: "mt-4" })}>
          Filter to find events near you
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAndFilteredCards.length > 0 ? (
          sortedAndFilteredCards.map((card, index) => (
            <Link
              key={index}
              className="cursor-pointer"
              href={`/events/${card.slug}`}
            >
              <Card className="pt-4 w-full max-w-[800px] hover:opacity-80 transition-opacity">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-[22px]">{card.title}</h4>
                  <div className="flex flex-row gap-4 mb-2">
                    <span className="text-default-500">{card.displayDate}</span>
                    {card.time && (
                      <small className="text-default-500">{card.time}</small>
                    )}
                  </div>
                  <p className=" text-white mb-2">{card.description}</p>
                  <p className="text-small text-default-500">{card.company}</p>
                  <p className="text-small text-default-500">{card.county}</p>
                </CardHeader>
                <CardBody className="overflow-visible p-0 pr-0 pt-2 w-full rounded-b-lg max-w-full">
                  <Image
                    alt={card.imageAlt}
                    className="object-cover rounded-b-xl rounded-t-none w-full pr-0 max-h-[135px] md:max-h-[220px]"
                    src={card.imageUrl}
                    width="full"
                  />
                </CardBody>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center p-8 w-full max-w-[800px] bg-content1 rounded-large">
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-default-500">
              No events match your current filter settings. Try adjusting your
              filters or checking back later for new events.
            </p>
            <Button
              className="mt-4"
              color="primary"
              variant="light"
              onPress={() => {
                setSelectedCounty("all");
                setSelectedMonth("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

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
              <ModalBody className="gap-4">
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

                <Select
                  label="Select Month"
                  placeholder="Select a month"
                  selectedKeys={[selectedMonth]}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month === "all" ? "All Months" : month}
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
