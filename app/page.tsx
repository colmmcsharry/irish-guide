import Link from "next/link";
import { Link as HeroLink } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

import { siteConfig } from "@/config/site";
import { title, date } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { cards } from "@/data/cards";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Check out upcoming&nbsp;</span>
        <span className={title({ color: "violet" })}>events&nbsp;</span>
        <br />
        <span className={title()}>near you</span>
        <div className={date({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <HeroLink
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </HeroLink>
        <HeroLink
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </HeroLink>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            className="cursor-pointer"
            href={`/events/${card.slug}`}
          >
            <Card className="pt-4 max-w-[300px] hover:opacity-80 transition-opacity">
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
                  className="object-cover rounded-b-xl rounded-t-none w-full pr-0 max-h-[135px]"
                  src={card.imageUrl}
                  width="full"
                />
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
