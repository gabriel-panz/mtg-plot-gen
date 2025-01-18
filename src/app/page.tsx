'use client'

import { GenerateCardList, GenerateEncounter, GenerateLoot } from "@/actions/card";
import Printable from "@/components/exports/printable";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Carousel, { CarouselItem } from "@/components/ui/carousel";
import { Loader2, Download } from "lucide-react";
import { useActionState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Home() {
  const [plotItems, plotAction, plotPending] = useActionState(GenerateCardList, [])
  const [encounterItems, encounterAction, encounterPending] = useActionState(GenerateEncounter, [])
  const [lootItems, lootAction, lootPending] = useActionState(GenerateLoot, [])

  const printPlotRef = useRef<HTMLDivElement>(null)
  const printEncounterRef = useRef<HTMLDivElement>(null)
  const printLootRef = useRef<HTMLDivElement>(null)

  const printPlot = useReactToPrint({ contentRef: printPlotRef });
  const printEncounter = useReactToPrint({ contentRef: printEncounterRef });
  const printLoot = useReactToPrint({ contentRef: printLootRef });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form className="self-center" action={plotAction}>
          {plotPending
            ?
            <Button disabled type="submit">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
            :
            <Button type="submit">
              Generate Plot
            </Button>
          }
        </form>
        {
          plotItems.length > 0
            ? <>
              <Carousel className="w-full max-w-xs">
                {...plotItems.map((c, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card {...c} />
                    </div>
                  </CarouselItem>
                ))}
              </Carousel>
              <Button className="self-center" onClick={() => printPlot()}>
                <Download />
              </Button>
            </>
            : ''
        }

        <form className="self-center" action={encounterAction}>
          {encounterPending
            ?
            <Button disabled type="submit">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
            :
            <Button type="submit">
              Generate Encounter
            </Button>
          }
        </form>
        {
          encounterItems.length > 0
            ?
            <>
              <Carousel className="w-full max-w-xs">
                {...encounterItems.map((c, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card {...c} />
                    </div>
                  </CarouselItem>
                ))}
              </Carousel>
              <Button className="self-center" onClick={() => printEncounter()}>
                <Download />
              </Button>
            </>
            : ''
        }

        <form className="self-center" action={lootAction}>
          {lootPending
            ?
            <Button disabled type="submit">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
            :
            <Button type="submit">
              Generate Loot
            </Button>
          }
        </form>
        {
          lootItems.length > 0
            ?
            <>
              <Carousel className="w-full max-w-xs">
                {...lootItems.map((c, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card {...c} />
                    </div>
                  </CarouselItem>
                ))}
              </Carousel>
              <Button className="self-center" onClick={() => printLoot()}>
                <Download />
              </Button>
            </>
            : ''
        }
      </main>

      <Printable ref={printLootRef} className="justify-center hidden print:flex print:flex-wrap">
        {...lootItems.map((c, index) => (
          <div className="break-inside-avoid w-1/2" key={index}>
            <Card {...c} />
          </div>
        ))}
      </Printable>
      <Printable ref={printEncounterRef} className="justify-center hidden print:flex print:flex-wrap">
        {...encounterItems.map((c, index) => (
          <div className="break-inside-avoid w-1/2" key={index}>
            <Card {...c} />
          </div>
        ))}
      </Printable>
      <Printable ref={printPlotRef} className="justify-center hidden print:flex print:flex-wrap">
        {...plotItems.map((c, index) => (
          <div className="break-inside-avoid w-1/2" key={index}>
            <Card {...c} />
          </div>
        ))}
      </Printable>
    </div>
  );
}
