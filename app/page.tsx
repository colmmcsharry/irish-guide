"use client";

import Link from "next/link";
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
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { title, date } from "@/components/primitives";
import { LocationIcon, CalendarIcon, BusinessIcon } from "@/components/icons";
import { cards, CardData } from "@/data/cards";
import { getFirestoreEvents } from "@/utils/firebase";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<(typeof cards)[0] | null>(
    null,
  );
  const pathname = usePathname();
  const [allEvents, setAllEvents] = useState<CardData[]>(cards);
  const [loading, setLoading] = useState(true);

  // Reset filters when navigating to home page directly (not back/forward)
  useEffect(() => {
    if (
      pathname === "/" &&
      !(
        window.performance.getEntriesByType(
          "navigation",
        )[0] as PerformanceNavigationTiming
      ).type.includes("back_forward")
    ) {
      setSelectedCounty("all");
      setSelectedMonth("all");
    }
  }, [pathname]);

  useEffect(() => {
    async function loadFirestoreEvents() {
      try {
        const firestoreEvents = await getFirestoreEvents();

        setAllEvents([...cards, ...firestoreEvents]);
      } catch (error) {
        console.error("Error loading Firestore events:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFirestoreEvents();
  }, []);

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

  // Split filtered events into upcoming and past
  const filterAndSortEvents = (events: CardData[]) => {
    // Set the time to the beginning of the day for accurate date comparison
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    const filtered = events.filter((card) => {
      const matchesCounty =
        selectedCounty === "all" || card.county === selectedCounty;
      const cardMonth = new Date(card.date).toLocaleString("default", {
        month: "long",
      });
      const matchesMonth =
        selectedMonth === "all" || cardMonth === selectedMonth;

      return matchesCounty && matchesMonth;
    });

    const upcoming = filtered
      .filter((card) => {
        const eventDate = new Date(card.date);

        eventDate.setHours(0, 0, 0, 0);

        return eventDate >= currentDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const past = filtered
      .filter((card) => {
        const eventDate = new Date(card.date);

        eventDate.setHours(0, 0, 0, 0);

        return eventDate < currentDate;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { upcoming, past };
  };

  const { upcoming: upcomingEvents, past: pastEvents } =
    filterAndSortEvents(allEvents);
  const hasFilteredEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

  // Event card renderer function to avoid duplication
  const renderEventCard = (card: CardData, key: string | number) => (
    <button
      key={key}
      className="cursor-pointer h-full text-left w-full border-none bg-transparent p-0 active:opacity-100 focus:outline-none tap-highlight-transparent"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={() => setSelectedEvent(card)}
    >
      <Card className="pt-4 w-full hover:opacity-80 transition-opacity flex flex-col lg:min-h-[400px] max-h-[400px]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start flex-1">
          <h4 className="font-bold text-large mb-2">{card.title}</h4>
          <p className="text-small mb-2 text-default-500">{card.description}</p>
          <div className="flex flex-col">
            <div className="flex flex-row gap-3">
              <p className="text-small text-default-500 flex items-center gap-1">
                <CalendarIcon className="text-default-500 mr-1" size={16} />
                {card.displayDate}
              </p>
              {card.time && (
                <p className="text-small text-default-500">{card.time}</p>
              )}
            </div>
            <p className="text-small text-default-500 flex items-center gap-1">
              <LocationIcon className="text-default-500 mr-1" size={16} />
              {card.county}
            </p>
            <p className="text-small text-default-500 flex items-center gap-1 mb-1">
              <BusinessIcon className="text-default-500 mr-1" size={16} />
              {card.company}
            </p>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible p-0 pr-0 pt-2 w-full rounded-b-lg max-w-full mt-auto flex justify-end">
          <Image
            alt={card.imageAlt}
            className="object-cover bottom-0 rounded-b-xl rounded-t-none w-full pr-0 max-h-[135px] md:min-h-[220px] md:max-h-[220px]"
            src={card.imageUrl}
            width="full"
          />
        </CardBody>
      </Card>
    </button>
  );

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ size: "lg" })}>Upcoming </span>
        <span className={title({ color: "violet", size: "lg" })}>singles </span>
        <span className={title({ size: "lg" })}>events in Ireland</span>
        <div className={date({ class: "mt-4" })}>
          Filter to find events near you
        </div>
      </div>

      {/* Event details modal */}
      <Modal
        classNames={{
          backdrop: "bg-background/70 backdrop-blur-sm backdrop-saturate-150",
          base: "bg-content1",
          body: "py-6",
          header: "border-b-1 border-default-100",
          footer: "border-t-1 border-default-100",
          closeButton: "hover:bg-default-100",
        }}
        isOpen={!!selectedEvent}
        placement="center"
        size="2xl"
        onClose={() => setSelectedEvent(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">{selectedEvent?.title}</h2>
              </ModalHeader>
              <ModalBody className="max-h-[70vh] overflow-y-auto">
                <div className="w-full !max-w-full">
                  <Image
                    alt={selectedEvent?.imageAlt || ""}
                    className="w-full min-w-full mx-auto object-cover rounded-lg max-w-full"
                    src={selectedEvent?.imageUrl || ""}
                  />
                </div>
                <p className="mt-4">{selectedEvent?.date}</p>
                <p className="mt-2">{selectedEvent?.description}</p>
                <div className="prose max-w-none mt-4">
                  <p>{selectedEvent?.longDescription}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                {selectedEvent?.ticketUrl && (
                  <Button
                    as={Link}
                    color="primary"
                    href={selectedEvent.ticketUrl}
                    radius="full"
                    target="_blank"
                    variant="shadow"
                  >
                    Get Tickets
                  </Button>
                )}
                <Button
                  className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8]"
                  color="primary"
                  variant="shadow"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <>
          <h2
            className={title({
              size: "sm",
              class: "mt-8 mb-4 self-start pl-4",
            })}
          >
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {upcomingEvents.map((card, index) => renderEventCard(card, index))}
          </div>
        </>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <>
          <h2
            className={title({
              size: "sm",
              class: "mt-12 mb-4 self-start pl-4",
            })}
          >
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {pastEvents.map((card, index) =>
              renderEventCard(card, `past-${index}`),
            )}
          </div>
        </>
      )}

      {/* No events message */}
      {!hasFilteredEvents && (
        <div className="text-center p-8 w-full max-w-[800px] bg-content1 col-span-full rounded-large">
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
            Reset
          </Button>
        </div>
      )}

      <div className="sticky bottom-0 z-30 w-full bg-background/70 py-4 flex flex-col items-center backdrop-blur-sm backdrop-saturate-150 backdrop-filter backdrop-brightness-150">
        {/* Filter status and reset */}
        {(selectedCounty !== "all" || selectedMonth !== "all") && (
          <div className="mb-2 text-small text-default-500 flex items-center gap-2">
            <span>
              Filtered by: {selectedCounty !== "all" && selectedCounty}
              {selectedCounty !== "all" && selectedMonth !== "all" && " in "}
              {selectedMonth !== "all" && selectedMonth}
            </span>
            <Button
              size="sm"
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

        {/* Filter button */}
        <Button
          className={`${buttonStyles({
            radius: "full",
            variant: "shadow",
          })} text-white font-bold bg-gradient-to-b from-[#b114ac] to-[#8837be]`}
          onPress={() => setIsOpen(true)}
        >
          Filter Events
        </Button>
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
